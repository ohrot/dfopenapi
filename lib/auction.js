var esc = require('./escape').esc

const urlquery = (option, list, condition) => {
    let query = []
    
    list.forEach((i) => {
        if (option[i]) query[query.length] = i + ':' + option[i]
    })
    
    return condition + query.join(',')
}

const auctionquery = (option) => {
    const list = ['minLevel', 'maxLevel', 'rarity', 'minReinforce', 'maxReinforce', 'minRefine', 'maxRefine']
    const condition = '&q='
    
    return urlquery(option, list, condition)
}

const auctionsort = (option) => {
    const list = ['unitPrice', 'reinforce', 'auctionNo']
    const condition = '&sort='
    
    return urlquery(option, list, condition)
}

module.exports = (app) =>{
    app.auction = {
        search: (option, callback) => {
            app.api({
                url: `auction?itemName=${esc(option.itemname)}${auctionquery(option)}${auctionsort(option)}`
                        + ((option.limit)?`&limit=${option.limit}`:'')
                        + ((option.wordType)?`&wordType=${option.wordType}`:'')
            }, callback)
        },
        detail: (option, callback) => {
            app.api({
                url: `auction/${option.auctionNo}`
            }, callback)
        }
    }
    
    return app
}