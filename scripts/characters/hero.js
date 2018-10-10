


class Hero extends Character {

    constructor(manager, args) {

        super(manager)//, superScene, combat)
        console.log('new hero', args)
        this.scene.position.z = e_zIndex.hero
        this.name = 'Hero'
        this.playerControlled = true
        this.t_recoveryBlock = 1.0
        this.interface = null

        // STATS
        let level = args.level
        this.stats = new Stats({
            health: 100, 
            power: 30,
            exp: 0,
            level: level,
        })


        // Abilities
        this.abilityIDs = args.abilityIDs
        this.abilities = [
            new Attack_Fireball(this),
            // new Attack_Swipe(this),
            new Attack_Emberblade(this),
            new Attack_StunBlow(this),
            new Attack_Choice(this),
        ]


        // Animation
        let path = 'assets/images/hero/'
        this.frames = {
            idle:               'assets/images/hero/hero01.png',
            casting_melee:      'assets/images/hero/hero02.png',
            casting_spell:      'assets/images/hero/hero06.png',
            performing_melee:   'assets/images/hero/hero03.png',
            performing_spell:   'assets/images/hero/hero07.png',
            blocking:           'assets/images/hero/hero04.png',
            front:              'assets/images/hero/hero05.png',

            // sfx assets
            blockSfx:           'assets/images/hero/shieldcomb.png',
        }


        // Sounds
        let volume = SETTINGS.sound.volume
        path = 'assets/sounds/'
        this.sounds = {
            cast:                   new Howl({src: path+'hero/grunt3.ogg', volume: volume}),
            perform:                new Howl({src: path+'hero/attack1.ogg', volume: volume}),
            execute:                new Howl({src: path+'hero/grunt1.ogg', volume: volume}),
            takeDamage:             new Howl({src: ['assets/sounds/hero/wound1.ogg','assets/sounds/hero/wound4.ogg'], volume: volume}),
            block:                  new Howl({src: path+'block1.ogg', volume: volume}),
            block_super:            new Howl({src: path+'clank.wav', volume: volume}),
            armor:                  new Howl({src: path+'armor1.ogg', volume: volume}),
            death:                  new Howl({src: path+'hero/death1.ogg', volume: volume}),

        }
              

        for (let key of Object.keys(this.frames)) { this.assets.push(this.frames[key]) }
    } // constructor



    


    block(b) {
        if (!this.inCombat) {return}
        switch(this.state) {
            case e_combatStates.idle:
                if (b) { super.block() }
                this.blockSfx.visible = b
                break;

            case e_combatStates.blocking:
                if (!b) { 
                    this.interface.greyOut(true)
                    this.recover(this.t_recoveryBlock) 
                }
                this.blockSfx.visible = false
                break;
        }
    } // block


    animateBlock(superBlock) {

        let b = this.blockSfx
        b.visible = true
        let callback = ()=>{b.visible = false}

        let scale = superBlock ? 10 : 2
        let animationTime = superBlock ? 0.8 : 1
        this.animations.scale(this.blockSfx,{time: animationTime, scale: scale, reset: true, easeOut: true})
        this.animations.alpha(this.blockSfx,{time: animationTime, alpha: 0, reset: true, callback: callback})
        console.log(b)
    } // animateBlock


    startPerforming() {
        this.interface.greyOut(true)
    }
    

    startRecovering() {
        if(this.sprite) {this.sprite.tint = 0xba27db}
        
    }

    startIdle() {
        if (this.sprite) {this.sprite.tint = 0xFFFFFF}
        this.interface.greyOut(false)
        if (this.blockSfx.visible) { this.blockSfx.visible = false }
        this.setTarget() 
    }

   
    addToScene(args) {
        super.addToScene(args)
        this.animations.breathing(this.sprite)
        this.blockSfx = this.createSprite({
            name: 'shield',
            url: 'assets/images/hero/shieldcomb.png',
            anchor: [0.5,0.5],
            scale: 0.5,
            x: WIDTH*0.45, 
            y: HEIGHT*0.7, 
            z: e_zIndex.hero-0.1,
            addToScene: true,
            visible: false,
        })

    }

    start() { }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        
        if (this.state == e_combatStates.blocking) {
            let superBlock = (this.t <= this.t_superBlock)
            this.animateBlock(superBlock)
            if (superBlock) { this.changeComboBy(1)}

        } 
    }// take Damage

    setTarget() {
        if (!this.combat) { return }
        let idx = this.combat.enemies.indexOf(this.target)
        if (idx == -1) { 
            let enemies = this.combat.enemies

            if (enemies.length > 0) { this.target = this.combat.enemies[0] }
            else { this.target = null }
        }
    }

    frontView() {
        this.animate('frontView')
    }

    save() {
        let saveState = {
            name: 'hero',
            level: this.stats.level,
            abilityIDs: this.abilityIDs,
            // the rest
        }

        saveHero(saveState)
    }
}// hero









