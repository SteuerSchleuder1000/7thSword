


let DB 



window.onload = function() {
    console.log('load game v 0.1')
    init_PIXI()
    loadGame()
    
    // game = new Game() // load function
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



function loadGame() {

    DB = new Dexie('gameDB')
    DB.version(1).stores({
        userData: 'name'
    })

    // get hero
    DB.userData
        .get('hero')
        .then( (hero)=> { console.log('hero found?', this,hero);
                             game = new Game ()
                         } )
        //.catch( (error)=> { console.log('Ooops:',error)})

}





let saveHero = (hero)=> {
    DB.userData
        .put(hero)
        .catch( (error)=> { console.log('Ooops: ',error)})
}














