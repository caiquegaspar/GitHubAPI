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
        .then((result) => axios.get(`${host}/${payload.user}/repos?${clientQueryString}`)
            .then((res) => {
                let addOcurrences = res.data
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
                    .slice(0, 2);

                let ocurrencesSum = Object.values(addOcurrences)
                    .reduce((acc, obj) => {
                        acc = acc + obj
                        return acc
                    }, 0)

                result.data['languages'] = languages
                console.log(ocurrencesSum, result, languages, res)

                return result.data
            })
        )
        .catch((err) => {
            console.log(err);
        })
}

export default {
    initialData,
    getUsers,
    getUserData,
};