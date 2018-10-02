

let e_eventIDs =  {
    defeat: 0,
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
        this.sounds = {}
        let volume = SETTINGS.sound.volume
        this.music = new Howl({ src: ['assets/sounds/visions.mp3'],
            loop: true,
            volume: volume*0.5,
        })
        this.ambientSound = new Howl({src: 'assets/sounds/nightBreeze.mp3',loop:true, volume: volume*0.2})


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





    start() { this.progress() }



    end() {
        
        this.complete = true
        this.music.stop()
        this.ambientSound.stop()
        this.onExit()
    }




    setup(callback) {

        this.bg.setup()
        this.interface.setup()
        

        this.knight.setPosition(0.7*WIDTH,0.8*HEIGHT,e_zIndex.character)
        this.knight.setup() // creates sprite and adds
        // this.knight.scaleSprite(this.knight.sprite.height/HEIGHT)
        this.knight.fixHeight(HEIGHT*0.48)
        this.animations.breathing(this.knight.sprite)
        


        
        this.hero.setup()
        // this.hero.scaleSprite(this.hero.sprite.height/HEIGHT)
        this.hero.fixHeight(HEIGHT*0.7)
        this.hero.setPosition(0.25*WIDTH,HEIGHT*1.0, e_zIndex.hero)
        this.animations.breathing(this.hero.sprite)


        this.combat.addEnemy(this.knight)
        this.combat.addHero(this.hero)

        // this.weather(e_weather.rain2, e_zIndex.character - 0.1)
        // this.weather(e_weather.rain, e_zIndex.hero + 0.1)


        //this.music.play()
        this.ambientSound.play()
        super.setup(callback)
    }





    


    progress() {
        switch(this.phase) {
            case 0:
                this.introAnimation()
                break;

            case 1:
                this.speech1()
                break;

            case 2:
                this.startCombat()
                break;

            case 2.5: // lost
                this.speech2(false)
                break;

            case 3: // won
                this.speech2(true)
                break;

            case 4:
                this.restartLevel()
                break;
        }
    }




    // Progression

    introAnimation() {
        this.interface.hide()
        this.knight.hideHealthbar()
        let callback = ()=>{ this.phase = 1; this.progress()}
        this.scene.position.x = -WIDTH*1.5
        this.animations.move(this.scene ,{time:6, x: WIDTH*0.0, y: 0, callback: callback})
    }


    startCombat() {
        this.combat.start(); 
        this.scene.interactive = false 
        this.interface.show()
        this.dialog.hide()
        //this.phase = 2
    }


    speech1() {
        this.interface.hide()
        this.knight.hideHealthbar()
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = 'Who Dares Enter\nThese Woods?'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        this.scene.interactive = true
        this.phase += 1
        this.scene.on('pointerdown',this.progress.bind(this))
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
        this.scene.interactive = true
        this.phase += 1
        this.scene.on('pointerdown',this.progress.bind(this))
    }



    event(eventID, options) {
        switch(eventID) {
            case e_eventIDs.defeat:

                if (options == this.hero) { 
                    console.log('YOU LOST') 
                    this.combat.end()
                    this.phase += 0.5
                    this.progress()
                }
                if (options == this.knight) { 
                    console.log('YOU WON')
                    this.combat.end()
                    this.phase += 1
                    this.progress()
                }
                break;

        }
    }


    menu() { this.manager.loadMenu(e_menues.hero) }

}
