




// INterface sets up icon at the right place
class Interface extends Scene {
    constructor(manager, superScene, hero) {
        super(manager,superScene)
        this.scene.position.z = e_zIndex.interface
        this.scene.visible = true


        this.assets = []
        this.buttons = []


        // load hero abilities
        this.hero = hero
        this.heroAbilities = this.hero.abilities
        for (let a of this.heroAbilities) { this.assets = this.assets.concat(a.assets) }

        this.healthbar = new Healthbar_Hero(this.hero, this.scene)
        this.hero.healthbar = this.healthbar
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



    




    // updateHealth() {
    //     this.healthbar.updateHealth(this.hero.stats.health)
    // }



    setup() {

        
        this.healthbar.setup()

        let btnWidth = 0.18*WIDTH
        let btnGap = 0.07*WIDTH


        for (let i=0; i<3;i++) {

            // use setup function here
            let ab = this.heroAbilities[i]

            let btnSprite = this.createSprite({
                name: 'btn'+i,
                url: ab.assets[0],
                width: btnWidth,
                x: 0.03*WIDTH,
                y: btnGap*1.5 + i*(btnWidth+btnGap),
                z: e_zIndex.interface,
                visible: true,
            })

            let btn = new AbilityButton(ab, this.scene, btnSprite, this.hero)
            this.buttons.push(btn)
        }


    } // setup




    block(e) { this.hero.block(e.type == 'pointerdown') }


    restartLevel() { this.manager.restartLevel() }


    buttonEvent(e) {
        let target = e.currentTarget.name
    }

    update(delta) { 
        // this.animations.update(delta)
        // for (let btn of this.buttons) {btn.update(delta)} // updated through the characters
        // this.healthbar.update(delta)
    }
}