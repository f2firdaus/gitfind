import axios from 'axios';

const github = axios.create({
    baseURL: "https://api.github.com/users",
    timeout: 1500

})
export { github };
