

class LevelManager extends Manager {

    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'levelManager'

        
    }

    loadHero(stage) { return new Hero(stage, stage.scene, stage.combat) }

    transition(levelID) { 
        if (!this.state.contains(levelID)) { this.loadLevel(levelID) }
        this.state.change(levelID) 
    }

    loadMenu(menuID) {
        this.manager.transition(e_gameStates.mainMenu, menuID)
    }

    update(delta) {
        super.update(delta)
        //console.log('levelManager update',delta, this.state)
    }

    loadLevel(levelID) { // !!!
        console.log('load level',levelID)
        this.state.add(levelID, e_levels.init[levelID](this, this.scene))
    }

    restartLevel() {
        this.state.current = null
        this.loadLevel(this.state.currentID)
        this.transition(this.state.currentID)
    }


}