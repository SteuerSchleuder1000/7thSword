


let e_combatStates = {
    idle: 0,
    casting: 1,
    performing: 2, // performing attack/ animation
    recovering: 3,
    blocking: 4,
    defeated: 5,
}






class Character extends Scene {
    constructor(manager, superScene, combat) {
        super(manager, superScene)
        this.scene.visible = true
        this.scene.position.z = e_zIndex.character
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
        this.t_superBlock = 0.5 // counts how long its been blocking

        this.keyPoints = { // key points on the character sprite
            overhead: [0,0],
            feet: [0,0],
        }

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
                this.t += delta
                break;

        }

        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }
        if (this.healthbar) {this.healthbar.update(delta)}
        this.animations.update(delta)
    }

    decide() {}

    cast(ability) {
        // check if valid order
        this.castingAbility = ability
        this.state = e_combatStates.casting
        this.t = 0
        this.animate(this.state)
        this.startCasting()
    }

    perform(t = 0) {
        this.state = e_combatStates.performing
        this.t = t
        this.animate(this.state)
        this.startPerforming()
    }

    recover(t = this.t_recovery) {
        this.state = e_combatStates.recovering
        this.t = t
        this.animate(this.state)
        this.startRecovering()
    }

    idle() {
        this.state = e_combatStates.idle
        this.t = 0
        this.animate(this.state)
        this.startIdle()
    }

    block(b) {
        this.state = e_combatStates.blocking
        this.t = 0
        this.animate(this.state)
        this.startBlocking
    }

    startCasting () {}
    startPerforming() {}
    startRecovering() {}
    startIdle() {}
    startBlocking() {}


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

        switch(this.state) {
            case e_combatStates.blocking:
                let f = 0.5
                if (this.t <= this.t_superBlock) { f = 0.1 }
                if (this.t > 5.0) { f = 1 }
                damage *= f
                break;

            case e_combatStates.casting:
                // setback?, cancel?
                this.castingAbility.t += 0.5 // 0.5 sec setback
                break;

            case e_combatStates.recovering:
                damage *= 2 // take double damage
                break
        }


        if (this.state == e_combatStates.blocking) { 
            
        }

        this.changeHealth(-damage)
        if (this.stats.health <= 0) { this.defeat() }
    }


    changeHealth(d) {
        this.stats.changeHealth(d)
        if (this.healthbar) { this.healthbar.updateHealth(this.stats.health) }
    }

    changeCombo(d) {
        this.stats.changeCombo(d)
        this.healthbar.updateCombo()
    }



    reset() { 
        this.buffs = []
        this.stats.reset()
    }

    

    cancelAbility() {
        if (this.castingAbility) { this.castingAbility.cancel() }
        this.castingAbility = null
        //this.idle()
        this.recover()
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

}

















