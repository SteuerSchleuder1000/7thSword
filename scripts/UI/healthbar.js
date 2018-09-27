
class Healthbar_Hero extends Scene {
    constructor(manager,superScene) {
        super(manager,superScene)

        this.assets = [
            'assets/healthbar.png',
            'assets/combo.png',
        ]

        this.scene.visible = true
        this.scene.position.z = 3

        

           
    }


    setup() {

        this.sprite = this.createSprite({
            name: 'healthbar',
            url: 'assets/healthbar.png',
            width: 0.8*WIDTH,
            anchor: (0, 0.5),
            x: 0.1*WIDTH,
            y: 0.95*HEIGHT,
            z: 3,
            addToScene: true,
        })

        this.originalWidth = this.sprite.width



        // COMBOS
        let maxCombo = 5 //this.manager.stats.combo_max
        this.comboPoints = []
        let comboWidth = 0.05*WIDTH

        for (let i=0;i<maxCombo;i++){
            let comboSprite = new Sprite(this.assets[1].texture)

            comboSprite.position.x = 0.1*WIDTH + i*comboWidth*1.1
            comboSprite.position.y = 0.95*HEIGHT
            comboSprite.position.z = 3.1
            comboSprite.scale = 1
            this.addSprite(comboSprite)

            this.comboPoints.push(comboSprite)
        }
    }

    updateHealth(health) { 
        this.sprite.width = health/100*this.originalWidth
        // this.manager.animations.shake(this.sprite, {time:0.5, magnitude: 5})
    }

    updateCombo(combo) { // animate new ones
        for (let i=0;i<this.comboPoints.length;i++) {
            this.comboPoints[i].visible = i<=combo
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
    updateCombo() {}

    updateHealth(health) { 
        let originalHealth = this.manager.stats.health_init
        this.healthbar.width = health/originalHealth*this.originalWidth
    }
}