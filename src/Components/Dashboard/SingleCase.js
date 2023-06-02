import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecords } from "../Service/API";
import {
    SingleCaseBox,
    HorizontalFlex,
    AddDetailsBox,
    NewCaseBox,
    CasesBox,
} from "../Styles/Dashstyle";

const SingleCase = () => {
    const params = useParams();
    const [Records, SetRecords] = useState([]);

    const fetchRecords = async () => {
        const res = await getRecords();
        SetRecords(res.data);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    
    const readCaseinp = (e) => {
        setCaseDet({ ...CaseDet, [e.target.name]: e.target.value });

    }

    const Case = {
        caseid: "",
        invid: "",
        cname: "",
        cnotes: "",
        Files: [],
        cdesc: ""
    }

    const [CaseDet, setCaseDet] = useState(Case);



    return (
        <SingleCaseBox>


            {Records.filter((record) =>
                record.caseid.toLowerCase().startsWith(params.caseid.toLowerCase())
            ).map((rec) => (
                <NewCaseBox key={rec.caseid}>
                    <AddDetailsBox key={rec.caseid}>
                        <input
                            type="text"
                            placeholder="Case ID *"
                            name="caseid"
                            defaultValue={rec.caseid} onChange={readCaseinp}
                        />

                        <input
                            type="text"
                            placeholder="Investigator ID *"
                            name="invid"
                            defaultValue={rec.invid} onChange={readCaseinp}
                        />

                        <input
                            type="text"
                            placeholder="Case Name *"
                            name="cname"
                            defaultValue={rec.cname} onChange={readCaseinp}
                        />
                        <input
                            type="text"
                            placeholder="Case Notes"
                            name="cnotes"
                            defaultValue={rec.cnotes} onChange={readCaseinp}
                        />
                    </AddDetailsBox>
                    <HorizontalFlex>
                        <AddDetailsBox>
                            <textarea
                                id=""
                                cols="80"
                                rows="10"
                                placeholder="Case Description *"
                                name="cdesc"
                                defaultValue={rec.cdesc} onChange={readCaseinp}
                            ></textarea>
                        </AddDetailsBox>
                    </HorizontalFlex>



                </NewCaseBox>
            ))}


            <div>
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
                                    Records.filter((record) =>
                                        record.caseid.toLowerCase().startsWith(params.caseid.toLowerCase())
                                    ).map((rec) =>

                                        rec.Files.map((file, index) => (
                                            <tr key={index}>

                                                <td>{file.name}</td>
                                                <td>{file.size}</td>
                                                <td>{file.type}</td>


                                                <td>
                                                    <a
                                                        className="caselink"
                                                        rel="noreferrer"
                                                        href={file.ipfsPath}
                                                        target="_blank"
                                                    >
                                                        Link
                                                    </a>
                                                </td>
                                                <td>{file.uploadTime}</td>

                                            </tr>
                                        ))
                                    )
                                }


                            </tbody>



                        </table>
                    </CasesBox>
                </AddDetailsBox>




            </div>

        </SingleCaseBox>
    );
};

export default SingleCase;
