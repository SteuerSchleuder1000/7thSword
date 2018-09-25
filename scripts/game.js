






let e_gameStates = {
    mainMenu: 0,
    world: 1,
    worldMenu:2,
    properties: {}

}






class Game {

    constructor() {

        this.scene = new Container()
        this.scene.name = 'Game'
        app.stage.addChild(this.scene)
        

        this.state = new Statemachine(this)
        this.state.add( e_gameStates.mainMenu,   new MenuManager(this, this.scene))
        this.state.add( e_gameStates.world,      new LevelManager(this, this.scene))


        this.hero =  new Hero(this)



        this.transition(e_gameStates.mainMenu, e_menues.introScreen)

        let update = delta => { this.update(delta) }
        app.ticker.add(update.bind(this))

    } // constructor






    transition(state, option) {
        this.state.change(state)
        this.state.current.transition(option)
    }


    update(delta) {

        this.state.update(delta)

    }


   




} // Game




