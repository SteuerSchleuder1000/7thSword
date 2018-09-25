


class Stats {

    constructor() {

        this.power_init = 10
        this.health_init = 100

        this.power = 10
        this.health = 100
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
    }


} // stats


let e_combatStates = {
    ready: 0,
    waiting: 1,
    attacking: 2,
}



class Character {
    constructor() {
        this.name = ''
        this.state = new Statemachine()
        

        this.sprite = null
        this.stats = new Stats()
        this.assets = [] // images
        this.abilities = []
        this.buffs = []
        this.incombat = false

    }

    
    update(delta) {
        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }
    }

    takeDamage() {}

    reset() { 
        this.buffs = []
        this.stats.reset()
    }

    death() {}

    load(callback) {}
    setup(callback) {}
}




class Hero extends Character {

    constructor() {
        super()

        this.name = 'Hero'
        this.assets = [
            'assets/heroback00.png',
            'assets/herobackBlocking.png',
            'assets/heroFront.png',
        ]

        
    }
}





class Enemy extends Character {
    constructor() {
        super()        

    }

    decideAction() {}
    update(delta) {
        super.update(delta)
    }
}








class Enemy_Knight extends Enemy {

    constructor() {
        super()
        this.name = 'Knight'
        this.assets = [
            'assets/abKnight00.png',
            'assets/abKnight01.png',
            'assets/abKnight02.png',
            'assets/abKnight03.png',
        ]

        // this.state.add(e_combatStates.ready, null )
        // this.state.add(e_combatStates.waiting, null)
        // this.state.add(e_combatStates.attacking, null)
    }

    update(delta) {
        super.update(delta)

        // if this off cooldown && 1 ability off cooldown -> decide


        switch (this.state) {

            case 0: // ready
                console.log('case 0')
                return this.abilities[0]
                break;

            case 1: // waiting
                console.log('case 1')
                break;

            case 2: // attacking
                console.log('case 2')
                break;


        }
    }

    

}







