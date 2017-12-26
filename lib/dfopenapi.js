"use strict";

var ajax = require('ajax-request')

let legacyurl = "http://df.nexon.com/FRM/info/charac_search_api.php"

let create = (option) => {
    let handler = {}
    
    const key = (typeof(option)=="string")?option:option.key;
    
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
    
    const parseCharName = (name) => {
        
    }
    
    handler.apikey = () => {
        return key
    }
    
    handler.legacy = {
        api : (option, callback) => {
        ajax({
            url:legacyurl,
            method:"GET",
            data: {
                mode: option.mode,
                no: option.no,
                server: parseServer(option.server)
            }
        }, function (err,res,body){
            if (err) console.log(err)
            
            return callback(JSON.parse(body), err)
        })
    },
    
        charinfo : (option, callback) => {
        handler.legacy.api({mode: "detail", no: option.no, server: option.server}, callback)
    }

    }
    
    return handler
}

exports = module.exports = create