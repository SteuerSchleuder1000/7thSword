

let e_eventIDs =  {
    defeat: 0,
}

let e_zIndex = {

    bg: 0,
    character: 1,
    hero: 2,
    interface: 3,

}




class Level_002 extends Level {
    constructor(manager, superScene) {
        console.log('level 002')
        super(manager, superScene)
        this.scene.name = 'First Fight lv002'
        this.complete = false

        // standard
        this.combat = new Combat(this)
        this.dialog = new Dialog()
        this.animations = new Animations()
        
        this.emitter = null
        this.sound = new Howl({ src: ['assets/sounds/visions.mp3'],
            loop: true,
            volume: 0.5,
        })

        // characters
        this.knight = new Enemy_Knight(this, this.scene, this.combat)
        this.hero = this.manager.loadHero(this)

        this.characters = [this.knight]

        this.interface = new Interface(this, this.scene, this.hero)

        this.assets = [
            'assets/forestbackground.png',
        ]

    }


    update(delta) {
        this.animations.update(delta)
        if (this.emitter) {this.emitter.update(delta)}
        if (this.complete) {return}
        this.combat.update(delta)
        
        this.interface.update(delta)
    }

    start() {
        this.combat.addEnemy(this.knight)
        this.combat.addHero(this.hero)
        this.speech1() // first lets talk!
        //this.combat.start()
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
        this.sound.stop()
        super.onExit()
    }

    setup(callback) {

        this.createBackground('assets/forestbackground.png')
        

        
        this.knight.setPosition(0.3*WIDTH,0.25*HEIGHT,1)
        this.knight.setup() // creates sprite and adds
        // this.knight.scaleSprite(this.knight.sprite.height/HEIGHT)
        this.knight.fixHeight(HEIGHT)
        //this.animations.breathing(this.knight.sprite)
        


        this.hero.setPosition(0,HEIGHT*1.05,2)
        this.hero.setup()
        // this.hero.scaleSprite(this.hero.sprite.height/HEIGHT)
        this.hero.fixHeight(HEIGHT)
        this.animations.breathing(this.hero.sprite)



        this.interface.setup()

        // this.emitter = new PIXI.particles.Emitter(

        //     this.scene, // container
        //     [PIXI.Texture.fromImage('assets/combo.png')], // images
          
        //     { // options
        //         alpha: {
        //             list: [
        //                 {
        //                     value: 0.8,
        //                     time: 0
        //                 },
        //                 {
        //                     value: 0.1,
        //                     time: 1
        //                 }
        //             ],
        //             isStepped: false
        //         },
        //         scale: {
        //             list: [
        //                 {
        //                     value: 1,
        //                     time: 0
        //                 },
        //                 {
        //                     value: 0.3,
        //                     time: 1
        //                 }
        //             ],
        //             isStepped: false
        //         },
        //         color: {
        //             list: [
        //                 {
        //                     value: "fb1010",
        //                     time: 0
        //                 },
        //                 {
        //                     value: "f5b830",
        //                     time: 1
        //                 }
        //             ],
        //             isStepped: false
        //         },
        //         speed: {
        //             list: [
        //                 {
        //                     value: 200,
        //                     time: 0
        //                 },
        //                 {
        //                     value: 100,
        //                     time: 1
        //                 }
        //             ],
        //             isStepped: false
        //         },
        //         startRotation: {
        //             min: 0,
        //             max: 360
        //         },
        //         rotationSpeed: {
        //             min: 0,
        //             max: 0
        //         },
        //         lifetime: {
        //             min: 0.1,
        //             max: 1
        //         },
        //         frequency: 0.008,
        //         spawnChance: 1,
        //         particlesPerWave: 1,
        //         emitterLifetime: 10,
        //         maxParticles: 1000,
        //         pos: {
        //             x: 0,
        //             y: 0
        //         },
        //         addAtBack: false,
        //         spawnType: "circle",
        //         spawnCircle: {
        //             x: WIDTH/2,
        //             y: HEIGHT/2,
        //             r: 10
        //         }
        //     }
        // );

        //this.sound.play()
        this.zSort()
        super.setup(callback)
    }

    speech1() {
        //this.interface.hide()
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
