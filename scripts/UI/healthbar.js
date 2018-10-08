

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

        let path = 'assets/images/UI/'
        this.assets = [
            path+'healthbar.png',
            path+'combo.png',
        ]

        this.scene.visible = true
        this.scene.position.z = 3
        this.animations = new Animations()
           
    }


    setup() {

        let hbWidth = 0.8*WIDTH
        let path = 'assets/images/UI/'
        this.sprite = this.createSprite({
            name: 'healthbar',
            url: path + 'healthbar.png',
            width: hbWidth,
            anchor: (0, 0.5),
            x: 0.1*WIDTH,
            y: 0.95*HEIGHT,//0.95*HEIGHT,
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
                url: path+'combo.png',
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

    updateHealth(d) { 
        let health_init = this.manager.stats.health_init
        let health = this.manager.stats.health
        this.sprite.width = health/health_init*this.originalWidth

        let magnitude =  Math.abs(d/health_init)*20
        if (d < 0) { this.damageAnimation(magnitude)}
        if (d > 0) { this.healAnimation(magnitude) }
    }
    

    damageAnimation(magnitude) { 
        this.animations.shake(this.sprite, {time: 0.5, magnitude: magnitude})
    }

    healAnimation(magnitude) {
        
    }

    updateCombo() { // animate new ones

        
        let diff = this.manager.stats.combo - this.comboPoints
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
        
    } // update Combo

} // hero healthbar




class Healthbar_Enemy { // added onto sprite
    constructor(manager,superScene,x,y) {
        this.superScene = superScene
        this.manager = manager

        this.x = x | 0 //-0.01*WIDTH
        this.y = y | 0

        let width = WIDTH*0.15
        let height = HEIGHT*0.02

        this.originalWidth = width

        this.healthbar = new Graphics()
        this.healthbar.beginFill(0xFFFFFF);
        this.healthbar.drawRect(0, 0, width, height)
        this.healthbar.position.set(this.x,this.y)

        this.superScene.addChild(this.healthbar)

        this.castbar = new Graphics()
        this.superScene.addChild(this.castbar)
    }

    updateCastbar() {
        
        let ability = this.manager.castingAbility
        if (!ability) { return }
        if (ability.state == e_abStates.performing) { this.castbar.clear(); return}
        if (ability.state != e_abStates.casting) { return }


        let progress = 1 - ability.t / ability.t_cast
        let height = HEIGHT*0.01
        
        this.castbar.clear()
        this.castbar.beginFill(0xFFFFFF);
        this.castbar.drawRect(this.x, this.y+height*3, progress*this.originalWidth, height)
        
    }

    show() { this.healthbar.visible = true; this.castbar.visible = true }
    hide() { this.healthbar.visible = false; this.castbar.visible = false }
    update(delta) { this.updateCastbar() }
    updateCombo() {} // dont

    updateHealth() { 
        let health = this.manager.stats.health
        let health_init = this.manager.stats.health_init
        this.healthbar.width = health/health_init*this.originalWidth
    }
}