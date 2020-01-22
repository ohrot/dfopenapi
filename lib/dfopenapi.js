"use strict";

exports = module.exports = (option) => {
    let app = {}

    app.option = (typeof(option) === 'object') ? option : {}
    app.key = (typeof(option) === 'string') ? option : option.key    

    app = require('./api')(app)
    app = require('./job')(app)
    app = require('./character')(app)
    app = require('./skill')(app)
    app = require('./auction')(app)
    app = require('./item')(app)
    app = require('./legacy')(app)
    app = require('./gateway')(app)

    app.parseServer = require('./parseServer')

    return app
}
