import axios from 'axios';

const curr_url = process.env.REACT_APP_BACKEND_URL;

console.log(curr_url);

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
