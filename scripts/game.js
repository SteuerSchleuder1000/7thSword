let log = console.log



/*


Todo:
    - speech -> dialog          x
    - simplify abilities        x
    - add abilities             x

    
    - combo system              x
    - block animation           x
    - sounds                    x
    - sfx                       x
    - projectile                
    - button "feel"             x


    - game feel -> timers, animation, sound

    - sounds                    x
    - emitter: fireball, sparks x
    - emitter glow
    - rudimentary combat menu -> dev menu -> js console // dom element
    - buff system               x
    - decisiontree 1            x
    - level progression         x
    - load/ remove enemies      x
    - load data
    - load level 
    - design level 003
    - class design             

    - design enemies
    - coordinate system
    - improve character animation
    - loot system        
    - indexedDB
    - Character menu


    - Screen transition
    - Quest hub!!!

    


    - Strategy:
        - see enemy animation/ dialog/ sfx
        -> block, cancel, dispell, heal

        - ranodm ability triggers
        -> use them in rotation

        - enemy in vulnerable state
        -> use ultimate attack

        - multiple enemies
        -> priority?

    - Swords
        - Ember Blade
        - Horizon Blade
        - Mist Blade
        - Ashen Blade
        - Dawn Blade
        - Moon Blade
        - 
*/

let currentLevel = null // for easy acces in console



let e_gameStates = {
    loading: 0,
    mainMenu: 1,
    world: 2,
    worldMenu:3,
    properties: {}

}





class Game {

    constructor(args) {

        console.log('init game',args)

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
        let callback = _=> { this.transition(e_gameStates.mainMenu, e_menus.introScreen); }
        // let callback = _=> { this.transition(e_gameStates.world, e_levels.lv_002) }
        // let callback = _=> { this.transition(e_gameStates.world, e_levels.lv_000) } // test levl

        callback()

    }



    loadingScreen(b) {
        // turn on/off
    }

    transition(state, option) {
        this.state.change(state)
        this.state.current.transition(option)
    }


    update(delta) {
        delta /= SETTINGS.fps
        
        //console.log('update?', this.state.update)
        this.state.update(delta)

    }


   




} // Game




