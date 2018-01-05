"use strict";

const character = require('./character')
const auction = require('./auction')
const item = require('./item')
const legacy = require('./legacy')

const api = require('./api')

exports = module.exports = (option) => {
    let app = {}

    app.key = (typeof(option) == 'string') ? option : option.key
    
    app = api(app)
    app = character(app)
    app = auction(app)
    app = item(app)
    app = legacy(app)

    return app
}