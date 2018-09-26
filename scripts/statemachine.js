



class Statemachine {

    constructor() {
        this.states = {}
        this.current = null
    }

    update(delta) {
        if( this.current ) { this.current.update(delta) }
    }

    change(stateID) {
        if (stateID in this.states) { 
            if (this.current) { this.current.onExit() }
            this.current = this.states[stateID]
            this.current.onEntry()
        } 

        else { console.log('ERROR: State unknown:',stateID, this) }
    }

    add(stateID, state) { this.states[stateID] = state }

    contains(stateID) { return stateID in this.states }

    remove(stateID) { delete this.states.stateID }

}


