const axios = require('axios')

const debug = false

const url = {
    openapi: 'https://api.neople.co.kr/df/'
}

const get = async (app, option) => {
    try {
        const data = await axios.get(app.option.gatewayURL, {
            params: option
        })
        if (debug) console.log('route.gateway.get.data', data)
        return data
    } catch (err) {
        console.log('route.gateway.get.catch', err)
        return {}
    }
}

exports = module.exports = (app) => {
    app.gateway = async option => {
        const data = await get(app, option)

        return data
    }
    return app
}
