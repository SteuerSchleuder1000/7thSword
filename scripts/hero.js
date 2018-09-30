


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)
        this.scene.position.z = e_zIndex.hero
        this.name = 'Hero'
        this.healthbar = null
        this.playerControlled = true
        this.t_recoveryBlock = 1.0

        this.abilities = [
            //new Attack_Fireball(this, superScene, combat),
            new Attack_Swipe(this, superScene , combat), // 
            new Attack_Emberblade(this, superScene , combat),
            new Attack_Choice(this, superScene , combat),
        ]

        this.blockSound = new Howl({src: ['assets/sounds/clank.wav'], volume: SETTINGS.sound.volume})


        this.assets = [
            'assets/images/hero/hero01.png',     // 0: idle
            'assets/images/hero/hero02.png',     // 1: casting
            'assets/images/hero/hero03.png',     // 2: performing
            'assets/images/hero/hero04.png',     // 3: blocking
            'assets/images/hero/hero05.png',     // 4: front
            'assets/images/hero/hero06.png',     // 5: spell
            'assets/images/hero/hero07.png',     // 6: hex
            // 'assets/heroback00.png',
            // 'assets/heroback.png',          // 0: idle
            // 'assets/heroback.png',          // 1: casting
            // 'assets/heroback.png',          // 2: performing
            // 'assets/herobackblocking.png',  // 3: blocking
            // 'assets/herofront.png',
            'assets/shieldcomb.png',        // block sfx
        ]

        

        
    }



    update(delta) {
        super.update(delta) // updates all abilities and buffs

    }


    block(b) {
        switch(this.state) {
            case e_combatStates.idle:
                if (b) { super.block() }
                this.blockSfx.visible = true
                break;

            case e_combatStates.blocking:
                if (!b) { this.recover(this.t_recoveryBlock) }
                this.blockSfx.visible = false
                break;
        }
    }

    blockAnimation() {
        let animationTime = 1
        this.blockSfx.visible = true
        let b = this.blockSfx
        let callback = ()=>{b.visible = false}
        this.animations.scale(this.blockSfx,{time: animationTime, scale: 8, reset: true, easeOut: true})
        this.animations.alpha(this.blockSfx,{time: animationTime, alpha: 0, reset: true, callback: callback})
        //this.animations.move(this.blockSfx,{time: animationTime, y: HEIGHT*0.6, reset: true})
    }

    recover(t) {
        super.recover(t)
        if(this.sprite) {this.sprite.tint = 0xba27db}
    }

    idle() {
        super.idle()
        if (this.sprite) {this.sprite.tint = 0xFFFFFF}
    }



    setup() {

        this.blockSfx = this.createSprite({
            name: 'shield',
            url: 'assets/shieldcomb.png',
            anchor: [0.5,0.5],
            scale: 0.5,
            x: WIDTH*0.45, 
            y: HEIGHT*0.7, 
            z: this.z-0.1,
            addToScene: true,
            visible: false,
        })



        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            anchor: [0.5, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })

    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        this.animations.shake(this.healthbar.sprite, {time: 0.5, magnitude:10})
        if (this.state == e_combatStates.blocking) {
            this.blockAnimation()
            this.blockSound.play()
        }
    }
}