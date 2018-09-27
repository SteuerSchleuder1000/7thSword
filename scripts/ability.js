


let e_abStates = {
    idle: 0,
    casting: 1,
    performing: 2,
    recovering: 3,
}





class Ability extends Scene {
    constructor(character, stageScene, combat) { // manager == character

        super(character, stageScene, false)
        this.combat = combat
        this.target = null

    }

    update() {}
    run() {} // start ability
    cast() {} // ability executes
    cancel() {}

}


































