




// INterface sets up icon at the right place
class Interface extends Scene {
    constructor(manager, hero) {
        super(manager)
        this.scene.position.z = e_zIndex.interface
        this.scene.visible = true


        this.assets = []
        this.buttons = []

        this.hero = hero
        this.heroAbilities = this.hero.abilities
        for (let a of this.heroAbilities) { this.assets = this.assets.concat(a.assets) }

        this.healthbar = new Healthbar_Hero(this.hero, this.scene)
        this.hero.healthbar = this.healthbar
        this.hero.interface = this
        this.assets = this.assets.concat(this.healthbar.assets)





        
        // CRUDE UI BUTTONS -> make more elegant!!!!
        let btnWidth = 0.2*WIDTH
        this.menuBtn = new Graphics()
        this.menuBtn.beginFill(0xFFFFFF);
        this.menuBtn.drawRect(WIDTH - btnWidth, HEIGHT - btnWidth, btnWidth, btnWidth)
        this.menuBtn.alpha = 0.5
        this.menuBtn.position.z = 3
        this.menuBtn.interactive = true
        this.menuBtn.on('pointerdown',this.restartLevel.bind(this))
        this.addSprite(this.menuBtn)


        this.blockBtn = new Graphics()
        this.blockBtn.beginFill(0xFFFFFF)
        this.blockBtn.drawRect(0,HEIGHT*0.5,WIDTH*0.5,HEIGHT)
        this.blockBtn.alpha = 0
        this.blockBtn.name = 'blockBtn'
        this.blockBtn.position.z = 10
        this.blockBtn.interactive = true
        this.blockBtn.on('pointerdown', this.block.bind(this))
        this.blockBtn.on('pointerup', this.block.bind(this))
        this.addSprite(this.blockBtn)
    }



    


    addToScene(args) {

        this.superScene =  args.scene
        this.superScene.addChild(this.scene)

        this.healthbar.setup()

        let btnWidth = 0.18*WIDTH
        let btnGap = 0.07*WIDTH

        let key = keyboard(32) // space bar
        key.press = this.block.bind(this)
        key.release = this.block.bind(this)

        let key2 = keyboard(27) // esc button
        key2.press = this.restartLevel.bind(this)

        for (let i=0; i<4;i++) {

            // use setup function here
            let ab = this.heroAbilities[i]

            let btnSprite = this.createSprite({
                name: 'btn'+i,
                url: ab.assets[0],
                width: btnWidth,
                x: btnGap*0.5 + i*(btnWidth+btnGap), //0.03*WIDTH,
                y: HEIGHT, //- btnWidth - 0.5*btnGap ,//btnGap*1.5 + i*(btnWidth+btnGap),
                z: e_zIndex.interface,
                visible: true,
            })

            let btn = new AbilityButton(ab, this.scene, btnSprite, this.hero)
            this.buttons.push(btn)

            // keyboard input
            let key = keyboard(49+i) // start from "1"
            key.press = btn.buttonEvent.bind(btn)
        }


    } // setup




    block(e) { this.hero.block(e.type == 'pointerdown' || e.type == 'keydown') }


    restartLevel() { this.manager.restartLevel() }

    greyOut(b) { for (let btn of this.buttons) { btn.sprite.alpha = b ? 0.5 : 1 } }
    

    update(delta) { 
        // this.animations.update(delta)
    }
}