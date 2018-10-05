

let e_eventIDs =  {
    defeat: 0,
}


/*
    QUestions:
        - How to update chars?
        - What to pause, exit, disable combat
        - remove enmey

*/










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
        let volume = SETTINGS.sound.volume
        let path = 'assets/sounds/'
        this.sounds = {
            music:          new Howl({ src: path+'visions.mp3',loop: true, volume: volume*0.5,}),
            ambient:        new Howl({ src: path+'forest.ogg',loop: true, volume: volume*0.5,}),
        }
        
       


        // Background
        this.bg = new Background(this,this.scene,'assets/forestbackground.png')


        // characters
        let knight = new Enemy_Knight(this)//, this.scene, this.combat)
        this.characters = [knight]


        // Special assets: only for special effects etc.! the rest init via this.concatAssets()
        this.assets = [
            'assets/raindrop.png',
        ]

        this.progress = {
            intro:      new Progress({ n: 1, entry: this.introAnimation,    next: 'dialog1'}),
            dialog1:    new Progress({ n: 1, entry: this.speech1,           next: 'combat'}),
            combat:     new Progress({ n: 3, entry: this.startCombat, exit: this.combat.end,       next: 'dialog2'}),
            dialog2:    new Progress({ n: 1, entry: this.speech2,           next: 'restart'}),
            restart:    new Progress({ n: 0, entry: this.restartLevel                       }),

            current:    new Progress({ n: 1, next: 'intro'}),
            next:       ()=>{ this.progress.current = this.progress[this.progress.current.keyNext] },
        }
        

    }




    update(delta) { // 
        super.update(delta) // takes care of this.animations, emitters
        if (!this.loaded || !this.shouldUpdate) {return} // scene has not loaded yet
        
        this.combat.update(delta)
        this.interface.update(delta)

        // progress -> level.js method?
        if (this.progress.current.eval()) {         // checks if progress add is reached
            this.progress.current.exit.call(this)   // exits current progress add
            this.progress.next()                    // sets this.porgress.current to the next add
            if (!this.progress.current) { console.log('no current'); return}
            this.progress.current.entry.call(this)  // enters the current progress add
        }
    }





    start() { this.progress.current.add() }


    end() {
        
        this.shouldUpdate = false
        // this.music.stop()
        // this.ambientSound.stop()
        this.onExit()
    }




    setup(callback) {

        this.bg.setup()
        this.interface.setup()
        
        

        this.addEnemy()
        
        this.hero.addToScene({scene: this.scene, x: 0.25*WIDTH, y: 1.0*HEIGHT, z: e_zIndex.hero, height: 0.7*HEIGHT})
        
        this.combat.addHero(this.hero)

        // this.weather(e_weather.rain2, e_zIndex.character - 0.1)
        // this.weather(e_weather.rain, e_zIndex.hero + 0.1)


        //this.sounds.music.play()
        this.sounds.ambient.play()
        super.setup(callback)
    }





    // Progression

    introAnimation() {
        this.interface.hide()
        //this.knight.hideHealthbar()
        this.scene.position.x = -WIDTH*1.5
        let callback = ()=>{ this.progress.intro.add() }
        this.animations.move(this.scene ,{time:3, x: WIDTH*0.0, y: 0, callback: callback})
    }


    startCombat() {
        this.combat.start(); 
        this.interface.show()
        this.dialog.hide()
    }


    addEnemy() {
        let x = 0.7*WIDTH
        let y = 0.8*HEIGHT
        let knight = new Enemy_Knight(this)//, this.scene, this.combat)
        knight.addToScene({x:x, y:y, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        // knight.setup()
        // knight.fixHeight(HEIGHT*0.48)
        this.combat.addEnemy(knight)
    }


    speech1() {
        this.interface.hide()
        //this.knight.hideHealthbar()
        // wait 1 sec
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = 'Who Dares Enter\nThese Woods?'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        this.scene.interactive = true
        let callback = ()=>{ 
            this.progress.dialog1.add()
            this.scene.interactive = false 
        }
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
        //this.knight.idle()
        //this.knight.hideHealthbar()
        let style = {fontFamily : 'Garamond', fontSize: 24, align : 'center'}
        let text = won ? 'I Will Have\nMy Revenge!' : 'Justice Has\nBeen Served!'
        let sb = this.dialog.speechBubble(text,style)
        this.addSprite(sb)
        this.scene.interactive = true
        let callback = ()=>{ 
            this.progress.dialog1.add()
            this.scene.interactive = false 
        }
        this.scene.on('pointerdown',callback.bind(this))
    }



    event(eventID, options) {
        options = options || {}
        switch(eventID) {
            case e_eventIDs.defeat:

                if (options.name == 'Hero') { 
                    console.log('YOU LOST') 
                    this.combat.end()
                    this.restartLevel()
                }
                if (options.name == 'Knight') { 
                    console.log('YOU WON')
                    options.removeFromScene()
                    this.combat.removeEnemy(options)
                    this.addEnemy()
                    this.progress.combat.add()
                    console.log('progress',this.progress.combat)
                    this.hero.save()
                    // this.quest.save()
                }
                break;

        }
    }


    menu() { this.manager.loadMenu(e_menues.hero) }

}
