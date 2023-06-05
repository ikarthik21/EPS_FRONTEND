import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getRecords, editCase } from "../Service/API";
import {
  AddDetailsBox,
  NewCaseBox,
  CasesBox,
  ContentBox,
} from "../Styles/Dashstyle";
import { create } from "ipfs-http-client";
import { notyf } from "../Styles/HomeStyles";

const SingleCase = () => {
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

  const params = useParams();
  const [Records, SetRecords] = useState([]);

  const fetchRecords = useCallback(async () => {

    const res = await getRecords();
    SetRecords(res.data);
    res.data
      .filter((record) =>
        record.caseid.toLowerCase().startsWith(params.caseid.toLowerCase())
      )
      .map((rec) => setCaseDet(rec));
  }, [params.caseid]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const readCaseinp = (e) => {
    setCaseDet({ ...CaseDet, [e.target.name]: e.target.value });
  };

  const ipfs = create({ host: "localhost", port: 5001 });

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

  const [showEditCase, setshowEditCase] = useState(true);

  const HandleEditBtn = async () => {
    if (showEditCase === false) {
      try {
        const resp = await editCase(CaseDet);
        console.log(resp);

        notyf.open({
          type: "info",
          message: resp.data.message,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setshowEditCase(!showEditCase);
  };

  return (
    <div className="centerMargin">
      {Records.filter((record) =>
        record.caseid.toLowerCase().startsWith(params.caseid.toLowerCase())
      ).map((rec) => (
        <ContentBox key={rec.invid}>
          <div className="FloatRight">
            {showEditCase ? (
              <button className="btn_st1 editBtn" onClick={HandleEditBtn}>
                {" "}
                Edit
              </button>
            ) : (
              <button className="btn_st2 editBtn" onClick={HandleEditBtn}>
                Save
              </button>
            )}
          </div>

          <NewCaseBox
            key={rec.caseid}
            style={{
              pointerEvents: showEditCase ? "none" : "auto",
              opacity: showEditCase ? 0.6 : 1,
            }}
          >
            <img src="/images/icon1.svg" alt="" />
            <AddDetailsBox key={rec.caseid}>
              <input
                type="text"
                placeholder="Case ID *"
                name="caseid"
                defaultValue={rec.caseid}
                onChange={readCaseinp}
              />

              <input
                type="text"
                placeholder="Investigator ID *"
                name="invid"
                defaultValue={rec.invid}
                onChange={readCaseinp}
              />

              <input
                type="text"
                placeholder="Case Name *"
                name="cname"
                defaultValue={rec.cname}
                onChange={readCaseinp}
              />
            </AddDetailsBox>

            <AddDetailsBox>
              <input
                type="text"
                placeholder="Case Notes"
                name="cnotes"
                defaultValue={rec.cnotes}
                onChange={readCaseinp}
              />
              <textarea
                id=""
                cols="50"
                rows="10"
                placeholder="Case Description *"
                name="cdesc"
                defaultValue={rec.cdesc}
                onChange={readCaseinp}
              ></textarea>
            </AddDetailsBox>

            <AddDetailsBox className="Flexv2">
              <label>Add Evidences</label>
              <input type="file" onChange={handleFileUpload} />
            </AddDetailsBox>
          </NewCaseBox>

          <AddDetailsBox>
            <CasesBox>
              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Link</th>
                    <th>Upload Time</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    CaseDet.fileNames.map((element, index) => (
                      <tr key={index}>
                        <td>{element}</td>
                        <td>{CaseDet.fileSizes[index]}</td>
                        <td>{CaseDet.fileTypes[index]}</td>

                        <td>
                          <a
                            className="caselink"
                            rel="noreferrer"
                            href={CaseDet.ipfsPaths[index]}
                            target="_blank"
                          >
                            Link
                          </a>
                        </td>


                        <td>{CaseDet.uploadTimes[index]}</td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </CasesBox>
          </AddDetailsBox>
        </ContentBox>
      ))}
    </div>
  );
};

export default SingleCase;
