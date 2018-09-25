






window.onload = function() {
    console.log('load game')
    init_PIXI()
    game = new Game() // load function
}


function init_PIXI() {
    app = new PIXI.Application({ 
        width: WIDTH,   
        height: HEIGHT,      
        antialias: true,    
        transparent: false,
        resolution: 0.5, 
    })
    document.body.appendChild(app.view)
}

// GAME PARAMETERS

let game, app // Global Objects
let HEIGHT = 1334
let WIDTH = 750 

let e_zPos = {
    bg: 0,
    enemy: 1,
    hero: 2,
    interface: 3,
    properties: {}
}

let Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text


// let Application = PIXI.Application,
//     Container = PIXI.Container,
//     Graphics = PIXI.Graphics,
//     loader = PIXI.loader,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite,
//     Text = PIXI.Text;