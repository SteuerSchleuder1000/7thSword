

class Healthbar extends Scene {
    constructor(manager,superScene) {
        super(manager,superScene)
    }

    updateHealth(health) { 
        let originalHealth = this.manager.stats.health_init
        this.healthbar.width = health/originalHealth*this.originalWidth
    }
}




class Healthbar_Hero extends Healthbar {
    constructor(manager,superScene) {
        super(manager,superScene)

        this.assets = [
            'assets/healthbar.png',
            'assets/combo.png',
        ]

        this.scene.visible = true
        this.scene.position.z = 3
        this.animations = new Animations()
        

           
    }


    setup() {

        let hbWidth = 0.8*WIDTH

        this.sprite = this.createSprite({
            name: 'healthbar',
            url: 'assets/healthbar.png',
            width: hbWidth,
            anchor: (0, 0.5),
            x: 0.1*WIDTH,
            y: 0.95*HEIGHT,
            z: 3,
            addToScene: true,
        })

        this.originalWidth = this.sprite.width



        // COMBOS
        this.comboSprites = []
        this.comboPoints = 0

        let comboWidth = 0.08*WIDTH
        let maxCombo = this.manager.stats.combo_max
        
        let hbGap = comboWidth*0.5
        let hbW = (hbWidth -2*hbGap - comboWidth)/(maxCombo-1)

        for (let i=0;i<maxCombo;i++){
            
            let comboSprite = this.createSprite({
                url: 'assets/combo.png',
                width: comboWidth,
                anchor: [0, 0.25],
                x: 0.1*WIDTH + hbGap + hbW*i,
                y: 0.95*HEIGHT,
                z: 3,
                visible: false,
                addToScene: true,
            })

            this.comboSprites.push(comboSprite)
        }
    }

    update(delta) {this.animations.update(delta)}

    updateHealth(health) { this.sprite.width = health/100*this.originalWidth }


    updateCombo() { // animate new ones

        
        let diff = this.manager.stats.combo - this.comboPoints
        console.log('update combo healthbar',diff)
        if (diff == 0) { return } // nothing to do

        if (diff > 0) {
            for (let sprite of this.comboSprites) {
                if (sprite.visible) { continue }
                sprite.visible = true
                this.animations.shake(sprite, {time: 0.5, magnitude: 5})
                this.comboPoints += 1
                diff -= 1
                if (diff == 0) { break }
            }
        }

        if (diff < 0) {
            for (let sprite of this.comboSprites.slice().reverse()) {
                if (!sprite.visible) { continue }
                sprite.visible = false
                this.comboPoints -= 1
                diff += 1
                if (diff == 0) { break }
            }
        }
        
    }

}




class Healthbar_Enemy { // added onto sprite
    constructor(manager,superScene,x,y) {
        this.superScene = superScene
        this.manager = manager

        x = x | 0
        y = y | 0

        let width = WIDTH*0.15
        let height = HEIGHT*0.025

        this.originalWidth = width

        this.healthbar = new Graphics()
        this.healthbar.beginFill(0xFFFFFF);
        this.healthbar.drawRect(0, 0, width, height)
        this.healthbar.position.set(x,y)
        //this.healthbar.visible = false // default not visible

        this.superScene.addChild(this.healthbar)
    }

    show() { this.healthbar.visible = true }
    hide() { this.healthbar.visible = false }
    update() {}
    updateCombo() {} // dont

    updateHealth(health) { 
        let originalHealth = this.manager.stats.health_init
        this.healthbar.width = health/originalHealth*this.originalWidth
    }
}