

class LevelManager extends StageManager {

    constructor(manager, superScene, args) {
        super(manager, superScene)
        this.scene.name = 'levelManager'

        console.log('levelManager',args)
        this.hero = args.hero
        this.interface = new Interface(this, this.hero)
        
    }

    transition(levelID) { 
        if (!this.state.contains(levelID)) { this.loadLevel(levelID) }
        this.state.change(levelID) 
    }

    loadMenu(menuID) {
        this.manager.transition(e_gameStates.mainMenu, menuID)
    }

    loadLevel(levelID) { // !!!
        let options = {hero: this.hero, interface: this.interface}
        console.log('load level',levelID,options)
        
        this.state.add( levelID, e_levels.init[levelID](this, this.scene, options))
    }

    restartLevel() {
        this.hero.reset()
        this.state.current.removeFromScene()
        this.state.current = null
        this.loadLevel(this.state.currentID)
        this.transition(this.state.currentID)
    }


}