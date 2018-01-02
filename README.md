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
    {server: 'bakal', cid: 'ccae5367270d0c2516cfb92df1d14ed3'}, 
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
```
character.search({server: <server>, cname: <charname>[, limit: <limit>, wordType: <wordType>])
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|charname|string|URL encoding<br>[or<br>not](#smart-url-encoding)|Y|||
|limit|integer|# rows of response||10|100|
|wordType|string|match / start / full||match||

> array of {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName}

* Character Base Info
```
character.info.base({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName}

* Character Status Info
```
character.info.status({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {buff:[모험단버프, 무제한 길드능력치, 기간제 길드능력치], status:[HP, MP, 힘, 지능,체력, 정신력, 물리 공격, 마법 공격, 독립 공격, 물리 방어, 마법 방어, 물리 크리티컬, 마법 크리티컬, 공격 속도, 캐스팅 속도, 이동 속도, 항마, 적중률, 회피율, HP 회복량, MP 회복량, 경직도, 히트리커버리, 화속성 강화, 화속성 저항, 수속성 강화, 수속성 저항, 명속성 강화, 명속성 저항, 암속성 강화, 암속성 저항  }

* Character Equipment Info
```
character.info.equip({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {equipment:[WEAPON, TITLE, JACKET, SHOULDER, PANTS, SHOES, WAIST, AMULET, WRIST, RING, SUPPORT, MAGIC_STON, EARRING]}

* Character Avatar Info
```
character.info.avatar({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {avatar(array of each avatar)}

* Character Creature Info
```
character.info.creature({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

* Character Flag Info
```
character.info.flag({server: <server>, cid: <charname>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

* Auction Search
```
character.search({server: <server>, cname: <charname>[, limit: <limit>, wordType: <wordType>])
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>user defined server name|Y|||
|charname|string|URL encoding<br>or<br>not|Y|||
|limit|integer|# rows of response||10|100|
|wordType|string|match / start / full||match||

> array of {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName}


## User Defined Server Name

<code>dfopenapi</code> contains server name parsing through <code>parseServer</code>.
Unique server name is like 'bakal', 'cain', however, you can use user defined server name like '바칼'. Even if you can use just 'B' for server name.
Wanna more, add additional set into <code>parser</code> in <code>parseServer</code> like <code>"dire": "diregie"</code>.

## Smart URL encoding

<code>dfopenapi</code> contains URL Encoding process <code>esc</code> for username/itemname.
It use regular expression to check name is URL encoded. If it already already encoded, return string directly. Else, use <code>querystring.escape</code> to URL encoding.
So, you don't care about name is URL encoded or not.