



class UI_Bar {
    constructor() {

    }
}

class AbilityButton extends Scene {
    constructor(ability, interfaceScene, sprite) {
        super(ability, interfaceScene) // manager = heroAbility
        this.ability = ability
        this.scene.visible = true
        this.sprite = sprite
        this.addSprite(sprite)
        this.sprite.interactive = true
        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )
    }

    run() {}
    cast() {}
    recover() {}
    update() { 
        // update castBar
    }
    flash() {}
    buttonEvent(e) {
        this.ability.run()
        console.log('button event',e)
    }
}




// INterface sets up icon at the right place

class Interface extends Scene {
    constructor(manager, superScene, hero) {
        super(manager,superScene)
        this.scene.position.z = 3
        this.scene.visible = true

        this.assets = [
            'assets/choice.png',
            'assets/emberblade.png',
            'assets/swipe.png',
            'assets/combo.png',
            'assets/healthbar.png',
        ]

        this.hero = hero
        this.heroAbilities = this.hero.abilities
        for (let a of this.heroAbilities) {
            this.assets = this.assets.concat(a.assets)
        }

        this.buttons = []

    }



    updateHealth() {}

    setup() {

        this.healthbar = this.createSprite({
            name: 'healthbar',
            url: 'assets/healthbar.png',
            width: 0.8*WIDTH,
            anchor: (0, 0.5),
            x: 0.1*WIDTH,
            y: 0.95*HEIGHT,
            z: 3,
            addToScene: true,
        })

        let btnWidth = 0.25*WIDTH
        let btnGap = 0.04*WIDTH


        for (let i=0; i<3;i++) {
            let ab = this.heroAbilities[i]

            let btnSprite = this.createSprite({
                name: 'btn'+i,
                url: ab.assets[0],
                width: 0.15*WIDTH,
                x: 0.05*WIDTH,
                y: btnGap*1.5 + i*(btnWidth+btnGap),
                z: 3,
                visible: true,
            })

            let btn = new AbilityButton(ab, this.scene, btnSprite)
            this.buttons.push(btn)
        }

    }

    buttonEvent(e) {
        let target = e.currentTarget.name
        console.log('interface button event:',e)
    }

    update(delta) { 

    }
}