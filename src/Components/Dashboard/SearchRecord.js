import React, { useEffect, useState } from 'react';
import { ContentBox, CasesBox, SearchBox } from '../Styles/Dashstyle';
import { getRecords } from '../Service/API';
import '../../App.css';

const SearchRecord = () => {

    const [Records, SetRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [searchName, setsearchName] = useState("");

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
                <SearchBox>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Case ID' />

                    <input type="text" onChange={(e) => setsearchName(e.target.value)} placeholder='Case Name' />
                </SearchBox>

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

                        {search ?

                            <>


                                {
                                    Records.filter((record) => record.caseid.toLowerCase().startsWith(search.toLowerCase())).map((record) => (
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


                                    ))

                                }


                            </>


                            :
                            <>


                                {
                                    Records.filter((record) => record.cname.toLowerCase().startsWith(searchName.toLowerCase())).map((record) => (
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


                                    ))

                                }

                            </>



                        }







                    </tbody>
                </table>



            </CasesBox>
        </div>
    )
}

export default SearchRecord