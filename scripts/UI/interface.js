




// INterface sets up icon at the right place
class Interface extends Scene {
    constructor(manager, superScene, hero) {
        super(manager,superScene)
        this.scene.position.z = 3
        this.scene.visible = true

        this.animations = new Animations()

        this.assets = [
            'assets/choice.png',
            'assets/emberblade.png',
            'assets/swipe.png',
            'assets/Combo.png',
            'assets/healthbar.png',
        ]

        this.hero = hero
        this.heroAbilities = this.hero.abilities
        for (let a of this.heroAbilities) {
            this.assets = this.assets.concat(a.assets)
        }

        this.buttons = []

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

    block(e) {
        let isDown = e.type == 'pointerdown'
        this.hero.block(isDown)
    }

    restartLevel() { this.manager.restartLevel() }

    updateHealth() {
        this.healthbar.updateHealth(this.hero.stats.health)
    }

    setup() {

        let hbSprite = this.createSprite({
            name: 'healthbar',
            url: 'assets/healthbar.png',
            width: 0.8*WIDTH,
            anchor: (0, 0.5),
            x: 0.1*WIDTH,
            y: 0.95*HEIGHT,
            z: 3,
        })

        this.hero.healthbar = new Healthbar_Hero(this, this.scene, hbSprite)

        let btnWidth = 0.2*WIDTH
        let btnGap = 0.07*WIDTH


        for (let i=0; i<3;i++) {
            let ab = this.heroAbilities[i]

            let btnSprite = this.createSprite({
                name: 'btn'+i,
                url: ab.assets[0],
                width: btnWidth,
                x: 0.03*WIDTH,
                y: btnGap*0.9 + i*(btnWidth+btnGap),
                z: 3,
                visible: true,
            })

            let btn = new AbilityButton(ab, this.scene, btnSprite, this.hero)
            this.buttons.push(btn)
        }


    }

    buttonEvent(e) {
        let target = e.currentTarget.name
        console.log('interface button event:',e)
    }

    update(delta) { 
        this.animations.update(delta)
        for (let btn of this.buttons) {btn.update(delta)}
    }
}