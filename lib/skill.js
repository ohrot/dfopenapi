const parseServer = require('./parseServer')
const esc = require('./escape').esc

module.exports = (app) => {
    app.skill = {
        list: option => {
            return app.api({
                url: `skills/${option.jobId}?jobGrowId=${option.jobGrowId}`
            })
        },
        info: option => {
            return app.api({
                url: `skills/${option.jobId}/${option.skillId}`
            })
        }
    }    
    
    return app
}
