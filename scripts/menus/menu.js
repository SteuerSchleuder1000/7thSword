

// menu system

let e_menus = {
    introScreen: 0,
    levelSelect: 1,
    options: 2,
    hero: 3,
    init: {
        0: (m,s)=>{ new Menu_IntroScreen(m,s) },
        1: (m,s)=>{ new Menu_LevelSelection(m,s) },
        2: (m,s)=>{ },
        3: (m,s)=>{ new Menu_Hero(m,s) },

    }
}


class Menu extends Stage {

    constructor(manager, superScene) {
        super(manager, superScene)

        this.back = null // menues up in hirarchy
        this.next = {} // menues branching off from this
    }
}








class MenuManager extends StageManager { 

    constructor(manager, superScene, args) {
        super(manager, superScene)
        this.scene.name = 'menuManager'
        this.assets = []
        
        this.state.add(e_menus.introScreen, new Menu_IntroScreen(this, this.scene))
        this.state.add(e_menus.levelSelect, new Menu_LevelSelection(this, this.scene, args))
        
        //this.state.change(e_menus.introScreen)
    }

    loadingProgress(e,p) { } // load next menu if e.progress == 100

    preload() {
        
        for (let menu of this.state.states) {
            for (let asset of menu.assets) {
                if (this.assets.index(asset) == -1) {
                    this.assets.push(asset)
                }
            }
        }


        let setup = _=> { this.setup(callback) }
        let progress = (e,p) => { this.progress(e,p)}
        PIXI.loader
            .add(this.assets)
            .on('progress', progress.bind(this))
            .load(setup.bind(this))
    }

    setup() { 
        for (let menu of this.state.states) {
            menu.loaded = true
        }
    }

    
    transition(menu) {
        this.state.change(menu)
    }

    loadLevel(level) {
        this.manager.transition(e_gameStates.world, level)
    }


} // menuManager














