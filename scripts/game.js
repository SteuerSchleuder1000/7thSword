






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

        this.state = new Statemachine(this)
        this.state.add( e_gameStates.mainMenu,   new MenuManager(this, this.scene))
        this.state.add( e_gameStates.world,      new LevelManager(this, this.scene))




        this.load()
        

        let update = delta => { this.update(delta) }
        app.ticker.add(update.bind(this))

    } // constructor


    load() {
        // load & display loading screen
        // load data
        // -> story progress
        // -> hero
        //  -> items, abilities etc.
        // transition to mainscreen

        this.loadingScreen(true)
        let callback = _=> { this.transition(e_gameStates.mainMenu, e_menues.introScreen); }

        this.hero = new Hero(this) // !!! load from save state
        this.story = null // load from save state

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

        this.state.update(delta)

    }


   




} // Game




