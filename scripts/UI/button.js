


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
        this.btnWidth = WIDTH*0.2
        this.emitters = []

        loadJSON('assets/json/fire2.json',this.print.bind(this))
    }

    print(e) {
        console.log(e)
    }



    setup() {
        
        

        this.sprite = this.createSprite({
            name: 'buttonSprite',
            url: this.assets[0],
            anchor: [0.5,0.5],
            width: this.btnWidth,
            x: WIDTH*0.5,
            y: HEIGHT*0.5,
            z: e_zIndex.character+0.1,
            addToScene: true,
            //visible: true,
        })

        this.sprite.interactive = true

        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )

        this.superScene.addChild(this.sprite)
        console.log(this.sprite)

        let emitterSprites = ['assets/particle.png']//PIXI.Sprite.fromImage('assets/particle.png')//PIXI.Sprite.fromImage(this.emitterAssets[0])
        let options = emitterOptions_sparks
        options.pos.x = WIDTH/2
        options.pos.y = HEIGHT/2
        let emitter = new PIXI.particles.Emitter( 
            this.scene, 
            emitterSprites, 
            emitterOptions_sparks
            )
        emitter.emit = false
        this.emitters.push(emitter)

        //this.weather(e_weather.rain, WIDTH*0.5, HEIGHT*0.8 ,10)

    }

    buttonEvent(e) {
        console.log('button click',e)
        for (let e of this.emitters) {
            e.playOnce()
        }
    }

    click() {}



    update(delta) {
        for (let e of this.emitters) { e.update(delta)}
    }

    weather(type, x,y,z) {

        let layer = new Container()
        layer.position.z = z
        this.addSprite(layer)

        let options = e_weather.properties[type].options
        options.pos.x = x
        options.pos.y = y
        let sprites = []
        let textureUrls = e_weather.properties[type].textures

        for (let url of textureUrls) {
            let sprite = PIXI.Texture.fromImage(url)
            sprites.push(sprite)
        }
    
        let emitter = new PIXI.particles.Emitter( layer, sprites, options )

        emitter.emit = true
        this.emitters.push(emitter)
        console.log(layer)
    }


}