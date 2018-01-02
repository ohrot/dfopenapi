"use strict";

var axios = require('axios')
var qs = require('querystring')

const legacyurl = "http://df.nexon.com/FRM/info/charac_search_api.php"
const openapiurl = "https://api.neople.co.kr/df/"

let create = (option) => {
    let app = {}
    
    const key = (typeof(option) == "string") ? option : option.key
    
    const api = (option, callback) => {
        axios({
            url: openapiurl + option.url,
            method: "GET",
        }).then((res) => {
            return callback(res.data)
        }).catch((err) => {
            return callback(err.response.data)
        })
    }
    
    const esc = (string) => {
        return (/%/g.test(string))?string:qs.escape(string)
    }
    
    const parseServer = (server) => {
        var parser = {
            "안톤": "anton",
            "a": "anton",
            "A": "anton",
            "바칼": "bakal",
            "b": "bakal",
            "B": "bakal",
            "카인": "cain",
            "c": "cain",
            "C": "cain",
            "카시야스": "casillas",
            "l": "casillas",
            "L": "casillas",
            "디레지에": "diregie",
            "d": "diregie",
            "D": "diregie",
            "힐더": "hilder",
            "h": "hilder",
            "H": "hilder",
            "프레이": "prey",
            "p": "prey",
            "P": "prey",
            "시로코": "siroco",
            "s": "siroco",
            "S": "siroco",
        }
        
        return (parser[server])?parser[server]:server;
    }
    
    const auctionquery = (option) => {
        const list = ["minLevel", "maxLevel", "rarity", "minReinforce", "maxReinforce", "minRefine", "maxRefine"]
        const condition = "&q="
        
        return urlquery(option, list, condition)
    }
    
    const auctionsort = (option) => {
        const list = ["unitPrice", "reinforce", "auctionNo"]
        const condition = "&sort="
        
        return urlquery(option, list, condition)
    }
    
    const itemquery = (option) => {
        const list = ["minLevel", "maxLevel", "rarity"]
        const condition = "&q="
        
        return urlquery(option, list, condition)
    }
    
    const urlquery = (option, list, condition) => {
        let query = []
        
        list.forEach((i) => {
            if (option[i]) query[query.length] = i + ":" + option[i]
        })
        
        return condition + query.join(',')
    }
    
    app.apikey = () => {
        return key
    }
    
    app.legacy = {
        api : (option, callback) => {
            api({
                url:legacyurl+`?mode=${option.mode}&no=${option.no}&server=${parseServer(option.server)}`,
                method:"GET"
            }, callback)
        },
        charinfo : (option, callback) => {
            app.legacy.api({mode: "detail", no: option.no, server: parseServer(option.server)}, callback)
        }
    }
    
    app.character = {
        search : (option, callback) => {
            api({
                url: `servers/${parseServer(option.server)}/characters?characterName=${esc(option.cname)}` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.wordType)?`&wordType=${option.wordType}`:'') 
                        + `&apikey=${key}` 
            }, callback)
        },
        info : {
            base : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}?apikey=${key}`
                }, callback)
            },
            status : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}/status?apikey=${key}`
                }, callback)
            },
            equip : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}/equip/equipment?apikey=${key}`
                }, callback)
            },
            avatar : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}/equip/avatar?apikey=${key}`
                }, callback)
            },
            creature : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}/equip/creature?apikey=${key}`
                }, callback)
            },
            flag : (option, callback) => {
                api({
                    url: `servers/${parseServer(option.server)}/characters/${option.cid}/equip/flag?apikey=${key}`
                }, callback)
            },
        }
    }
    
    app.auction = {
        search: (option, callback) => {
            api({
                url: `auction?itemName=${esc(option.itemname)}${auctionquery(option)}${auctionsort(option)}` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.wordType)?`&wordType=${option.wordType}`:'') 
                        + `&apikey=${key}` 
            }, callback)
        },
        detail: (option, callback) => {
            api({
                url: `auction/${option.auctionNo}?apikey=${key}`
            }, callback)
        }
    }
    
    app.item = {
        search: (option, callback) => {
            api({
                url: `items?itemName=${esc(option.itemname)}${itemquery(option)}` 
                        + ((option.limit)?`&limit=${option.limit}`:'') 
                        + ((option.wordType)?`&wordType=${option.wordType}`:'') 
                        + `&apikey=${key}`
            }, callback)
        },
        detail: (option, callback) => {
            api({
                url: `items/${option.itemId}?apikey=${key}`
            }, callback)
        }
    }
    
    return app
}

exports = module.exports = create