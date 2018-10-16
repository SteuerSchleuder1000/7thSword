

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
        // this.bg = new Background(this,{assets: [path+'forestbackground.png']})
        this.bg = new Background(this,{assets: [path+'highlands.jpg']})


        // characters
        let knight = new Enemy_Knight(this)
        this.characters = [knight]


       
        // this.progress = args.progress
        this.progress = {
            intro:      new Progress({ n: 1, entry: this.introAnimation,    next: 'dialog1'}),
            dialog1:    new Progress({ n: 1, entry: this.speech1,           next: 'combat'}),
            combat:     new Progress({ n: 100, entry: this.startCombat, exit: this.endCombat,       next: 'dialog2'}),
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
        this.interface.addToScene({scene:this.interfaceLayer})
        this.dialog.addToScene({scene:this.scene})

        this.addBannerText('')
        
        

        let x = 0.75*WIDTH
        let y = 0.8*HEIGHT
        let knight = new Enemy_Knight(this)
        knight.addToScene({x:x, y:y, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        this.combat.addEnemy(knight)
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

    speech1() {

        this.startDialog()
        this.dialog.reset()
        let s = textStyles.normal
        this.dialog.addNode({text: 'I have found you!\nNo more running', style: s, position: 1, id: 0, next: 1})
        this.dialog.addNode({text: 'Hand over the blade\nand I might let you live', style: s, position: 1, id: 1, next: 2})
        this.dialog.addNode({text: "The stars are aligning\nThe kings return destiny\nforetold centuries ago", style: s, position: 2, id: 2, next: 3})
        this.dialog.addNode({text: "You pathetic mortal will not\nbe able to change anything!", style: s, position: 2, id: 3, next: 4})
        this.dialog.addNode({text: 'You leave me no choice', style: s, position: 1, id: 4, next: false})
        this.dialog.displayNode(0)

    }

    speech2() {

        this.startDialog()
        this.dialog.reset()
        let s = textStyles.normal
        this.dialog.addNode({text: "Sacrileg!\nI WILL BURN YOU TO ASHES!", style: s, position: 2, id: 0, next: false})
        this.dialog.displayNode(0)

    }

    startCombat() {
        super.startCombat()
        let n = this.progress.combat.n
        let c = this.progress.combat.c
        this.updateBannerText(c+'/'+n+' Knights defeated')
    }





    addEnemy() {
        let x = 0.5*WIDTH // 0.7
        let y = 0.8*HEIGHT
        let lv = this.progress.combat.c
        let knight = new Enemy_Knight(this,{level:lv})
        // knight.addToScene({x:x, y:0, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        knight.addToScene({x:x, y:y, z:e_zIndex.character, height: 0.48*HEIGHT, scene: this.scene})
        this.zSort()

        let callback = ()=>{
            this.combat.addEnemy(knight)
            this.shakeScreen()
        }
        callback()
        // this.animations.move(knight.sprite,{time: 1.0, y: y, callback: callback.bind(this)})
        
    }


    

    removeEnemy(enemy) {
        this.combat.removeEnemy(enemy)
        // death animation
        enemy.removeFromScene()

        let c = this.progress.combat.c
        let n = this.progress.combat.n
        this.updateBannerText(c+'/'+n+' Knights Defeated')
    }

    

   



    // TODO: streamline!!!
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
                    this.progress.combat.add()
                    this.hero.gainExp(30)
                    this.removeEnemy(trigger)
                    this.addEnemy()                   

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
