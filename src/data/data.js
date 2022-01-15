const axios = require('axios');

const host = "https://api.github.com/users";
const clientId = "f9592fa38a7cae6b1bd1";
const clientSecret = "f93b203fb02b657ff2781efd1d5ab318afb66c73";

function initialData() {
    return {
        title: "GitHub API App",
        meta: [{
            name: "description",
            content: `Aplicação Front-end que consome a API do GitHub`,
        }, ],
        links: [],
    };
}

function getUser(payload) {
    return axios.get(`${host}/${payload.user}?client_id=${clientId}&client_secret=${clientSecret}`)
        .then((result) => {
            console.log(result)
        })
}

export default {
    initialData,
    getUser,
};