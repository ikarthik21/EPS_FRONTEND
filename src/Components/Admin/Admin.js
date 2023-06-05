import React, { useEffect, useState } from 'react'
import { ContentBox, LeftBar, AddDetailsBox, CasesBox } from '../Styles/Dashstyle';
import { AdminContainer } from '../Styles/HomeStyles';
import { getAllusers, approveUser } from '../Service/API';
import '../../App.css';
import { notyf } from '../Styles/HomeStyles';


const Admin = () => {

    const [Users, setUsers] = useState([]);
    const [showApprovals, setshowApprovals] = useState(false);
    const [showUsers, setshowUsers] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getAllusers();
            setUsers(res.data);
        }
        fetchUsers();
    }, [])


    const showAppfn = () => {
        setshowUsers(false);
        setshowApprovals(true);
    }

    const showUsersfn = () => {
        setshowUsers(true);
        setshowApprovals(false);
    }

    const approveUserfn = async (email) => {
        try {
            const resp = await approveUser(email);

            notyf.open({
                type: 'info',
                message: resp.data.message,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);


        }
        catch (error) {
            notyf.open({
                type: 'error',
                message: error,
            });
        }


    }



    return (
        <AdminContainer >
            <LeftBar>
                <li onClick={showAppfn}>Approvals</li>
                <li onClick={showUsersfn}>All Users</li>
            </LeftBar>

            <ContentBox>


                {showUsers ? <AddDetailsBox>
                    <CasesBox>
                        <table>
                            <thead>
                                <tr>
                                    <th>User  Name</th>
                                    <th>License No</th>
                                    <th>Mobile</th>
                                    <th>Email</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.ilnumber}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CasesBox>


                </AddDetailsBox>
                    : ""}

                {showApprovals ? <AddDetailsBox>
                    <CasesBox>
                        <table>
                            <thead>
                                <tr>
                                    <th>User  Name</th>
                                    <th>License No</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Users.filter(user => user.verified === "false").map((user, index) => {

                                        return (
                                            <tr key={user.ilnumber}>
                                                <td>{user.name}</td>
                                                <td>{user.ilnumber}</td>
                                                <td>{user.mobile}</td>
                                                <td>{user.email}</td>
                                                <td><button className='appBtnStyle' onClick={() => approveUserfn(user.email)} >Approve</button></td>
                                            </tr>

                                        )



                                    })
                                }

                            </tbody>
                        </table>
                    </CasesBox>
                </AddDetailsBox>
                    : ""}
            </ContentBox>


        </AdminContainer>
    )
}

export default Admin