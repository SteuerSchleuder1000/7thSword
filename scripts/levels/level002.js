

let e_eventIDs =  {
    defeat: 0,
}






class Progress { // state for statemachine
    constructor(args) {
        this.c = 0              // counter
        this.n =        args.n  // number of steps
        this.p =        args.p  // progression tree
        this.entry =    args.entry 
        this.exit =     args.exit  
        this.keyNext =  args.next // next key

        if (!this.entry) {this.entry = ()=>{}}
        if (!this.exit)  {this.exit = ()=>{}}
    }

    step (c=1) { this.c += c } // progress
    eval () { return this.c >= this.n }
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

        this.progress = {
            intro:      new Progress({ n: 1, entry: this.introAnimation,    next: 'dialog1'}),
            dialog1:    new Progress({ n: 1, entry: this.speech1,           next: 'combat'}),
            combat:     new Progress({ n: 5, entry: this.startCombat, exit: this.combat.end,       next: 'dialog2'}),
            dialog2:    new Progress({ n: 1, entry: this.speech2,           next: 'restart'}),
            restart:    new Progress({ n: 1, entry: this.restartLevel                       }),

            current:    new Progress({ n: 1, next: 'intro'}),
            next:       ()=>{ this.progress.current = this.progress[this.progress.current.keyNext] },
        }
        

    }




    update(delta) { // 
        super.update(delta) // takes care of this.animations, emitters
        
        if (this.complete) {return}
        this.combat.update(delta)
        this.interface.update(delta)

        // progress -> level.js method?
        if (this.progress.current.eval()) {         // checks if progress step is reached
            this.progress.current.exit.call(this)   // exits current progress step
            this.progress.next()                    // sets this.porgress.current to the next step
            this.progress.current.entry.call(this)  // enters the current progress step
        }
    }





    start() { this.progress.current.step() }



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





    // Progression

    introAnimation() {
        this.interface.hide()
        this.knight.hideHealthbar()
        this.scene.position.x = -WIDTH*1.5
        let callback = ()=>{ this.progress.intro.step() }
        this.animations.move(this.scene ,{time:6, x: WIDTH*0.0, y: 0, callback: callback})
    }


    startCombat() {
        this.combat.start(); 
        this.scene.interactive = false 
        this.interface.show()
        this.dialog.hide()
    }


    speech1() {
        this.interface.hide()
        this.knight.hideHealthbar()
        // wait 1 sec
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = 'Who Dares Enter\nThese Woods?'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        this.scene.interactive = true
        let callback = ()=>{ this.progress.dialog1.step() }
        this.scene.on('pointerdown',callback.bind(this))
    }

    displayQuest() {
        /*
            Display pergament with objective
            text appears over time, quest slams onto paper
        */
    }

    displayLoot() {

        let lootBag = new Loot(this, this.scene)
        this.objects.push(lootBag)
        loot.fill('random', 5)


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
                    //this.phase += 0.5
                    //this.progress()
                }
                if (options == this.knight) { 
                    console.log('YOU WON')
                    //this.combat.end()
                    //this.phase += 1
                    //this.progress()
                    this.progress.combat.step()
                    this.knight.reset()
                }
                break;

        }
    }


    menu() { this.manager.loadMenu(e_menues.hero) }

}
