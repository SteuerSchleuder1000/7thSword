


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

    }

    update(delta) {
        switch(this.state) {

            case e_abStates.idle:
                break;


            case e_abStates.casting:
                // check if target still valid
                // trigger hit animation
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
    }




    cast(target) {
        if (!target) { console.log('ERROR: No Target for Ability', this.name); return }
        if (target.state == e_combatStates.defeated) { console.log('ERROR: Target defeated'); return}
        if (this.state != e_abStates.idle) { console.log('ERROR: Ability not idle. State:', this.state, e_abStates); return}
        if (this.manager.state != e_combatStates.idle) { console.log('ERROR: Hero not idle. State:', this.manager.state, e_combatStates); return}

        this.target = target
        this.t = this.t_cast
        this.state = e_abStates.casting

        if( this.btn ) { this.btn.cast(this.t) }

        // animate stage

        this.manager.cast()
    } // cast



    perform() {
        this.state = e_abStates.performing
        this.t = this.t_perform
        this.manager.perform(this.t_performAnimation)

        if (this.btn) { this.btn.perform() }
    }

    execute() {
        this.t = 0
        this.recover(this.t_recovery)
    }


    recover(t=this.t_recovery) {
        this.state = e_abStates.recovering
        this.t = t

        if (this.btn) { this.btn.recover() }
    }
    idle() {
        // console.log('attack idle')
        this.state = e_abStates.idle
        this.t = 0
        this.target = null

        if (this.btn) { this.btn.idle() }
    }

    cancel() {
        this.idle()
        this.manager.cancelAbility()
    }

}


































