const axios = require('axios')
const request = require('request')
const cheerio = require('cheerio')
const qs = require('querystring')
const iconv = new (require('iconv').Iconv)('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

const parseServer = require('./parseServer')
const esc = require('./escape').esckr

const url = {
    legacy: {
        character: 'http://df.nexon.com/FRM/info/charac_search_api.php',
        community: 'http://df.nexon.com/df/community/',  
    }
}

module.exports = (app) => {
    app.legacy = {
        request: (option, callback) => {
            request(
                {
                    url: url.legacy.community + option.url,
                    encoding: null
                }, 
                function (err,res,body) {
                    if (err) return callback(err);
                    return callback(body);
                }
            )
        },
        axios: (option, callback) => {
            axios({
                url: option.url
            }).then((res) => {
                return callback(res.data)
            }).catch((err) => {
                return callback(err)
            })
        },
        character: {
            api: (option, callback) => {
                option.url = url.legacy.character + `?mode=${option.mode}&no=${option.no}&server=${parseServer(option.server)}`
                app.legacy.axios(option, callback)
            },
            info: (option, callback) => {
                option.mode = 'detail'
                app.legacy.character.api(option, callback)
            }
        },
        community: {
            capture: (option, callback) => {
                option.url = `capture?order=reg_date&order_type=DESC&category=0&search_type=${option.type}&keyword=${esc(option.keyword)}` + ((option.page)?`&page=${option.page-1}`:'')
                app.legacy.request(
                    option,
                    (res) => {
                        const contents = cheerio.load(iconv.convert(res).toString())('.cast_lst ul li');
                        let wrap = []
                        
                        for (let i=0; i<contents.length; i++) {
                            const content = cheerio(contents[i])
                            wrap.push({
                                title: content.find('span.tit')[0].children[0].data,
                                name: content.find('span.nick')[0].children[0].data,
                                image: qs.parse(cheerio(contents[i]).find('p.thum a')[0].attribs.style,';',':')['background-image'].split('\'')[1],
                                date: content.find('p.date em')[0].children[0].data,
                                view: content.find('p.date em')[1].children[0].data,
                                like: content.find('p.date em')[2].children[0].data,
                                href: content.find('p.thum a')[0].attribs.href
                            })
                        }
                        
                        return callback(wrap)
                    }
                )
            }
        }
    }
    
    return app
}