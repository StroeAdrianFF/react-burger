import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-3c26b.firebaseio.com/'
});



export default instance;

