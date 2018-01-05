const esc = require('./escape').esc

const urlquery = (option, list, condition) => {
    let query = []
    
    list.forEach((i) => {
        if (option[i]) query[query.length] = i + ':' + option[i]
    })
    
    return condition + query.join(',')
}

const itemquery = (option) => {
    const list = ['minLevel', 'maxLevel', 'rarity']
    const condition = '&q='
    
    return urlquery(option, list, condition)
}

module.exports = (app) => {
    app.item = {
        search: (option, callback) => {
            app.api({
                url: `items?itemName=${esc(option.itemname)}${itemquery(option)}`
                        + ((option.limit)?`&limit=${option.limit}`:'')
                        + ((option.wordType)?`&wordType=${option.wordType}`:'')
            }, callback)
        },
        detail: (option, callback) => {
            app.api({
                url: `items/${option.itemId}`
            }, callback)
        }
    }
    
    return app
}