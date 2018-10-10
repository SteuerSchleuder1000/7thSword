

// menu system

let e_menus = {
    introScreen: 0,
    levelSelection: 1,
    options: 2,
    hero: 3,
    talents: 4,
    init: {
        0: (m,s,o)=>{ return new Menu_IntroScreen(m,s,o) },
        1: (m,s,o)=>{ return new Menu_LevelSelection(m,s,o) },
        2: (m,s,o)=>{ },
        3: (m,s,o)=>{ return new Menu_Hero(m,s,o) },
        4: (m,s,o)=>{ return new Menu_Talents(m,s,o) },

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
        this.scene.name = 'MenuManager'

        console.log('MenuManager',args)
        this.hero = args.hero
    }

    transition(menuID) { 
        if (!this.state.contains(menuID)) { this.loadMenu(menuID) }
        this.state.change(menuID) 
    }

    loadMenu(menuID) {
        let options = {hero: this.hero}        
        this.state.add( menuID, e_menus.init[menuID](this, this.scene, options))
    }

    loadLevel(levelID) {
        this.manager.transition(e_gameStates.world, levelID)
    }

} // menuManager














