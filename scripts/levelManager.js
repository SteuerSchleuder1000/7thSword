

class LevelManager extends Manager {

    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'levelManager'

        // !!! no front loading init later
        //this.state.add(e_levels.lv_001, new Level_001(this, this.scene))
        //this.state.add(e_levels.lv_002, new Level_002(this, this.scene))
        
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


}