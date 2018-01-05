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

Support all apis powered by [Neople OpenAPI](https://developers.neople.co.kr/contents/apiDocs)

* Character Search
```
character.search({server: <server>, cname: <cname>[, limit: <limit>, wordType: <wordType>]})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cname|string|character name<br>URL encoding<br>or<br>[not](#smart-url-encoding)|Y|||
|limit|integer|# rows of response||10|100|
|wordType|string|match / start / full||match||

> array of {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName}

* Character Base Info
```
character.info.base({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName, adventrueName, guildId, guildName}

* Character Status Info
```
character.info.status({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {buff:[모험단버프, 무제한 길드능력치, 기간제 길드능력치], status:[HP, MP, 힘, 지능,체력, 정신력, 물리 공격, 마법 공격, 독립 공격, 물리 방어, 마법 방어, 물리 크리티컬, 마법 크리티컬, 공격 속도, 캐스팅 속도, 이동 속도, 항마, 적중률, 회피율, HP 회복량, MP 회복량, 경직도, 히트리커버리, 화속성 강화, 화속성 저항, 수속성 강화, 수속성 저항, 명속성 강화, 명속성 저항, 암속성 강화, 암속성 저항  }

* Character Equipment Info
```
character.info.equip({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {equipment:[WEAPON, TITLE, JACKET, SHOULDER, PANTS, SHOES, WAIST, AMULET, WRIST, RING, SUPPORT, MAGIC_STON, EARRING]}

* Character Avatar Info
```
character.info.avatar({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

> base info + {avatar(array of each avatar)}

* Character Creature Info
```
character.info.creature({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

* Character Flag Info
```
character.info.flag({server: <server>, cid: <charname>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|server|string|server unique name<br>or<br>[user defined server name](#user-defined-server-name)|Y|||
|cid|string|character unique code<br>(128bit hash)|Y|||

* Auction Search
```
auction.search({itemId: <itemId>, itemName: <itemName>[, minLevel: <minLevel>, maxLevel: <maxLevel>, rarity: <rarity>, minReinforce: <minReinforce>, maxReinforce: <maxReinforce>, minRefine: <minRefine>, maxRefine: <maxRefine>, unitPrice: <unitPrice>, reinforce: <reinforce>, auctionNo: <auctionNo>, limit: <limit>, wordType: <wordType>]})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|itemId|string||Y|||
|itemName|string|item name<br>URL encoding<br>or<br>[not](#smart-url-encoding)|Y|||
|minLevel|integer|minimum required level||||
|maxLevel|integer|maximum required level||||
|rarity|string|item rarity||||
|minReinforce|integer|minimum reinforce level||||
|maxReinforce|integer|maximum reinforce level||||
|minRefine|integer|minimum refine level||||
|maxRefine|integer|maximum refine level||||
|unitPrice|string|sort by item unit price<br>asc / desc||||
|reinforce|string|sort by reinforce level<br>asc / desc||||
|auctionNo|string|sort by auctionNo<br>asc / desc||||
|limit|integer|# rows of response||10|100|
|wordType|string|match / start / full||match||

<code>itemId</code> or <code>itemName</code> is required.

<code>auctionNo: 'asc'</code> is default unless any sort option is defined.

* Auction Detail
```
auction.detail({auctionNo: <auctionNo>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|auctionNo|string||Y|||

* Item Search
```
item.search({itemName: <itemName>[, minLevel: <minLevel>, maxLevel: <maxLevel>, rarity: <rarity>, trade: <trade>, limit: <limit>, wordType: <wordType>]})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|itemName|string|item name<br>URL encoding<br>or<br>[not](#smart-url-encoding)|Y|||
|minLevel|integer|minimum required level||||
|maxLevel|integer|maximum required level||||
|rarity|string|item rarity||||
|trade|boolean|can regist auction||false||
|limit|integer|# rows of response||10|100|
|wordType|string|match / start / full||match||

* Item Detail
```
item.detail({itemId: <itemId>})
```
|parameter|type|description|required|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|itemId|string||Y|||



> array of {characterId, characterName, level, jobId, jobGrowId, jobName, jobGrowName}

# Legacy API in [Officail Homepage](http://df.nexon.com/)

> !! Legacy API is not recommanded. We have no responsiblilty for abusing this legacy api.

In officail homepage of dungeon and fighter, there is legacy api via <code>http://df.nexon.com/FRM/info/charac_search_api.php</code> for character search and view detail. It is for pure web browser, not for 3-party app like [pris.kr](http://pris.kr).

Legacy api is not need <code>apikey</code>. So, it cannot be controlled by neople and can cause big traffic on neople server, and might access blocked from neople.

Legacy api is not separated by category (equip/avatar/...). Its response contains full information and it has redundant. Legacy api is not supported by Neople API, it is not up-to-date. For example, Neople API update to contain <code>{adventureName, guildId, guildName}</code> in base info in 20180104, however, legacy api is not contains <code>adventrueName</code> which is important for identifing unique user (or account).

Legacy api handles <code>no</code> (<code>charac_no</code> in response) for characterId. But it is different from Neople API's. You must be careful of mix legacy API with Neople API.

Legacy api contains <code>avatar_image</code> and <code>occDate</code>, not supported in Neople API.

DNF Web Avatar renderer(http://avatar.df.nexon.com/) uses <code>charac_no</code> in legacy API, not characterId in Neople API. So, if you want to contain avatar image on your service, you should use legacy API until Neople support avatar image url in Neople API. (Or merge <code>no</code> and <code>characterId</code>).

<code>occDate</code> in <code>stat</code> shows the time recent logout. 

## Character API
```
character.legacy.axios({mode: <mode>, no: <charname>, server: <server>})
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|mode|string|search / detail|Y|||
|no|string|character unique code<br>(128bit hash)<br>**Differ from Neople API**|Y|||
|server|string|server unique name<br>or<br>user defined server name|Y|||

```
character.legacy.character.info({no: <charac_no>, server: <server>})
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|no|string|character unique code<br>(128bit hash)<br>**Differ from Neople API**|Y|||
|server|string|server unique name<br>or<br>user defined server name|Y|||

## Community API
```
character.legacy.request({url: <url>)
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|url|string||Y|||

```
character.legacy.community.api({type: <search_type>, keyword: <keyword>})
```
|parameter|type|description|necessary|default|maximum|
|:-:|:-:|:-:|:--:|:-:|:-:|
|type|string|charac_name / title|Y|||
|keyword|string|character name / title<br>URL encoding<br>or<br>[not](#smart-url-encoding)|Y|||

For <code>euc-kr</code> decoding, use <code>request</code> insted of <code>axios</code>.

# Addons

## User Defined Server Name

<code>dfopenapi</code> contains server name parsing through <code>parseServer</code>.

Unique server name is like 'bakal', 'cain', however, you can use user defined server name like '바칼'. Even if you can use just 'B' for server name.

Wanna more, add additional set into <code>parser</code> in <code>lib/parseServer.js</code> like <code>"dire": "diregie"</code>.

## Smart URL encoding

<code>dfopenapi</code> contains URL Encoding process <code>esc</code> for username/itemname.

It use regular expression to check name is URL encoded. If it already already encoded, return string directly. Else, use <code>querystring.escape</code> to URL encoding.

So, you don't care about name is URL encoded or not.

# Patch Note

## 20180105

Include <code>{adventureName, guildId, guildName}</code> and <code>trade</code> property in <code>item.search</code> in 20180104 patch.

## 20180106

Include community capture crawler in official homepage <code>legacy.community.capture</code>

Divide single <code>dfopenapi.js</code> into each modules (<code>api.js</code>, <code>auction.js</code>, <code>character.js</code>, <code>escape.js</code>, <code>item.js</code>, <code>legacy.js</code>, <code>parseServer.js</code>)

