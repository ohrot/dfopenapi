const esc = require('./escape').esc

const urlquery = (option, list, condition) => {
    let query = []
    
    list.forEach(i => {
        if (option[i]) query[query.length] = i + ':' + option[i]
    })
    
    return condition + query.join(',')
}

const itemquery = option => {
    const list = ['minLevel', 'maxLevel', 'rarity']
    const condition = '&q='
    
    return urlquery(option, list, condition)
}

module.exports = app => {
    app.item = {
        search: option => {
            return app.api({
                url: (option.itemName ? `items?itemName=${esc(option.itemName)}` : `setItems?setItemName=${esc(option.setItemName)}`)
                        + `${itemquery(option)}`
                        + ((option.limit)?`&limit=${option.limit}`:'')
                        + ((option.wordType)?`&wordType=${option.wordType}`:'')
            })
        },
        detail: option => {
            if (option.setItemId) {
                return app.api({
                    url: `setItems/${option.setItemId}`
                })
            }

            if (option.itemId) {
                if (option.itemId.split('&').length === 1) {
                    return app.api({
                        url: `items/${option.itemId}`
                    })
                } else {
                    return app.api({
                        url: `multi/items?itemIds=${option.itemId.split('&').join(',')}`
                    })
                }
            }
            return new Promise(res => res(null))
        },
        shop: option => {
            return app.api({
                url: `items/${option.itemId}/shop`
            })
        }
    }
    
    return app
}
