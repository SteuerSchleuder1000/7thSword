


let e_abStates = {
    idle: 0,
    casting: 1,
    performing: 2,
    recovering: 3,
}


/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/




class Ability extends Scene {
    constructor(character, stageScene, combat) { // manager == character

        super(character, stageScene, false)
        //this.scene.position.z = this.character.scene.position.z
        this.combat = combat
        this.target = null

        this.state = e_abStates.idle

        this.power = 0
        this.t_cast = 0
        this.t_perform = 0
        this.t_performAnimation = 0 // time for character animation
        this.t_recovery = 0.5

        this.t = 0 // used for all
        this.btn = null // only for hero


        this.animations = new Animations()
        this.sfxElements = [] // all sfx elements

    }

    update(delta) {
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
        for (let e of this.sfxElements) { e.update(delta) }
    }




    cast(target) {
        if (!target) { console.log('ERROR: No Target for Ability', this.name); return false}
        if (target.state == e_combatStates.defeated) { console.log('ERROR: Target defeated'); return false}
        if (this.state != e_abStates.idle) { console.log('ERROR: Ability not idle. State:', this.state, e_abStates); return false}
        if (this.manager.state != e_combatStates.idle) { console.log('ERROR: Hero not idle. State:', this.manager.state, e_combatStates); return false}

        this.target = target
        this.t = this.t_cast
        this.state = e_abStates.casting

        if( this.btn ) { this.btn.cast(this.t) }


        this.manager.cast()
        this.startCasting() // trigger
        return true // ability casting!
    } // cast

    

    perform() {
        this.state = e_abStates.performing
        this.t = this.t_perform
        this.manager.perform(this.t_performAnimation)

        if (this.btn) { this.btn.perform() }
        this.startPerforming()
    }


    
    execute() {
        this.t = 0
        this.recover(this.t_recovery)
        this.startExecuting()
    }


    recover(t=this.t_recovery) {
        this.state = e_abStates.recovering
        this.t = t

        if (this.btn) { this.btn.recover() }
        this.startRecovering()
    }

    idle() {
        // console.log('attack idle')
        this.state = e_abStates.idle
        this.t = 0
        this.target = null

        if (this.btn) { this.btn.idle() }
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
        this.manager.cancelAbility()
        this.animations.removeAll()
        for (let e of this.sfxElements) { e.destroy() } // elements need .destroy method!!!
    }

}


































