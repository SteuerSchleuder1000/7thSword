





class Level_Test extends Level {
    constructor(manager, superScene) {
        console.log('level 002')
        super(manager, superScene)
        this.scene.name = 'Test Level'
        


        // Background
        this.bg = new Background(this,this.scene,'assets/menuscreen.png')

        this.btn = new Button(this, this.scene)


        
        this.assets = [
            'assets/flame.png',
            //'assets/solidCircle.png',
        ]



        e_weather.properties[e_weather.flame].textures = this.assets.slice() //['assets/solidCircle.png']
        this.assets = this.assets.concat(this.btn.assets)

    }


    setup(callback) {

        this.bg.setup()
        this.btn.setup()
        

        //this.weather(e_weather.flame, WIDTH*0.5, HEIGHT*0.8 ,10)


        super.setup(callback)
    }





    update(delta) { // 
        super.update(delta) // takes care of this.animations, emitters
        for (let e of this.emitters) { e.update(delta) }
        this.btn.update(delta)
    }





    start() {
        
    }

    restartLevel() {
        this.manager.transition(e_levels.lv_003)

        this.end()
        
    }


    end() {
        
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
    
        let emitter2 = new PIXI.particles.Emitter( layer, sprites, options )

        emitter2.emit = true
        this.emitters.push(emitter2)
    }


    
    event(eventID, options) {
        switch(eventID) {
            case e_eventIDs.defeat:
                if (options == this.hero) { console.log('YOU LOST')}
                if (options == this.knight) { 
                    this.complete = true
                    console.log('YOU WON')
                }
                this.combat.end()
                this.speech2(this.complete)
                break;

        }
    }

    transition() {
        console.log('pointerdown')
        this.manager.loadMenu(e_menues.introScreen)
    }

}