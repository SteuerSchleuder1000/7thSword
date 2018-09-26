
class Healthbar_Hero extends Scene {
    constructor(manager,superScene,sprite) {
        super(manager,superScene)
        this.scene.visible = true
        this.scene.position.z = 3
        this.sprite = sprite
        this.addSprite(sprite)
        this.originalWidth = sprite.width
    }

    updateHealth(health) { this.sprite.width = health/100*this.originalWidth }
}




class Healthbar_Enemy { // added onto sprite
    constructor(manager,sprite) {
        this.sprite = sprite
        


        let width = WIDTH*0.15
        let height = HEIGHT*0.025

        this.originalWidth = width

        this.healthbar = new Graphics()
        this.healthbar.lineStyle(4, 0xFFFFFF, 1);
        this.healthbar.beginFill(0xFFFFFF);
        this.healthbar.drawRect(-0.5*width, 0, width, height)

        this.sprite.addChild(this.healthbar)
    }

    updateHealth(health) { 
        this.healthbar.width = health/100*this.originalWidth
        this.healthbar.position.x = health/100*this.originalWidth/2
    }
}