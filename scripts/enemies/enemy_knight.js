
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        this.name = 'Knight'


        // Stats
        this.stats = new Stats({
            health: 200, 
            power: 30,
        })


        // Animation
        this.frames = {
            idle:               'assets/abKnight01.png',
            casting_melee:      'assets/abKnight02.png',
            casting_spell:      'assets/abKnight02.png',
            performing_melee:   'assets/abKnight03.png',
            performing_spell:   'assets/abKnight03.png',
            blocking:           'assets/abKnight01.png',
            front:              'assets/abKnight01.png',

            // sfx assets
            blockSfx:           'assets/shieldcomb.png',
        }


        // Sounds
        let volume = SETTINGS.sound.volume
        this.sounds = {
            cast:                   new Howl({src: 'assets/sounds/knight/aggro1.ogg', volume: volume}),
            perform:                new Howl({src: 'assets/sounds/knight/aggro2.ogg', volume: volume}),
            execute:                new Howl({src: 'assets/sounds/knight/attack1.ogg', volume: volume}),
            takeDamage:             new Howl({src: ['assets/sounds/knight/wound1.ogg','assets/sounds/knight/wound2.ogg'], volume: volume}),
            block:                  new Howl({src: 'assets/sounds/clank.wav', volume: volume}),
            block_super:            new Howl({src: 'assets/sounds/clank.wav', volume: volume}),
            armor:                  new Howl({src: 'assets/sounds/armor7.ogg', volume: volume}),
            death:                  new Howl({src: 'assets/sounds/knight/death1.ogg', volume: volume}),

        }


        // Abilities
        this.abilities = [
            new Attack_Basic(this, superScene, combat),
            new Attack_Basic(this, superScene, combat),
        ]



        this.state = e_combatStates.idle
        for (let key of Object.keys(this.frames)) { this.assets.push(this.frames[key]) } // concat assets

    } // constructor


    startPerforming() {
        //this.sounds.perform.play()
    }


    decide() {
        this.target = this.combat.hero
        this.abilities[0].cast(this.target)
    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        //this.hitSound.play()
    }
}