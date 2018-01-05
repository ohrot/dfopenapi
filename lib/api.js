const axios = require('axios')

const url = {
    openapi: 'https://api.neople.co.kr/df/'
}

exports = module.exports = (app) => {
    app.api = (option, callback) => {
        axios({
            url: url.openapi + option.url + ((/\?/g.test(option.url))?'&':'?') + `apikey=${app.key}`,
            method: 'GET',
        }).then((res) => {
            return callback(res.data)
        }).catch((err) => {
            //console.log(err)
            return callback(err.response.data)
        })
    }
    
    return app
}