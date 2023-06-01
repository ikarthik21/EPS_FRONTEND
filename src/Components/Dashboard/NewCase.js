import React, { useEffect, useState } from 'react'
import { NewCaseBox, AddDetailsBox, HorizontalFlex } from '../Styles/Dashstyle';
import { addCase } from '../Service/API';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';




const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'error',
            background: '#ef5644',
            duration: 5000,
            dismissible: true
        },
        {
            type: 'info',
            background: '#00adf1',
            duration: 5000,
            dismissible: true
        }

    ]
});


const NewCase = () => {

    const Case = {
        caseid: "",
        invid: "",
        cname: "",
        cnotes: "",
        cfile: "",
        cdesc: ""
    }

    const [CaseDet, setCaseDet] = useState(Case);

    const readCaseinp = (e) => {

        setCaseDet({ ...CaseDet, [e.target.name]: e.target.value });

    }



    const submitCase = async (e) => {
        if (CaseDet.caseid === "" || CaseDet.cdesc === "" || CaseDet.cname === "" || CaseDet.invid === "") {
            notyf.error('Please fill all required fields');

        }
        else {

            try {
                const resp = await (addCase(CaseDet));
                console.log(resp);

                notyf.open({
                    type: 'info',
                    message: resp.data.message
                });

            } catch (error) {
                console.log(error);

            }
        }

    }




    return (
        <NewCaseBox>


            <AddDetailsBox>


                <input type="text" placeholder='Case ID *' name='caseid' onChange={readCaseinp} />

                <input type="text" placeholder='Investigator ID *' name='invid' onChange={readCaseinp} />

                <input type="text" placeholder='Case Name *' name='cname' onChange={readCaseinp} />
                <input type="text" placeholder='Case Notes' name='cnotes' onChange={readCaseinp} />

            </AddDetailsBox>



            <HorizontalFlex>


                <AddDetailsBox>
                    <textarea id="" cols="80" rows="10" placeholder='Case Description *' name='cdesc' onChange={readCaseinp}  ></textarea>


                </AddDetailsBox>

                <AddDetailsBox className='Flexv2' >
                    <input type="file" name="" id="" onChange={readCaseinp} />
                </AddDetailsBox>

            </HorizontalFlex>

            <AddDetailsBox className='Flexv2' >


                <button className='btn_st1' onClick={submitCase}> Save </button>
            </AddDetailsBox>



        </NewCaseBox>
    )
}

export default NewCase