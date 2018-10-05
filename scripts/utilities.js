



let randInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min }
let randChoice = (arr) => { return arr[Math.floor(Math.random()*arr.length)] }
let pythagoras = (x,y) => { return Math.sqrt(x * x + y * y) }

let floorCeil = (x, min, max) => { 
    if ( min > max) { [min,max] = [max,min] }
    return Math.max(Math.min(x, max),min )
}

let loadJSON = (filename, callback)=>{
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200" && callback) {
            //callback(xobj.responseText);
            let txt = xobj.responseText
            let jsonFile = JSON.parse(txt)
            callback(jsonFile)
          }
    };
    xobj.send(null);  
}

let loadObj = ()=>{}
let saveObj = ()=>{}


function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press({type: 'keydown'});
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release({type: 'keyup'});
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener('keydown', key.downHandler.bind(key), false)
    window.addEventListener('keyup', key.upHandler.bind(key), false)
    return key;
} // keyboard




let checkSprite = (sprite,rec)=>{

    console.log('-|'.repeat(rec) + ' ' + sprite.name)

    let children = sprite.children
    for (let s of children) { checkSprite(s,rec+1)}
}





