


let e_combatStates = {
    idle: 0,
    casting: 1,
    performing: 2, // performing attack/ animation
    recovering: 3,
    blocking: 4,
    defeated: 5,
}



class Stats {

    constructor() {

        this.power_init = 10
        this.health_init = 100000

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
        this.animations = new Animations()
        

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
        this.playerControlled = false

    }

   

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
        super.update(delta) // updates all abilites && buffs

        switch (this.state) {

            case e_combatStates.defeated:
                return
                break;

            case e_combatStates.idle: 
                if (!this.playerControlled) {this.decide()}
                break;

            case e_combatStates.casting:
                break;

            case e_combatStates.performing:
                this.t -= delta
                if (this.t <= 0) { this.recover() }
                break;

            case e_combatStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.idle() }
                break;

            case e_combatStates.blocking:
                break;

        }

        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }
        this.animations.update(delta)
    }

    decide() {}

    cast() {
        // check if valid order
        this.state = e_combatStates.casting
        this.t = 0
        this.animate(this.state)
    }

    perform(t = 0) {
        this.state = e_combatStates.performing
        this.t = t
        this.animate(this.state)
    }

    recover(t = this.t_recovery) {
        this.state = e_combatStates.recovering
        this.t = t
        this.animate(this.state)
    }

    idle() {
        this.state = e_combatStates.idle
        this.t = 0
        this.animate(this.state)
    }

    block(b) {
        this.state = e_combatStates.blocking
        this.t = 0
        this.animate(this.state)
    }

    defeat() {

        this.manager.event(e_eventIDs.defeat,this)
        this.state = e_combatStates.defeated
        this.t = 0
        this.animate(this.state)
    }




    animate(state) {
        let url, texture

        switch(state) {
            case e_combatStates.idle:
                url = this.assets[0]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.casting:
                url = this.assets[1]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.performing:
                url = this.assets[2]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.recovering:
                url = this.assets[0]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.blocking:
                url = this.assets[3]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.defeated:
                url = this.assets[0]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;
        }
    }






    takeDamage(damage, ability, caster) {
        if (this.state == e_combatStates.blocking) { damage *= 0.1 }
        this.stats.health -= damage
        if (this.healthbar) { this.healthbar.updateHealth(this.stats.health) }
        if (this.stats.health <= 0) { this.defeat() }
    }

    reset() { 
        this.buffs = []
        this.stats.reset()
    }

    

    cancelAttack() {
        if (this.castingAbility) { this.castingAbility.cancel() }
    }

    setup() {
        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            //anchor: [0.5, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })
    }

    scaleSprite(scale) {
        if (!this.sprite) {console.log('ERROR no sprite to scale',this); return}
        this.sprite.scale = scale
    }

    fixHeight(height) {
        if (!this.sprite) {console.log('ERROR no sprite to fix height',this); return}
        let scale = height/ this.sprite.height
        this.sprite.height *= scale
        this.sprite.width *= scale
    }

    fixWidth(width) {
        if (!this.sprite) {console.log('ERROR no sprite to fix width',this); return}
        let scale = width/ this.sprite.width
        this.sprite.height *= scale
        this.sprite.width *= scale
    }
}

















