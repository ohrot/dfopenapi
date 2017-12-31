# dfopenapi

> api wrapper for [Dungeon and Fighterⓒ](http://df.nexon.com) (dnf@korea) OpenAPI (powered by [Neople OpenAPI](https://developers.neople.co.kr)) : support URL encoding, server name parsing, and ajax

## Getting started

### Installation 

Using npm:

```bash
$ npm install dfopenapi
```

### Integration

```node.js
var apikey = <apikey>; // published by neople
var dfopenapi = require('dfopenapi');
var api = dfopenapi({key:apikey});
```


in short, you can serve apikey as string
```node.js
var api = require('dfopenapi')(<apikey>);
```

Example:

```node.js
var apikey = <apikey>;  // published by neople
var api = require('dfopenapi')({key:apikey});

api.character.search(
    {server: 'bakal', charname: 'DFCAT'}, 
    function (res) {
        console.log(res);
    }
);

api.character.info.equip(
    {server: 'bakal;, cid: 'ccae5367270d0c2516cfb92df1d14ed3'}, 
    function (res) {
        console.log(res);
    }
);

api.auction.search(
    {itemname: '폭식', wordType: 'full'}, 
    function (res) {
        console.log(res)
    }
);

api.item.detail(
    {itemId: 'c6a38ab8c7540cfc51ea2b0b8b610fa7', wordType: 'full'}, 
    function (res) {
        console.log(res)
    }
);
```

## API

Support all apis powered by [![Neople OpenAPI](https://developers.neople.co.kr/contents/apiDocs)](https://developers.neople.co.kr/contents/apiDocs)

* Character Search

|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|charname|string|URL encoding<br>or<br>not|Y|||
|limit|integer|# rows of response||10|100|
|wordType|string|match/start/full||match||

* 