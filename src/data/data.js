const axios = require('axios');

import colors from './colors';

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
            return result.data
        })
        .catch((err) => {
            console.log(err);
        })
}

function getUserInitialData(payload) {
    const host = "https://api.github.com/users";

    return axios.get(`${host}/${payload.user}?${clientQueryString}`)
        .then((result) => result.data)
        .catch((err) => console.log(err))
}

function getUserStats(payload) {
    const host = "https://api.github.com/users";
    const nPages = Math.ceil(payload.totalrepos / 100)
    const arrPages = [...Array(nPages).keys()]
    let reposInfo = {
        totaRepos: [],
        topLanguages: [],
    }

    return Promise.all(arrPages.map(page =>
            axios.get(`${host}/${payload.user}/repos?${clientQueryString}&per_page=100&page=${page + 1}`)
            .then((res) => reposInfo.totaRepos.push(...res.data))
            .catch((err) => {
                console.log(err);
            })
        ))
        .then(() => {
            let addOcurrences = reposInfo.totaRepos
                .reduce((acc, obj) => {
                    obj.language = obj.language === null ? "Outros" : obj.language
                    acc.push(obj.language)
                    return acc
                }, [])
                .reduce((acc, obj) => {
                    return acc[obj] ? ++acc[obj] : acc[obj] = 1, acc
                }, {});

            let languages = Object.entries(addOcurrences)
                .reduce((acc, obj) => {
                    const [key, value] = obj;

                    acc.push({
                        language: key,
                        ocurrences: value
                    })

                    return acc
                }, [])
                .sort((a, b) => {
                    return a.ocurrences < b.ocurrences ?
                        1 :
                        b.ocurrences < a.ocurrences ?
                        -1 :
                        0;
                })

            reposInfo.topLanguages = [...languages].map(rep => {
                const found = colors[rep.language]
                if (found) rep['language_color'] = found.color
                else rep['language_color'] = '#505050'

                return rep
            })

            const getTime = (obj) => new Date(obj).getTime()
            reposInfo.totaRepos = reposInfo.totaRepos.sort((a, b) => {
                    return getTime(a.pushed_at) < getTime(b.pushed_at) ?
                        1 :
                        getTime(b.pushed_at) < getTime(a.pushed_at) ?
                        -1 :
                        0;
                })
                .slice(0, 6)
                .map(rep => {
                    const found = colors[rep.language]
                    if (found) rep['language_color'] = found.color
                    else rep['language_color'] = '#505050'

                    return rep
                })

            return reposInfo
        })
}

export default {
    initialData,
    getUsers,
    getUserInitialData,
    getUserStats
};