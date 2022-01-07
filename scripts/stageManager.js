

let e_stages = {

    // menus
    introScreen: 0,
    levelSelection: 1,
    options: 2,
    hero: 3,
    talents: 4,

    // levels
    lv_002: 5,

    init: {
        // menus (stageManager, scene, options)
        0: (m,s,o)=>{ return new Menu_IntroScreen(m,s,o) },
        1: (m,s,o)=>{ return new Menu_LevelSelection(m,s,o) },
        2: (m,s,o)=>{ },
        3: (m,s,o)=>{ return new Menu_Hero(m,s,o) },
        4: (m,s,o)=>{ return new Menu_Talents(m,s,o) },

        // levels
        5: (m,s,o) => {return new Level_001(m,s,o)}, // starting level
        6: (m,s,o) => {return new Level_002(m,s,o)},
    },
}


class StageManager extends Stage { // StageManager

    constructor(manager, superScene, args) {
        super(manager, superScene)
        // this.scene.visible = false

        this.stage = new Statemachine()

        this.hero = args.hero
        this.interface = new Interface(this, this.hero)
    }



    transition(stageID) {
        if (!this.stage.contains(stageID)) { this.loadStage(stageID) }
        this.stage.change(stageID) 
    }

    loadStage(stageID) {
        let options = {hero: this.hero, interface: this.interface}
        console.log('load level',stageID, options)
        
        let stage = e_stages.init[stageID](this, this.scene, options);
        this.stage.add( stageID, stage);
    }


    restartLevel() {
        this.hero.reset()
        this.stage.current.removeFromScene()
        this.stage.current = null
        this.loadStage(this.stage.currentID)
        this.transition(this.stage.currentID)
    }


    loadingProgress(e,p) { 
        //console.log('progress',e.progress) 
    }

    update(delta) { 
        this.stage.update(delta)
    }

}

