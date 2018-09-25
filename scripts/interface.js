

class AbilityButton {
    constructor() {}
}

class UI_Bar {
    constructor() {

    }
}



class Interface extends Scene {
    constructor(manager, superScene) {
        super(manager,superScene)
        this.scene.position.z = 3
        this.scene.visible = true
        this.hero = this.manager.hero

        // for ability in hero add ability.asset

        this.buttons = []

        this.assets = [
            'assets/choice.png',
            'assets/emberblade.png',
            'assets/swipe.png',
            'assets/combo.png',
            'assets/healthbar.png',
        ]

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

        let btnWidth = 0.15*WIDTH
        let btnGap = 0.04*WIDTH

        let buttonEvent = e=> { this.buttonEvent(e) }
        for (let i=0; i<3;i++) {
            let btn = this.createSprite({
                name: 'btn'+i,
                url: this.assets[i],
                width: 0.15*WIDTH,
                x: btnGap,
                y: btnGap + i*(btnWidth+btnGap),
                z: 3,
                addToScene: true
            })
            btn.interactive = true
            btn.on('pointerdown', buttonEvent.bind(this) )
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