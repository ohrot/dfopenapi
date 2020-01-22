const parseServer = require('./parseServer')
const esc = require('./escape').esc

module.exports = (app) => {
    app.character = {
        search: option => {
            return app.api({
                url: `servers/${parseServer(option.server)}/characters?characterName=${esc(option.characterName)}` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.wordType)?`&wordType=${option.wordType}`:'') 
            })
        },
        timeline: option => {
            console.log(option)
            if (option.next) {
                return app.api({
                    url: `servers/${parseServer(option.server)}/characters/${option.characterId}/timeline?next=${option.next}`
                })
            }
            return app.api({
                url: `servers/${parseServer(option.server)}/characters/${option.characterId}/timeline?` 
                        + ((option.limit) ? `&limit=${option.limit}` : '') 
                        + ((option.code) ? `&code=${option.code}` : '')
            })
        },
        info: {
            base: option => {
                return app.api({
                    url: `servers/${parseServer(option.server)}/characters/${option.characterId}` + ((option.url)?option.url:'')
                })
            },
            status: option => {
                option.url = '/status'
                return app.character.info.base(option)
            },
            equip: option => {
                option.url = '/equip/equipment'
                return app.character.info.base(option)
            },
            avatar: option => {
                option.url = '/equip/avatar'
                return app.character.info.base(option)
            },
            creature: option => {
                option.url = '/equip/creature'
                return app.character.info.base(option)
            },
            flag: option => {
                option.url = '/equip/flag'
                return app.character.info.base(option)
            },
            talisman: option => {
                option.url = '/equip/talisman'
                return app.character.info.base(option)
            },
            skill: option => {
                option.url = '/skill/style'
                return app.character.info.base(option)
            },
            buff: {
                equip: option => {
                    option.url = '/skill/buff/equip/equipment'
                    return app.character.info.base(option)
                },
                avatar: option => {
                    option.url = '/skill/buff/equip/avatar'
                    return app.character.info.base(option)
                },
                creature: option => {
                    option.url = '/skill/buff/equip/creature'
                    return app.character.info.base(option)
                },
            }
        }
    }    
    
    return app
}
