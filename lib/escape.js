const qs = require('querystring')
const urlencode = require('urlencode')

exports.esc = (string) => {
    return (/%/g.test(string))?string:qs.escape(string)
}

exports.esckr = (string) => {
    return (/%/g.test(string))?string:urlencode(string, 'euc-kr')
}