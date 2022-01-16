const axios = require('axios');

const clientId = "f9592fa38a7cae6b1bd1";
const clientSecret = "f93b203fb02b657ff2781efd1d5ab318afb66c73";
const clientQueryString = `client_id=${clientId}&client_secret=${clientSecret}`

function initialData() {
    return {
        title: "GitHub User Scraper",
        meta: [{
            name: "description",
            content: `Aplicação Front-end que consome a API do GitHub`,
        }],
        links: [{
            rel: "author",
            href: "https://github.com/caiquegaspar",
        }],
    };
}

function getUsers(payload) {
    const host = "https://api.github.com/search/users?";

    return axios.get(`${host}q=${payload.user}&per_page=20&page=1?${clientQueryString}`)
        .then((result) => {
            console.log(result);
            return result.data
        })
        .catch((err) => {
            console.log(err);
        })
}

function getUserData(payload) {
    const host = "https://api.github.com/users";

    return axios.get(`${host}/${payload.user}?${clientQueryString}`)
        .then((result) => {
            console.log(result);
            return result.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export default {
    initialData,
    getUsers,
    getUserData,
};