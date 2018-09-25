


// class State {
//     constructor () {}
//     update() {}
//     render() {}
//     onEntry() {}
//     onExit() {}
// }



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

        else { console.log('ERROR: State unknown:',state, this) }
    }

    add(stateID, state) { this.states[stateID] = state }

}






// class State_MainMenu extends State {


//     constructor () { super()}
//     update() {}
    
//     onEntry(game) {
//         console.log('main menu game state entry')
//         game.menuManager.display()


//     }// on Entry

//     onExit() {}

// }


// class State_World extends State {

//     constructor () { super()}
//     update() {}
//     render() {}
//     onEntry() {}
//     onExit() {}

// }

// class State_WorldMenu extends State {

//     constructor () {super()}
//     update() {}
//     render() {}
//     onEntry() {}
//     onExit() {}

// }



