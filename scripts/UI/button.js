


// let e_btnStates = {
//     idle: 0,
//     active: 1,
//     inactive: 2,
// }


class Button extends Scene {

    constructor(manager, assets) {

        super(manager)
        this.scene.visible = true
        this.scene.position.z = e_zIndex.interface //e_zIndex.bg + 0.1

        this.assets = assets || []
        // this.assets.push('assets/images/particles/solidCircle.png')


        this.sprite = null
        this.t = 0


        // this.state = e_btnStates.idle
        //loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))
        // loadJSON('assets/json/sparks3.json',this.setupEmitter.bind(this))
    }


    // setupEmitter(options) {
    //     console.log('setupEmitter')
    //     //let emitterSprites = ['assets/pixel100px.png']
    //     let emitterSprites = ['assets/solidCircle.png']
    //     options.pos.x = WIDTH/2
    //     options.pos.y = HEIGHT/2
    //     options.emitterLifetime = 0.2
    //     let emitter = new PIXI.particles.Emitter( 
    //         this.scene, 
    //         emitterSprites, 
    //         options,//emitterOptions_sparks
    //         )
    //     emitter.emit = false
    //     this.emitters.push(emitter)
    //     this.emitterOptions = options
    // }


    addToScene(args) {
        
        this.superScene = args.scene
        this.sprite = this.createSprite({
            name: 'buttonSprite',
            url: this.assets[0],
            anchor: [0.5,0.5],
            width: args.width,
            x: args.x,
            y: args.y,
            z: args.z,
            addToScene: true,
        })

        this.sprite.interactive = true

        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )
        this.scene.on('pointerup',this.print.bind(this))

        this.superScene.addChild(this.sprite)
        
  

        //this.weather(e_weather.rain, WIDTH*0.5, HEIGHT*0.8 ,10)

    }

    buttonEvent(e) {
        console.log('button event',e)
        // let url = this.assets[1]
        // let texture = resources[url].texture
        // this.sprite.texture = texture
        // for (let e of this.emitters) {e.playOnce()}
    }



}