
const parseServer = (server) => {
    var parser = {
        "안톤": "anton",
        "안": "anton",
        "a": "anton",
        "A": "anton",
        "바칼": "bakal",
        "바": "bakal",
        "b": "bakal",
        "B": "bakal",
        "카인": "cain",
        "c": "cain",
        "C": "cain",
        "카시야스": "casillas",
        "카시": "casillas",
        "l": "casillas",
        "L": "casillas",
        "디레지에": "diregie",
        "디레": "diregie",
        "디": "diregie",
        "d": "diregie",
        "D": "diregie",
        "힐더": "hilder",
        "힐": "hilder",
        "h": "hilder",
        "H": "hilder",
        "프레이": "prey",
        "프": "prey",
        "p": "prey",
        "P": "prey",
        "시로코": "siroco",
        "시": "siroco",
        "s": "siroco",
        "S": "siroco",
    }
    
    return (parser[server])?parser[server]:server;
}

module.exports = parseServer
