

class Menu_IntroScreen extends Menu {

    constructor(manager, superScene) {

        super(manager, superScene)
        this.scene.name = 'introScreen'
        this.menuID = e_menus.mainscreen
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
        this.manager.transition(e_menus.levelSelect)
    }

} // mainscreen
