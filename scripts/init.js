


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
        .then( (hero)=> {   console.log('load game Hero:',hero)
                             game = new Game (hero)
                         } )

}





let saveHero = (hero)=> {
    DB.userData
        .put(hero)
        .catch( (error)=> { console.log('Ooops: ',error, DB)})
}










// DEXIE JS Tutorial -> what's a primary key, index etc?




















