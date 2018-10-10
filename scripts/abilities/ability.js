


let e_abStates = {
    idle: 0,
    casting: 1,
    performing: 2,
    recovering: 3,
}


let e_animationTypes = {
    melee: 0,
    spell: 1,
}

let e_attacks = {
    basic:          0,
    choice:         1,
    emberblade:     2,
    fireball:       3,
    fireRing:       4,
    swipe:          5,

    init: {
        0: (m) => {return new Attack_Basic(m) },
        1: (m) => {return new Attack_Choice(m) },
        2: (m) => {return new Attack_Emberblade(m) },
        3: (m) => {return new Attack_Fireball(m) },
        4: (m) => {return new Attack_FireRing(m) },
        5: (m) => {return new Attack_Swipe(m) },
    },
}

/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/




class Ability {
    constructor(manager){//, superScene, combat) { // manager == character

        //super(character, superScene, false)
        //this.scene.position.z = this.character.scene.position.z
        //this.combat = combat
        
        this.manager = manager

        this.state = e_abStates.idle

        this.power = 0
        this.t_cast = 0
        this.t_perform = 0
        this.t_performAnimation = 0 // time for character animation
        this.t_recovery = 0.5

        this.cost_energy = 0
        this.cost_combo = 0

        this.t = 0 // used for all
        this.btn = null // only for hero
        this.combat = null // will be synced once character is added to comabt
        this.target = null

        this.animations = new Animations()
        this.objects = []
        this.animationType = e_animationTypes.melee
        this.sounds = {}
    }

    addToScene(scene) { this.superScene = scene }

    update(delta) {
        this.t = Math.max(this.t, 0)
        
        switch(this.state) {

            case e_abStates.idle:
                break;


            case e_abStates.casting:

                if (this.target.state == e_combatStates.defeated) { 
                    console.log('ERROR: Target defeated, ability could not finish')
                    this.cancel()
                    return false
                }

                this.t -= delta
                if (this.t <= 0) { this.perform() }
                break;

            case e_abStates.performing:
                this.t -= delta
                if (this.t <= 0) { this.execute()}
                break;

            case e_abStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.idle() } 
                break;
        }

        if (this.btn) { this.btn.update(delta) }

        this.animations.update(delta)
        for (let obj of this.objects) { obj.update(delta) }
    }




    cast(target) {
        if (!target) { return console.log('ERROR: No Target for Ability', this.name)}
        if (target.state == e_combatStates.defeated) { return console.log('ERROR: Target defeated')}
        if (this.state != e_abStates.idle) { return console.log('ERROR: Ability not idle. State:')}//, this.state, e_abStates)}
        if (this.manager.state != e_combatStates.idle) { return console.log('ERROR: Character not idle. State:')}//, this.manager.state, e_combatStates)}
        if (this.manager.stats.combo < this.cost_combo) { return console.log('ERROR: Character not enough combo')}//, this.manager.stats.combo, this.cost_combo)}
        if (this.manager.stats.energy < this.cost_energy) { return console.log('ERROR: Character not enough energy')}//, this.manager.stats.energy, this.cost_energy)}

        this.target = target
        this.t = this.t_cast
        this.state = e_abStates.casting

        if( this.btn ) { this.btn.cast(this.t) }


        this.manager.cast(this)
        this.startCasting() // trigger
        this.playSound(e_soundIDs.cast)
        return true // ability casting!
    } // cast

    

    perform() {
        this.state = e_abStates.performing
        this.t = this.t_perform
        this.manager.perform(this.t_performAnimation)

        if (this.btn) { this.btn.perform() }
        this.playSound(e_soundIDs.perform)
        this.startPerforming()
    }


    
    execute() {
        this.t = 0
        this.recover(this.t_recovery)
        this.playSound(e_soundIDs.execute)
        this.manager.changeComboBy(- this.cost_combo)
        this.manager.changeEnergyBy(- this.cost_energy)
        this.startExecuting()
    }


    recover(t=this.t_recovery) {
        this.state = e_abStates.recovering
        this.t = t

        if (this.btn) { this.btn.recover() }
        this.playSound(e_soundIDs.recover)
        this.startRecovering()
    }

    idle() {
        this.state = e_abStates.idle
        this.t = 0
        this.target = null

        if (this.btn) { this.btn.idle() }
        this.playSound(e_soundIDs.idle)
        this.startIdle()
    }

    // container functions to be used in abilities without having to invoke super.cast() etc

    startCasting() {} 
    startPerforming() {}
    startExecuting() {}
    startRecovering() {}
    startIdle() {}


    cancel() {
        this.idle()
        //this.manager.cancelAbility() // !!! watch out for recursion
        this.animations.removeAll()
        for (let obj of this.objects) { obj.destroy() } // elements need .destroy method!!!
    }

    playSound(soundID) {
        let key = e_soundIDs.properties[soundID]
        if (key in this.sounds) { this.sounds[key].play() }
    }

    stopSound(soundID) {
        if (soundID != undefined) { 
            let key = e_soundIDs.properties[soundID]
            return this.sounds[key].stop() 
        }

        
    }

    removeFromScene() { 
        for (let obj of this.objects) { obj.destroy() }
        //this.superScene.removeChild(this.scene); 
        this.stopAllSounds()
    }

    stopAllSounds() { for (let key of Object.keys(this.sounds)) { this.sounds[key].stop() } }
}


































