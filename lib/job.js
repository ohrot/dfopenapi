const parseServer = require('./parseServer')
const esc = require('./escape').esc

module.exports = (app) => {
    app.job = option => {
        return app.api({
            url: `jobs`
        })
    }    
    
    return app
}
