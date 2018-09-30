

let e_eventIDs =  {
    defeat: 0,
}



let e_weather = {
    rain: 0,
    rain2: 1,
    flame: 2,


    properties: {
        0: { options: emitterOptions_rain, textures: ['assets/raindrop.png']},
        1: { options: emitterOptions_rain2, textures: ['assets/raindrop.png']},
        2: { options: emitterOptions_flame, textures: ['assets/flame.png','assets/solidCircle.png']}
    },
}





class Level_002 extends Level {
    constructor(manager, superScene) {
        console.log('level 002')
        super(manager, superScene)
        this.scene.name = 'First Fight lv002'
        



        // standard
        this.combat = new Combat(this)
        this.dialog = new Dialog()
        this.animations = new Animations()
        this.hero = this.manager.loadHero(this)
        this.interface = new Interface(this, this.scene, this.hero)
        


        // sounds        
        this.music = new Howl({ src: ['assets/sounds/visions.mp3'],
            loop: true,
            volume: 0.5,
        })

        this.ambientSound = new Howl({src: 'assets/sounds/forest.wav',loop:true, volume: 0.5})



        // Background
        this.bg = new Background(this,this.scene,'assets/forestbackground.png')


        // characters
        this.knight = new Enemy_Knight(this, this.scene, this.combat)

        this.characters = [this.knight]





        
        // Special assets: only for special effects etc.! the rest init via this.concatAssets()
        this.assets = [
            'assets/raindrop.png',
        ]


    }






    update(delta) { // 
        super.update(delta) // takes care of this.animations, emitters
        
        if (this.complete) {return}
        this.combat.update(delta)
        
        this.interface.update(delta)
    }





    start() {
        this.combat.addEnemy(this.knight)
        this.combat.addHero(this.hero)
        this.speech1() // first lets talk!
        //this.combat.start()
        // progression tree
    }

    restartLevel() {
        this.manager.transition(e_levels.lv_003)

        this.end()
        //this.manager.state.remove(e_levels.lv_002)

        
        //this.manager.loadMenu(e_menues.introScreen)
    }


    end() {
        this.scene.visible = false
        this.complete = true
        this.music.stop()
        this.ambientSound.stop()
        super.onExit()
    }




    setup(callback) {

        this.bg.setup()
        this.interface.setup()
        

        this.knight.setPosition(0.3*WIDTH,0.25*HEIGHT,1)
        this.knight.setup() // creates sprite and adds
        // this.knight.scaleSprite(this.knight.sprite.height/HEIGHT)
        this.knight.fixHeight(HEIGHT)
        //this.animations.breathing(this.knight.sprite)
        


        
        this.hero.setup()
        // this.hero.scaleSprite(this.hero.sprite.height/HEIGHT)
        this.hero.fixHeight(HEIGHT*0.7)
        this.hero.setPosition(0.25*WIDTH,HEIGHT*1.0, e_zIndex.hero)
        this.animations.breathing(this.hero.sprite)




        // this.weather(e_weather.rain2, e_zIndex.character - 0.1)
        // this.weather(e_weather.rain, e_zIndex.hero + 0.1)





        //this.music.play()
        this.ambientSound.play()
        super.setup(callback)
    }





    weather(type, zIndex) {

        let layer = new Container()
        layer.position.z = zIndex
        this.addSprite(layer)

        let options = e_weather.properties[type].options
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


    speech1() {
        this.interface.hide()
        this.knight.hideHealthbar()
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = 'Who Dares Enter\nThese Woods?'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        let callback = ()=>{ 
            this.combat.start(); 
            this.scene.interactive = false 
            this.interface.show()
            this.dialog.hide()
        }
        this.scene.interactive = true
        this.scene.on('pointerdown',callback.bind(this))
    }

    speech2(won) {
        this.interface.hide()
        this.hero.idle()
        this.knight.idle()
        this.knight.hideHealthbar()
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = won ? 'I Will Have\nMy Revenge!' : 'Justice Has\nBeen Served!'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        let callback = ()=>{ 
            this.restartLevel()
        }
        this.scene.interactive = true
        this.scene.on('pointerdown',callback.bind(this))
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
