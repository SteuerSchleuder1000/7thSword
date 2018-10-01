


let e_btnStates = {
    idle: 0,
    active: 1,
    inactive: 2,
}


class Button extends Scene {

    constructor(manager, superScene) {

        super(manager,superScene)
        this.scene.visible = true
        this.scene.position.z = e_zIndex.bg + 0.1
        this.emitterAssets = [
            'assets/solidCircle.png'
        ]

        this.assets = [
            'assets/choice.png',
            'assets/choiceA.png',
            'assets/choiceB.png',
        ]

        this.assets = this.assets.concat(this.emitterAssets)

        this.sprite = null
        this.state = e_btnStates.idle
        this.btnWidth = WIDTH*0.15
        this.emitters = []
        this.t = 0

        //loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))
        loadJSON('assets/json/sparks3.json',this.setupEmitter.bind(this))
    }


    print(e) {
        console.log(e)
    }

    setupEmitter(options) {
        console.log('setupEmitter')
        //let emitterSprites = ['assets/pixel100px.png']
        let emitterSprites = ['assets/solidCircle.png']
        options.pos.x = WIDTH/2
        options.pos.y = HEIGHT/2
        options.emitterLifetime = 0.2
        let emitter = new PIXI.particles.Emitter( 
            this.scene, 
            emitterSprites, 
            options,//emitterOptions_sparks
            )
        emitter.emit = false
        this.emitters.push(emitter)
        this.emitterOptions = options
    }


    setup() {
        console.log('setup')
        // if json not loaded -> callback in 0.1 sec
        
        // SETUP SPRITE
        this.sprite = this.createSprite({
            name: 'buttonSprite',
            url: this.assets[0],
            anchor: [0.5,0.5],
            width: this.btnWidth,
            x: WIDTH*0.5,
            y: HEIGHT*0.5,
            z: e_zIndex.character+0.1,
            addToScene: true,
            //alpha: 0.5,
            //visible: true,
        })

        this.sprite.interactive = true

        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )
        this.scene.on('pointerup',this.print.bind(this))

        this.superScene.addChild(this.sprite)
        




        

        //this.weather(e_weather.rain, WIDTH*0.5, HEIGHT*0.8 ,10)

    }

    buttonEvent(e) {
        let url = this.assets[1]
        let texture = resources[url].texture
        this.sprite.texture = texture
        for (let e of this.emitters) {
            e.playOnce()
        }
    }

    click() {}



    update(delta) {
        for (let e of this.emitters) { e.update(delta)}
    }

   


}