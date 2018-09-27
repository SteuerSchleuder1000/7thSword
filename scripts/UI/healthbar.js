
class Healthbar_Hero extends Scene {
    constructor(manager,superScene,sprite) {
        super(manager,superScene)
        this.scene.visible = true
        this.scene.position.z = 3
        this.sprite = sprite
        this.addSprite(sprite)
        this.originalWidth = sprite.width
    }

    updateHealth(health) { 
        this.sprite.width = health/100*this.originalWidth
        // this.manager.animations.shake(this.sprite, {time:0.5, magnitude: 5})
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

    updateHealth(health) { 
        let originalHealth = this.manager.stats.health_init
        this.healthbar.width = health/originalHealth*this.originalWidth
    }
}