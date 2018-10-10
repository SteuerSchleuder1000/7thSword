

/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/




class Attack_Basic extends Ability {


    constructor(manager, superScene, combat) {
        super(manager)//, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike'
        this.animationType = e_animationTypes.melee

        let path = 'assets/images/abilities/'
        this.assets = [
            path+'swipe.png',     // normal
            path+'swipeA.png',    // active
            path+'swipeB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 1
        this.t_cast = 5
        this.t_perform = 0.2
        this.t_performAnimation = 0.2 // time for character animation
        this.t_recovery = 1.0
        this.t = 0

        this.sounds = {
            //perform: new Howl({src: 'assets/sounds/sword2.mp3', volume: SETTINGS.sound.volume}),
        }

    }


    



    startExecuting() {
        let damage = parseInt(this.power * this.manager.stats.power)
        this.combat.dealDamage(damage, this.target, this, this.manager)
        //this.sound.play()
    }   

    


}// basic attack

