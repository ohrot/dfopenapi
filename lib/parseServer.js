
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

module.exports = parseServer