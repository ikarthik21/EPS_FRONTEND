import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ContentBox, CasesBox } from '../Styles/Dashstyle';
import { getRecords } from '../Service/API';
import '../../App.css';

const AllRecords = () => {

    const [Records, SetRecords] = useState([]);

    const fetchRecords = async () => {
        const res = await getRecords();
        SetRecords(res.data);
    }


    useEffect(() => {
        fetchRecords();

    }, []);

    return (
        <div className='totalFlex' >
            <CasesBox>

                <table>
                    <thead>
                        <tr>
                            <th>Case Id</th>
                            <th>Status</th>
                            <th>Inv Id</th>
                            <th>Case Name</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            Records.map((record) => (
                                <tr >
                                    <td>
                                        <a className="caselink" rel="noreferrer" href={"/cases/" + record.caseid} target="_blank" >
                                            {record.caseid}
                                        </a>
                                    </td>
                                    <td>{record.cstatus}</td>
                                    <td>{record.invid}</td>
                                    <td>{record.cname}</td>
                                    <td>{record.cnotes}</td>

                                </tr>


                            ))}



                    </tbody>
                </table>



            </CasesBox>
        </div>
    )
}

export default AllRecords