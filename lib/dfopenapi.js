"use strict";

var axios = require('axios')
var qs = require('querystring')

const legacyurl = "http://df.nexon.com/FRM/info/charac_search_api.php"
const openapiurl = "https://api.neople.co.kr/df/"

let create = (option) => {
    let handler = {}
    
    const key = (typeof(option)=="string")?option:option.key;
    
    const api = (option, callback) => {
        
        axios({
            url: openapiurl + option.url,
            method: "GET",
        }).then(function(res) {
            return callback(res.data)
        })
    }
    
    handler.apikey = () => {
        return key
    }
    
    handler.legacy = {
        api : (option, callback) => {
            api({
                url:legacyurl+`?mode=${option.mode}&no=${option.no}&server=${option.server}`,
                method:"GET"
            }, callback)
        },
        charinfo : (option, callback) => {
            handler.legacy.api({mode: "detail", no: option.no, server: option.server}, callback)
        }
    }
    
    handler.character = {
        search : (option, callback) => {
            api({
                url: `servers/${option.server}/characters?characterName=${option.charname}&limit=100&wordType=full&apikey=${key}`
            }, callback)
        },
        info : {
            base : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}?apikey=${key}`
                }, callback)
            },
            status : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}/status?apikey=${key}`
                }, callback)
            },
            equip : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}/equip/equipment?apikey=${key}`
                }, callback)
            },
            avatar : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}/equip/avatar?apikey=${key}`
                }, callback)
            },
            creature : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}/equip/creature?apikey=${key}`
                }, callback)
            },
            flag : (option, callback) => {
                api({
                    url: `servers/${option.server}/characters/${option.cid}/equip/flag?apikey=${key}`
                }, callback)
            },
        }
    }
    
    return handler
}

exports = module.exports = create