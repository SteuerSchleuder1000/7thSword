




class Character extends Scene {
    constructor(manager, superScene, combat) {
        super(manager, superScene)
        this.scene.visible = true
        this.scene.position.z = e_zIndex.character
        this.combat = combat

        this.name = ''
        this.state = e_combatStates.idle
        this.animations = new Animations()
        

        this.sprite = null
        this.stats = new Stats()
        this.assets = [] // images
        this.frames = {} // animatino frames
        this.sounds = {}
        this.abilities = []
        this.buffs = []



        this.x = 0
        this.y = 0
        this.z = 0
        this.t = 0 // cast bar
        this.t_superBlock = 0.5 // counts how long its been blocking


        this.t_recovery = 0.5 // normal recovery time
        this.target = null // in combat
        this.castingAbility = null // what ability is he casting?
        this.playerControlled = false
        this.healthbar = null

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
        this.animations.update(delta)

        //if (this.combat.shouldUpdate) { return } // if combat not running don't update comabt stats

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

            case e_combatStates.waiting:
                this.t -= delta
                if (this.t <= 0) { this.idle() }
                break

        }

        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }
        if (this.healthbar) {this.healthbar.update(delta)}
    }

    decide() {}
    setTarget() {} // decides target

    cast(ability) {
        // check if valid order
        this.castingAbility = ability
        this.state = e_combatStates.casting
        this.t = 0
        this.animate(this.state)
        this.playSound(e_soundIDs.cast)
        this.startCasting()
    }

    perform(t = 0) {
        this.state = e_combatStates.performing
        this.t = t
        this.animate(this.state)
        this.playSound(e_soundIDs.perform)
        this.startPerforming()
    }

    recover(t = this.t_recovery) {
        this.state = e_combatStates.recovering
        this.t = t
        this.animate(this.state)
        this.playSound(e_soundIDs.recover)
        this.startRecovering()
    }

    idle() {
        this.state = e_combatStates.idle
        this.t = 0
        this.animate(this.state)
        this.playSound(e_soundIDs.idle)
        this.startIdle()
    }

    block(b) {
        this.state = e_combatStates.blocking
        this.t = 0
        this.animate(this.state)
        this.playSound(e_soundIDs.block_start)
        this.startBlocking()
    }

    wait(t=1.0) {
        this.state = e_combatStates.waiting
        this.t = t
        this.animate(this.state)
        this.playSound(e_soundIDs.idle)
        this.startWaiting()
    }

    startCasting () {}
    startPerforming() {}
    startRecovering() {}
    startIdle() {}
    startBlocking() {}
    startWaiting() {}


    defeat() {

        this.manager.event(e_eventIDs.defeat,this)
        this.state = e_combatStates.defeated
        this.t = 0
        this.playSound(e_soundIDs.death)
        this.animate(this.state)
    }




    animate(stateID) {
        let url, texture

        switch(stateID) {
            case e_combatStates.idle:
                url = this.frames.idle //this.assets[0]
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.casting:
                switch(this.castingAbility.animationType) {
                    case e_animationTypes.melee:
                        url = this.frames.casting_melee
                        break;
                    case e_animationTypes.spell:
                        url = this.frames.casting_spell
                        break;
                }
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.performing:
                switch(this.castingAbility.animationType) {
                    case e_animationTypes.melee:
                        url = this.frames.performing_melee
                        break;
                    case e_animationTypes.spell:
                        url = this.frames.performing_spell
                        break;
                }
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.recovering:
                url = this.frames.idle
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.blocking:
                url = this.frames.blocking
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.defeated:
                url = this.frames.idle
                texture = resources[url].texture
                this.sprite.texture = texture
                break;
        }
    }


    

    playSound(soundID) {
        let key = e_soundIDs.properties[soundID]
        if (key in this.sounds) { this.sounds[key].play() }
    }



    takeDamage(damage, ability, caster) {

        switch(this.state) {
            case e_combatStates.blocking:
                let f = 0.5
                let superBlock = (this.t <= this.t_superBlock)
                if (superBlock) { f = 0.1; this.playSound(e_soundIDs.block_super) }
                else { this.playSound(e_soundIDs.block) }
                if (this.t > 5.0) { f = 1 }
                damage *= f
                break;

            case e_combatStates.casting:
                //this.castingAbility.t += 0.5 // 0.5 sec setback
                break;

            case e_combatStates.recovering:
                damage *= 2 // take double damage
                break
        }

        if (this.state != e_combatStates.blocking) { 
            this.playSound( e_soundIDs.takeDamage )
            this.playSound( e_soundIDs.armor )
        }
        

        this.changeHealthBy(-damage)
        if (this.stats.health <= 0) { this.defeat() }
    }




    heal(healing, ability, caster) {
        this.changeHealthBy(healing)
    }

    changeHealthBy(d) {
        this.stats.changeHealthBy(d)
        this.healthbar.updateHealth(d)
    }

    changeComboBy(d) {
        this.stats.changeComboBy(d)
        this.healthbar.updateCombo()
    }

    changeEnergyBy(d) {
        this.stats.changeEnergyBy(d)
        //this.healthbar.updateEnergy() // maybe later?
    }



    reset() { 
        this.buffs = []
        this.stats.reset()
        this.idle()
    }

    addBuff(buff) { this.buffs.push(buff) }

    removeBuff(buff) {
        let idx = this.buffs.indexof(buff)
        if (idx != -1) { this.buffs.splice(idx, 1)}
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
            anchor: [0.5, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })
    }

    removeFromScene() {
        super.removeFromScene()
        for (let a of this.abilities) { a.removeFromScene() }
        for (let b of this.buffs) { b.removeFromScene() }
        this.shouldUpdate = false
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

















