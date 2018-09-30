



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
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}