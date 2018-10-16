

let KEYPOINTS = {
    overhead: 0,
    ground: 1,
    head: 2,
    middle: 3,
}


class Character extends Scene {
    constructor(manager, args) {//, superScene, combat) {
        super(manager)//, superScene)
        args = args || {}

        //this.scene.visible = true
        //this.combat = combat        



        this.sprite = null
        this.stats = args.stats || new Stats()
        this.assets = [] // images
        this.buffs = []
        this.frames = {} // animatino frames
        this.sounds = {}
        this.abilityIDs = args.abilityIDs || []
        this.abilities = []
        this.initAbilities()
        


        this.name = ''
        this.state = e_combatStates.idle
        this.animations = new Animations()


        this.x = 0
        this.y = 0
        this.z = 0
        this.t = 0 // cast bar
        this.t_superBlock = 0.5 // counts how long its been blocking
        this.t_recovery = 0.5 // normal recovery time
        
        
        this.playerControlled = false
        this.inCombat = false

        this.healthbar = null
        this.castingAbility = null // what ability is he casting?
        this.target = null // in combat

        this.kp = {overhead:{x:0,y:0},head:{x:0,y:0},ground:{x:0,y:0},middle:{x:0,y:0},hand:{x:0,y:0},}
        this.keyPoints = { // points for sprite attachements

            overhead: ()=>{
                let kp = this.kp.overhead
                return {x: this.sprite.width* kp.x , y: -this.sprite.height* kp.y}
            },

            head: ()=>{
                let kp = this.kp.head
                return {x: this.sprite.width* kp.x , y: -this.sprite.height* kp.y}
            },

            ground: ()=>{
                let kp = this.kp.ground
                return {x: this.sprite.width* kp.x , y: -this.sprite.height* kp.y}
            },

            middle: ()=>{
                let kp = this.kp.middle
                return {x: this.sprite.width* kp.x , y: -this.sprite.height* kp.y}
            },

            hand: ()=>{
                let kp = this.kp.hand
                return {x: this.sprite.width* kp.x , y: -this.sprite.height* kp.y}
            },

        } // this.keypoints
        
    } // constructor



    addToScene(args) {
        args = args || {}
        // this.removeFromScene()

        this.superScene = args.scene
        this.scene = new Container() // clean house
        this.scene.position.set(args.x, args.y)
        this.scene.position.z = args.z || e_zIndex.character
        this.superScene.addChild(this.scene)


        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            anchor: [0.5, 1],
            height: args.height,
            // x: args.x, y: args.y, z:args.z,
            x: 0, y: 0, z:args.z,
            addToScene: true,
        })

        for (let a of this.abilities) { a.addToScene(this.superScene) }

        this.shouldUpdate = true
        this.start()
    }



    start() {} // start after added to scene

    initAbilities() {
        for (let i of this.abilityIDs) {
            let a = e_attacks.init[i](this)
            this.abilities.push(a)
            this.assets.push(a.assets)
        }
    }

    startCombat(combat) {
        this.combat = combat
        this.inCombat = true
        for (let a of this.abilities) { a.combat = combat }
        this.idle()
        this.setTarget()
        this.healthbar.show()// {this.healthbar.show()}
    
    }

    endCombat() { this.inCombat = false }

    // setPosition(x,y,z) {
    //     this.x = x
    //     this.y = y
    //     this.z = z
    //     if (this.sprite) {
    //         if (x != undefined) { this.sprite.position.x = x}
    //         if (y != undefined) { this.sprite.position.y = y}
    //         if (z != undefined) { this.scene.position.z = z}
    //     }
    // }  
    

   

    update(delta) {
        super.update(delta) // updates all abilities && buffs
        this.animations.update(delta)

        if (!this.inCombat) { return }


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

        // this.manager.event(e_eventIDs.defeat,this)
        this.combat.event(e_eventIDs.defeat,this)
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

            case 'frontView':
                url = this.frames.front
                texture = resources[url].texture
                this.sprite.texture = texture
                break;

            case e_combatStates.dialog:
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

    gainExp(exp) {
        let lvUp = this.stats.gainExp(exp)
        if (lvUp) { 
            this.healthbar.updateHealth()
            console.log('LEVEL UP ',this.name, this.stats.level)
        }
    }


    reset() { 
        this.buffs = []
        this.stats.reset()
        this.idle()
    }

    addBuff(buff) { this.buffs.push(buff) }

    removeBuff(buff) {
        let idx = this.buffs.indexOf(buff)
        if (idx != -1) { this.buffs.splice(idx, 1)}
    }

    cancelAbility() {
        if (this.castingAbility) { this.castingAbility.cancel() }
        this.castingAbility = null
        this.healthbar.castbar.clear()
        // this.animate(e_combatStates.idle)
        this.recover()
    }

    

    removeFromScene() {
        super.removeFromScene()
        for (let a of this.abilities) { a.removeFromScene() }
        for (let b of this.buffs) { b.removeFromScene() }
        this.shouldUpdate = false
    }

    // scaleSprite(scale) {
    //     if (!this.sprite) {console.log('ERROR no sprite to scale',this); return}
    //     this.sprite.scale = scale
    // }

    // fixHeight(height) {
    //     if (!this.sprite) {console.log('ERROR no sprite to fix height',this); return}
    //     let scale = height/ this.sprite.height
    //     this.sprite.height *= scale
    //     this.sprite.width *= scale
    // }

}

















