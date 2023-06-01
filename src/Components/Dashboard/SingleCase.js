import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getRecords } from '../Service/API';
import { SingleCaseBox,HorizontalFlex, AddDetailsBox, NewCaseBox } from '../Styles/Dashstyle';


const SingleCase = () => {
    const params = useParams();
    const [Records, SetRecords] = useState([]);


    const fetchRecords = async () => {
        const res = await getRecords();
        SetRecords(res.data);
    }

    useEffect(() => {
        fetchRecords();

    }, [])


    return (

        <SingleCaseBox>
            {
                Records.filter((record) => record.caseid.toLowerCase().startsWith(params.caseid.toLowerCase())).map((rec) => (
                    <NewCaseBox>

                        <AddDetailsBox>


                            <input type="text" placeholder='Case ID *' name='caseid' value={rec.caseid} />

                            <input type="text" placeholder='Investigator ID *' name='invid'
                            value={rec.invid}
                            />

                            <input type="text" placeholder='Case Name *' name='cname'
                            
                            value={rec.cname}
                           
                            />
                            <input type="text" placeholder='Case Notes' name='cnotes'  
                            
                            value={rec.cnotes}
                            />

                        </AddDetailsBox>
                        <HorizontalFlex>


                            <AddDetailsBox>
                                <textarea id="" cols="80" rows="10" placeholder='Case Description *' name='cdesc'  value={rec.cdesc}></textarea>


                            </AddDetailsBox>
 
                        </HorizontalFlex>

                    </NewCaseBox>

                ))

            }

        </SingleCaseBox>
    )
}

export default SingleCase;