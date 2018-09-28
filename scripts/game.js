let log = console.log



/*


Todo:
    - speech -> dialog          x
    - simplify abilities        x
    - add abilities             x

    
    - combo system -> change stats?
    - block animation
    - sounds
    - sfx -> weather -> rain, fog
    - projectile
    - rudimentary combat menu -> dev menu -> js console // dom element
    - combat system
    - buff system
    - level progression
    - add enemies
    
    


    - ASSETS



*/

let currentLevel = null



let e_gameStates = {
    loading: 0,
    mainMenu: 1,
    world: 2,
    worldMenu:3,
    properties: {}

}





class Game {

    constructor() {

        this.scene = new Container()
        this.scene.name = 'Game'
        app.stage.addChild(this.scene)
        
        this.loaded = false 

        this.state = new Statemachine()
        this.state.add( e_gameStates.mainMenu,   new MenuManager(this, this.scene))
        this.state.add( e_gameStates.world,      new LevelManager(this, this.scene))

        this.soundSettings = {volume: 1}


        this.load()
        

        let update = delta => { this.update(delta) }
        app.ticker.add(update.bind(this))

    } // constructor


    load() {
        

        this.loadingScreen(true)
        // let callback = _=> { this.transition(e_gameStates.mainMenu, e_menues.introScreen); }
        let callback = _=> { this.transition(e_gameStates.world, e_levels.lv_002) }

        callback()

    }



    loadingScreen(b) {
        // turn on/off
    }

    printoutSpriteTree() {
    }

    transition(state, option) {
        this.state.change(state)
        this.state.current.transition(option)
    }


    update(delta) {
        delta /= FPS
        //console.log('update?', this.state.update)
        this.state.update(delta)

    }


   




} // Game




