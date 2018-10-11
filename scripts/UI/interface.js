




// INterface sets up icon at the right place
class Interface extends Scene {
    constructor(manager, hero) {
        super(manager)
        this.scene.position.z = e_zIndex.interface
        this.scene.visible = true
        this.spritesLoaded = false

        this.assets = []
        this.buttons = []

        this.hero = hero
        this.heroAbilities = this.hero.abilities
        for (let a of this.heroAbilities) { this.assets = this.assets.concat(a.assets) }

        this.healthbar = new Healthbar_Hero(this.hero)//, this.scene)
        this.hero.healthbar = this.healthbar
        this.hero.interface = this
        this.assets = this.assets.concat(this.healthbar.assets)



        this.blockBtn = this.createButton({x:0,y:HEIGHT*0.4,z:10,width:0.5*WIDTH,height:0.45*HEIGHT})
        this.blockBtn.alpha = 0
        this.blockBtn.on('pointerdown', this.block.bind(this))
        this.blockBtn.on('pointerup', this.block.bind(this))

        let btnWidth = SETTINGS.ui.btnWidth*0.9
        this.menuBtn = this.createButton({x:0, y:0, z:10, width:btnWidth, height:btnWidth })
        this.menuBtn.alpha = 0.8
        this.menuBtn.on('pointerdown', this.heroMenu.bind(this))
    }



    


    addToScene(args) {

        this.superScene =  args.scene
        this.superScene.addChild(this.scene)

        if(this.spritesLoaded) { return }
        this.spritesLoaded = true


        let btnWidth = 0.18*WIDTH
        let btnGap = 0.07*WIDTH

        let key = keyboard(32) // space bar
        key.press = this.block.bind(this)
        key.release = this.block.bind(this)

        let key2 = keyboard(27) // esc button
        key2.press = this.heroMenu.bind(this) //this.restartLevel.bind(this)

        for (let i=0; i<4;i++) {

            // use setup function here
            let ab = this.heroAbilities[i]

            let btnSprite = this.createSprite({
                name: 'btn'+i,
                url: ab.assets[0],
                width: btnWidth,
                x: btnGap*0.5 + i*(btnWidth+btnGap), //0.03*WIDTH,
                y: HEIGHT - btnWidth*1.1, //- btnWidth - 0.5*btnGap ,//btnGap*1.5 + i*(btnWidth+btnGap),
                z: e_zIndex.interface,
                visible: true,
            })
            let btn = new AbilityButton(ab, this.scene, btnSprite, this.hero)
            this.buttons.push(btn)

            // keyboard input
            let key = keyboard(49+i) // start from "1"
            key.press = btn.buttonEvent.bind(btn)
        }

        this.healthbar.addToScene({x:0.1*WIDTH, y:HEIGHT - btnWidth*1.5, scene: this.scene })

    } // setup




    block(e) { this.hero.block(e.type == 'pointerdown' || e.type == 'keydown') }

    heroMenu() { this.manager.transition(e_stages.hero) }
    restartLevel() { this.manager.restartLevel() }

    greyOut(b) { for (let btn of this.buttons) { btn.sprite.alpha = b ? 0.5 : 1 } }
    

    update(delta) { 
        // this.animations.update(delta)
    }
}