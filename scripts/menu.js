

// menu system

let e_menues = {
    introScreen: 0,
    levelSelect: 1,
    options: 2,
    worldMenu: 3,
    properties: {}
}


class Menu extends Stage {

    constructor(manager, superScene) {
        super(manager, superScene)

        this.back = null // menues up in hirarchy
        this.next = {} // menues branching off from this
    }
}








class MenuManager extends Manager { 

    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'menuManager'
        this.assets = []
        
        this.state.add(e_menues.introScreen, new M_introScreen(this, this.scene))
        this.state.add(e_menues.levelSelect, new M_levelSelect(this, this.scene))
        
        //this.state.change(e_menues.introScreen)
    }

    progress(e,p) { } // load next menu if e.progress == 100

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













// IMPLEMENTATIONS

class M_introScreen extends Menu {

    constructor(manager, superScene) {

        super(manager, superScene)
        this.scene.name = 'introScreen'
        this.menuID = e_menues.mainscreen
        this.fontSize = 50
        this.text = 'Tap To Enter'
        this.assets = ['assets/menuscreen.png']
        

    }

    // load(callback) {
        
    // }


    setup(callback) {

        let bg = new Sprite(resources['assets/menuscreen.png'].texture)

        let scale = HEIGHT /bg.height
        bg.height *= scale
        bg.width *= scale
        bg.interactive = true
        bg.on('pointerdown', this.transition.bind(this))


        let style = new PIXI.TextStyle({
            fontFamily: 'Notable',
            fontSize: this.fontSize,
            fill: 'white',
            stroke: 'white',
            strokeThickness: 1,
        });

        let text = new Text(this.text, style)
        text.anchor.set(0.5,0.5)
        text.position.set(WIDTH /2, HEIGHT /2)

        this.scene.addChild(bg)
        this.scene.addChild(text)

        super.setup(callback)
        // this.loaded = true
        // if (callback) { callback() }
    }

    transition(e) {
        this.manager.transition(e_menues.levelSelect)
    }

} // mainscreen






class M_levelSelect extends Menu {
    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'levelSelect' // !!! delete eventually
        this.menuID = e_menues.levelSelect
        this.back = e_menues.introScreen
        this.assets = ['assets/grass.png'] // loaded in Scene.load()

    }// constructor



    setup(callback) {
        
        let bg = new Sprite(resources['assets/grass.png'].texture)

        let scale = HEIGHT /bg.height
        bg.height *= scale
        bg.width *= scale
        bg.interactive = true
        bg.on('pointerdown', this.transition.bind(this))


        let style = new PIXI.TextStyle({
            fontFamily: 'Notable',
            fontSize: 30,
            fill: 'black',
            stroke: 'white',
            strokeThickness: 1,
        });

        let text = new Text('Level 1', style)
        text.anchor.set(0.5,0.5)
        text.position.set(WIDTH *0.5, HEIGHT *0.2)

        this.scene.addChild(bg)
        this.scene.addChild(text)

        super.setup(callback)
    }

    transition() {
        // Level 1
        this.manager.loadLevel(e_levels.lv_002)
    }
}










