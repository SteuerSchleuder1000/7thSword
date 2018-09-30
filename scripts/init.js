






window.onload = function() {
    console.log('load game v 0.1')
    init_PIXI()
    game = new Game() // load function
}


function init_PIXI() {
    app = new PIXI.Application({ 
        width: WIDTH,   
        height: HEIGHT,      
        antialias: true,    
        transparent: false,
        resolution: 1, 
    })
    document.body.appendChild(app.view)
}

