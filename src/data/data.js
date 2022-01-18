const axios = require('axios');

import colors from './colors';

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

    return axios.get(`${host}q=${payload.user}&per_page=20&page=${payload.page}`)
        .then((result) => {
            result.data['total_pages'] = Math.ceil(result.data.total_count / 20)

            let space = 67

            result.data['arr_pages'] = [...Array(result.data.total_pages).keys()]
                .map(page => {
                    return page = {
                        page: page + 1,
                        increment: space -= 30
                    }
                })

            return result.data
        })
        .catch((err) => {
            console.log(err);
        })
}

function getUserInitialData(payload) {
    const host = "https://api.github.com/users";

    return axios.get(`${host}/${payload.user}`)
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
            axios.get(`${host}/${payload.user}/repos?&per_page=100&page=${page + 1}`)
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