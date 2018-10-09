

class Menu_IntroScreen extends Menu {

    constructor(manager, superScene) {

        super(manager, superScene)
        this.scene.name = 'introScreen'
        this.menuID = e_menus.mainscreen
        this.fontSize = 50
        this.text = 'Tap To Enter'
        //this.assets = ['assets/menuscreen.png']

        let path = 'assets/images/backgrounds/'
        this.bg = new Background(this, {assets: [path+'menuscreen.png']})
        this.assets.push(path+'menuscreen.png')

    }

    // load(callback) {
        
    // }


    setup(callback) {

        
        this.bg.addToScene({scene:this.scene})


        //TEST 
        // let shaderCode = 'void main(){ gl_FragColor = vec4(1.0,1.0,1.0,1.0); }'
        // let shader = new PIXI.Filter('',shaderCode);
        // let shader = new PIXI.filters.BlurFilter()
        // this.bg.sprite.filter = [shader]

        // console.log('shader:',shader)

        this.scene.interactive = true
        this.scene.on('pointerdown', this.transition.bind(this))


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
        text.position.z = e_zIndex.interface

        // this.scene.addChild(bg)
        this.scene.addChild(text)

        super.setup(callback)
        // this.loaded = true
        // if (callback) { callback() }
    }

    transition(e) {
        this.manager.transition(e_menus.levelSelect)
    }

} // mainscreen
