import React, { useState, useEffect } from 'react';
import { NewCaseBox, AddDetailsBox } from '../Styles/Dashstyle';
import { notyf } from '../Styles/HomeStyles';
import { addCase } from '../Service/API';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import Evidence from '../../build/contracts/Evidence.json';



const NewCase = () => {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const Case = {
    caseid: '',
    invid: '',
    cname: '',
    cnotes: '',
    fileNames: [],
    fileSizes: [],
    fileTypes: [],
    ipfsPaths: [],
    uploadTimes: [],
    cdesc: '',
  };

  const [CaseDet, setCaseDet] = useState(Case);

  const ipfs = create({ host: 'localhost', port: 5001 });


  useEffect(() => {

    const initializeWeb3 = async () => {
      // Checking for MetaMask availablity
      if (window.ethereum) {
        try {

          // Request account access from the user
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create a Web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get the list of accounts
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);

          // Create a contract instance
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = Evidence.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            Evidence.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      }
      else {
        console.error('MetaMask extension not detected');
      }
    };

    initializeWeb3();

    // Fetch cases from the blockchain
    // const fetchCases = async () => {
    //   try {
    //     const fileCount = await contract.methods.fileCount().call();
    //     const caseList = [];

    //     for (let i = 1; i <= fileCount; i++) {
    //       const file = await contract.methods.files(i).call();
    //       caseList.push(file);
    //     }

    //     setCases(caseList);
    //   } catch (error) {
    //     console.error('Error fetching cases from the blockchain:', error);
    //   }
    // };

    // if (contract) {
    //   fetchCases();
    // }

  }, [contract]);




  const readCaseinp = (e) => {
    setCaseDet({ ...CaseDet, [e.target.name]: e.target.value });
  };



  const submitCase = async (e) => {

    e.preventDefault();

    if (
      CaseDet.caseid === '' ||
      CaseDet.cdesc === '' ||
      CaseDet.cname === '' ||
      CaseDet.invid === ''
    ) {
      notyf.error('Please fill all required fields');
    }
    else {


      console.log(CaseDet);

      if (!contract) {
        console.error('Contract not initialized');
        return;
      }


      try {
        await contract.methods
          .uploadCaseWithFiles(CaseDet.caseid, CaseDet.invid, CaseDet.cname, CaseDet.cnotes, CaseDet.cdesc, CaseDet.fileNames, CaseDet.fileSizes, CaseDet.fileTypes, CaseDet.ipfsPaths, CaseDet.uploadTimes)
          .send({ from: accounts[0] });
        console.log('Case uploaded successfully!');

        // window.location.reload();
      } catch (error) {
        console.error('Error uploading file:', error);
      }




      try {
        const resp = await addCase(CaseDet);

        notyf.open({
          type: 'info',
          message: resp.data.message,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };


  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    let name = file.name;
    let size = file.size;
    let fileType = file.type;
    let ipfsPath;
    let uploadTime = new Date().toLocaleString();

    try {
      const added = await ipfs.add(file);
      const hash = added.path;
      ipfsPath = 'https://ipfs.io/ipfs/' + hash;

      const updatedFileNames = [...CaseDet.fileNames, name];
      const updatedFileSizes = [...CaseDet.fileSizes, size];
      const updatedFileTypes = [...CaseDet.fileTypes, fileType];
      const updatedIpfsPaths = [...CaseDet.ipfsPaths, ipfsPath];
      const updatedUploadTimes = [...CaseDet.uploadTimes, uploadTime];

      const updatedCaseDet = {
        ...CaseDet,
        fileNames: updatedFileNames,
        fileSizes: updatedFileSizes,
        fileTypes: updatedFileTypes,
        ipfsPaths: updatedIpfsPaths,
        uploadTimes: updatedUploadTimes,
      };

      setCaseDet(updatedCaseDet);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };




  return (
    <NewCaseBox>
      <img src="/images/icon1.svg" alt="" />
      <AddDetailsBox>
        <input type="text" placeholder="Case ID *" name="caseid" onChange={readCaseinp} />
        <input type="text" placeholder="Investigator ID *" name="invid" onChange={readCaseinp} />
        <input type="text" placeholder="Case Name *" name="cname" onChange={readCaseinp} />
      </AddDetailsBox>
      <AddDetailsBox>
        <input type="text" placeholder="Case Notes" name="cnotes" onChange={readCaseinp} />
        <textarea id="" cols="50" rows="5" placeholder="Case Description *" name="cdesc" onChange={readCaseinp}></textarea>
      </AddDetailsBox>
      <AddDetailsBox></AddDetailsBox>
      <AddDetailsBox>
        <AddDetailsBox className="Flexv2">
          <label>Add Evidences</label>
          <input type="file" onChange={handleFileUpload} />
        </AddDetailsBox>
      </AddDetailsBox>
      <AddDetailsBox className="Flexv2">
        <button className="btn_st1" onClick={submitCase}>
          Save
        </button>
      </AddDetailsBox>
    </NewCaseBox>
  );
};

export default NewCase;
