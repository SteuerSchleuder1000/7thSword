

e_eventIDs =  {
    defeat: 0,
}


class Level_002 extends Level {
    constructor(manager, superScene) {
        console.log('level 002 with bad restarts!!!!!!!!!')
        super(manager, superScene)
        currentLevel = this
        this.scene.name = 'First Fight lv002'
        this.complete = false

        // standard
        this.combat = new Combat(this)
        this.animations = new Animations()
        


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
        if (this.complete) {return}
        this.combat.update(delta)
        
        this.interface.update(delta)
    }

    start() {
        this.combat.addEnemy(this.knight)
        this.combat.addHero(this.hero)
        this.combat.start()
    }

    restartLevel() {
        console.log('wtf gives???')
        this.manager.transition(e_levels.lv_003)
        this.end()
        //this.manager.state.remove(e_levels.lv_002)

        
        //this.manager.loadMenu(e_menues.introScreen)
    }

    end() {
        this.scene.visible = false
        this.complete = true
        super.onExit()
    }

    setup(callback) {

        this.createBackground('assets/forestbackground.png')
        

        
        this.knight.setPosition(0.75*WIDTH,0.75*HEIGHT,1)
        this.knight.setup() // creates sprite and adds
        this.knight.fixHeight(HEIGHT*0.4)
        this.animations.breathing(this.knight.sprite)
        


        this.hero.setPosition(0,HEIGHT,2)
        this.hero.setup()
        this.hero.fixHeight(HEIGHT*0.5)
        this.animations.breathing(this.hero.sprite)



        this.interface.setup()


        this.zSort()
        super.setup(callback)
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
                break;

        }
    }

    transition() {
        console.log('pointerdown')
        this.manager.loadMenu(e_menues.introScreen)
    }

}
