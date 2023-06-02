import React, { useState } from 'react'
import { Container, LeftBar, ContentBox } from '../Styles/Dashstyle';
import NewCase from './NewCase';
import AllRecords from './AllRecords';
import OpenCases from './OpenCases';
import CloseCases from './CloseCases';
import SearchRecord from './SearchRecord';
const Dashboard = () => {

    const [NCState, setNCState] = useState(true);
    const [ARState, setARState] = useState(false);
    const [SBState, setSBState] = useState(false);
    const [OCState, setOCState] = useState(false);
    const [CCState, setCCState] = useState(false);

    const dispNC = () => {
        setARState(false);
        setSBState(false);
        setOCState(false);
        setCCState(false);
        setNCState(true);
    }

    const dispAR = () => {
        setSBState(false);
        setNCState(false);
        setOCState(false);
        setCCState(false);
        setARState(true);
    }
    const dispSB = () => {
        setOCState(false);
        setNCState(false);
        setARState(false);
        setCCState(false);
        setSBState(true);
    }
    const dispOC = () => {
        setNCState(false);
        setARState(false);
        setSBState(false);
        setCCState(false);
        setOCState(true);
    }
    const dispCC = () => {
        setNCState(false);
        setARState(false);
        setSBState(false);
        setOCState(false);
        setCCState(true);
    }






    return (
        <Container>
            <LeftBar>
                <li onClick={dispNC} > + New Case</li>
                <li onClick={dispAR} >All Records</li>
                <li> Investigators </li>
                <li onClick={dispOC}> Open Cases </li>
                <li onClick={dispCC}>  Closed Cases </li>
                <li onClick={dispSB}> Search </li>

            </LeftBar>


            <ContentBox>


                {NCState ? <NewCase /> : ""}
                {OCState ? <OpenCases /> : ""}
                {CCState ? <CloseCases /> : ""}
                {ARState ? <AllRecords /> : ""}
                {SBState ? <SearchRecord /> : ""}
                {/* {SBState ? <SearchBox>
                    <input type="text" placeholder='Case ID' />
                    <input type="text" placeholder='Investigator ID ' />
                    <input type="text" placeholder='Case Name' />
                </SearchBox> : ""} */}



            </ContentBox>

        </Container>
    )
}

export default Dashboard;
