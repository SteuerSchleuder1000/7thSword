


class LevelManager extends Manager {

    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'levelManager'

        // !!! no front loading init later
        //this.state.add(e_levels.lv_001, new Level_001(this, this.scene))
        //this.state.add(e_levels.lv_002, new Level_002(this, this.scene))
        
    }

    loadHero() { return this.manager.hero }

    transition(levelID) { 
        if (!this.state.contains(levelID)) { this.loadLevel(levelID) }
        this.state.change(levelID) 
    }

    loadMenu(menuID) {
        this.manager.transition(e_gameStates.mainMenu, menuID)
    }

    loadLevel(levelID) { // !!!
        this.state.add(levelID, e_levels.init[levelID](this, this.scene))
    }


}