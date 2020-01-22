const axios = require('axios')

const url = {
    openapi: 'https://api.neople.co.kr/df/'
}

exports = module.exports = (app) => {
    app.api = (option) => {
        return axios({
            url: url.openapi + option.url + ((/\?/g.test(option.url))?'&':'?') + `apikey=${app.key}`,
            method: 'GET',
        })
    }
    
    return app
}
