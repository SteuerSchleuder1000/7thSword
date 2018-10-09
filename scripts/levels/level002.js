

let e_eventIDs =  {
    defeat: 0,
    dialog: 1,
}






class Level_002 extends Level {
    constructor(manager, superScene, args) {
        console.log('level 002',args)

        args = args || {}
        super(manager, superScene, args)
        this.scene.name = 'First Fight lv002'

        

        // standard
        this.combat = new Combat(this)
        this.dialog = new Dialog(this)

        this.hero = args.hero 
        this.interface = args.interface 
        

        // sounds        
        let volume = SETTINGS.sound.volume
        let path = 'assets/sounds/'
        this.sounds = {
            music:          new Howl({ src: path+'visions.mp3',loop: true, volume: volume*0.5,}),
            ambient:        new Howl({ src: path+'forest.ogg',loop: true, volume: volume*0.5,}),
        }
        
       


        // Background
        path = 'assets/images/backgrounds/'
        this.bg = new Background(this,{assets: [path+'forestbackground.png']})


        // characters
        let knight = new Enemy_Knight(this)
        this.characters = [knight]


       
        // this.progress = args.progress
        this.progress = {
            intro:      new Progress({ n: 1, entry: this.introAnimation,    next: 'dialog1'}),
            dialog1:    new Progress({ n: 1, entry: this.speech1,           next: 'combat'}),
            combat:     new Progress({ n: 3, entry: this.startCombat, exit: this.endCombat,       next: 'dialog2'}),
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

        this.bg.addToScene({scene: this.scene})
        this.interface.addToScene({scene:this.scene})
        this.dialog.addToScene({scene:this.scene})

        this.addBannerText('0/3 Knights Slain')
        
        

        let x = 0.7*WIDTH
        let y = 0.8*HEIGHT
        let knight = new Enemy_Knight(this)
        knight.addToScene({x:x, y:y, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        this.combat.addEnemy(knight)


        this.hero.addToScene({scene: this.scene, x: 0.25*WIDTH, y: 1.0*HEIGHT, z: e_zIndex.hero, height: 0.7*HEIGHT})
        this.combat.addHero(this.hero)

        // this.weather(e_weather.rain2, e_zIndex.character - 0.1)
        // this.weather(e_weather.rain, e_zIndex.hero + 0.1)


        //this.sounds.music.play()
        this.sounds.ambient.play()
        super.setup(callback)
    }



    // Progression

    introAnimation() { // general level method -> diverse selection

        let time = 3
        this.interface.hide()
        this.scene.position.x = -WIDTH*1.5
        let callback = ()=>{ this.progress.intro.add() }
        this.animations.move(this.scene ,{time: time, x: WIDTH*0.0, y: -0.2 * WIDTH, callback: callback})


        // forground -> do via this.bg.introAnimationRight({time: time})
        let tree = new PIXI.Sprite.fromImage('assets/images/backgrounds/tree.png')
        tree.height = HEIGHT
        tree.position.set(-WIDTH,0.1*HEIGHT)
        tree.position.z = e_zIndex.interface - 0.1
        this.addSprite(tree)
        let callback2 = ()=> { tree.visible = false }
        this.animations.move(tree, {time:time, x: WIDTH*2, y: 0, callback: callback2})
        this.zSort()
    }





    addEnemy() {
        let x = 0.7*WIDTH
        let y = 0.8*HEIGHT
        let knight = new Enemy_Knight(this)
        knight.addToScene({x:x, y:0, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        this.zSort()

        let callback = ()=>{
            this.combat.addEnemy(knight)
            this.shakeScreen()
        }

        this.animations.move(knight.sprite,{time: 1.0, y: y, callback: callback.bind(this)})
        
    }


    

    removeEnemy(enemy) {
        this.combat.removeEnemy(enemy)
        // death animation
        enemy.removeFromScene()

        let c = this.progress.combat.c + 1
        this.updateBannerText(c+'/3 Knights Defeated')
    }

    speech1() {

        this.startDialog()
        this.dialog.reset()
        this.dialog.addNode({text: 'Who Dares Enter\nThese Woods?', style: textStyles.normal, position: 0, id: 0, next: false})
        this.dialog.displayNode(0)

    }

   

    // displayLoot() {

    //     let lootBag = new Loot(this, this.scene)
    //     this.objects.push(lootBag)
    //     loot.fill('random', 5)


    // }


    speech2() {

        this.startDialog()

        let s = textStyles.normal
        this.dialog.reset()
        this.dialog.addNode({text: 'hello', style: s, position: 1, id: 0, next: 1})
        this.dialog.addNode({text: 'I said HELLO!', style: s, position: 1, id: 1, next: false})
        this.dialog.displayNode(0)
       
        // tree structure

        // this.dialog.display('I Will Have\nMy Revenge!', textStyles.normal)

    }



    event(eventID, trigger) {
        trigger = trigger || {}
        switch(eventID) {
            case e_eventIDs.defeat:

                if (trigger.name == 'Hero') { 
                    console.log('YOU LOST') 
                    this.combat.end()
                    this.restartLevel()
                }
                if (trigger.name == 'Knight') { 
                    console.log('YOU WON')
                    this.removeEnemy(trigger)
                    this.addEnemy()
                    this.progress.combat.add()

                    // DEATH ANIMATION
                    // let callback = ()=>{ this.progress.combat.add() }
                    // this.dialog.reset()
                    // this.dialog.addNode({text:'UUUURGGGH!!', style: textStyles.normal, id: 0, next: false})
                    // this.dialog.displayNode(0, callback.bind(this))

                    console.log('progress',this.progress.combat)
                    this.hero.save()
                    // this.quest.save()
                }
                break;

            case e_eventIDs.dialog:
                this.progress.current.add()
                break;

        }// switch
    } // event


    menu() { this.manager.loadMenu(e_menues.hero) }

}
