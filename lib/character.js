const parseServer = require('./parseServer')
const esc = require('./escape').esc

module.exports = (app) => {
    app.character = {
        search: (option, callback) => {
            app.api({
                url: `servers/${parseServer(option.server)}/characters?characterName=${esc(option.cname)}` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.wordType)?`&wordType=${option.wordType}`:'') 
            }, callback)
        },
        timeline: (option, callback) => {
            app.api({
                url: `servers/${parseServer(option.server)}/characters/${option.cid}/timeline` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.code)?`&wordType=${option.code}`:'') 
            }, callback)
        },
        info: {
            base: (option, callback) => {
                app.api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}` + ((option.url)?option.url:'')
                }, callback)
            },
            status: (option, callback) => {
                option.url = '/status'
                app.character.info.base(option, callback)
            },
            equip: (option, callback) => {
                option.url = '/equip/equipment'
                app.character.info.base(option, callback)
            },
            avatar: (option, callback) => {
                option.url = '/equip/avatar'
                app.character.info.base(option, callback)
            },
            creature: (option, callback) => {
                option.url = '/equip/creature'
                app.character.info.base(option, callback)
            },
            flag: (option, callback) => {
                option.url = '/equip/flag'
                app.character.info.base(option, callback)
            },
            flag: (option, callback) => {
                option.url = '/equip/flag'
                app.character.info.base(option, callback)
            },
        }
    }    
    
    return app
}