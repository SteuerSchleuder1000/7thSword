


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)
        this.scene.position.z = 2
        this.name = 'Hero'
        this.healthbar = null
        this.playerControlled = true
        this.t_recoveryBlock = 1.0

        this.abilities = [
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
        ]

        for (let a of this.abilities) { a.t_cast = 1}

        this.assets = [
            // 'assets/heroback00.png',
            'assets/heroback.png',          // 0: idle
            'assets/heroback.png',          // 1: casting
            'assets/heroback.png',          // 2: performing
            'assets/herobackBlocking.png',  // 3: blocking
            'assets/heroFront.png',
        ]

        

        
    }



    update(delta) {
        super.update(delta) // updates all abilities and buffs

    }


    block(b) {
        switch(this.state) {
            case e_combatStates.idle:
                if (b) { super.block() }
                break;

            case e_combatStates.blocking:
                if (!b) { this.recover(this.t_recoveryBlock) }
                break;
        }
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
        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            anchor: [0, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })
    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        this.animations.shake(this.healthbar.sprite, {time: 0.5, magnitude:10})
        if (this.state == e_combatStates.blocking) {
            // sfx
        }
    }
}