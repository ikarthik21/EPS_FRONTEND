import axios from 'axios';
import Cookies from 'js-cookie';

// Retrieve the token from the cookie
const token = Cookies.get('token');

// Set the default Authorization header for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const curr_url = process.env.REACT_APP_BACKEND_URL;



export const adduser = async (user) => {
    try {

        return axios.post(`${curr_url}/register`, user);

    } catch (err) {
        console.log(err);
    }

}


export const loginuser = async (user) => {
    try {

        return axios.post(`${curr_url}/login`, user);

    } catch (err) {
        console.log(err);
    }

}


export const addCase = async (Case) => {
    try {

        return axios.post(`${curr_url}/addcase`, Case);

    } catch (err) {
        console.log(err);
    }

}
export const editCase = async (Case) => {
    try {

        return axios.post(`${curr_url}/editcase`, Case);

    } catch (err) {
        console.log(err);
    }

}


export const getRecords = async () => {
    try {

        return axios.get(`${curr_url}/getrec`);

    } catch (err) {
        console.log(err);
    }

}

export const dummy = async () => {
    try {

        return axios.get(`${curr_url}/dummy`);


    } catch (err) {
        console.log(err);
    }

}

export const getAllusers = async () => {
    try {
        return axios.get(`${curr_url}/users`);

    } catch (err) {
        console.log(err);
    }

}


export const approveUser = async (mail) => {
    try {


        const email = {
            email: mail
        }

        return axios.post(`${curr_url}/approveuser`, email);

    } catch (err) {
        console.log(err);
    }

}