


let e_combatStates = {
    idle: 0,
    casting: 1,
    recovering: 2,
    defeated: 3,
}



class Stats {

    constructor() {

        this.power_init = 10
        this.health_init = 100

        this.power = 10
        this.health = 100
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
    }


} // stats





class Character extends Scene {
    constructor(manager, superScene, combat) {
        super(manager, superScene)
        this.scene.visible = true
        this.scene.position.z = 1
        //this.scene.anchor.set(0.5,1) // set anchor down in the middle
        this.combat = combat


        this.name = ''
        this.state = e_combatStates.idle
        

        this.sprite = null
        this.stats = new Stats()
        this.assets = [] // images
        this.abilities = []
        this.buffs = []

        this.x = 0
        this.y = 0
        this.z = 0
        this.t = 0 // cast bar

        this.t_recovery = 0.5 // normal recovery time
        this.target = null // in combat
        this.castingAbility = null // what ability is he casting?

    }

    animate() {}

    setPosition(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
        if (this.sprite) {
            if (x != undefined) { this.sprite.position.x = x}
            if (y != undefined) { this.sprite.position.y = y}
            if (z != undefined) { this.scene.position.z = z}
        }
    }  
    

    update(delta) {
        if (this.state == e_combatStates.defeated) { return } // no updates for you!
        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }

    }

    recover() {
        this.state = e_combatStates.idle
        this.t
    }


    takeDamage(damage, ability, caster) {
        this.stats.health -= damage
        if (this.healthbar) { this.healthbar.updateHealth(this.stats.health) }
        if (this.stats.health <= 0) { this.defeat() }
    }

    reset() { 
        this.buffs = []
        this.stats.reset()
    }

    defeat() {

        this.manager.event(e_eventIDs.defeat,this)
        this.cancelAttack()
        this.state = e_combatStates.defeated

    }

    cancelAttack() {
        if (this.castingAbility) { this.castingAbility.cancel() }
    }

    setup() {
        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            anchor: [0.5, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })
    }

    fixHeight(height) {
        if (!this.sprite) {console.log('ERROR no sprite to fix height',this)}
        let scale = height/ this.sprite.height
        this.sprite.height *= scale
        this.sprite.width *= scale
    }

    fixWidth(width) {
        if (!this.sprite) {console.log('ERROR no sprite to fix width',this)}
        let scale = width/ this.sprite.width
        this.sprite.height *= scale
        this.sprite.width *= scale
    }
}

















