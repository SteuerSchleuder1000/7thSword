

class Menu_LevelSelection extends Menu {
    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'levelSelect' // !!! delete eventually
        this.menuID = e_menus.levelSelect
        this.back = e_menus.introScreen
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

