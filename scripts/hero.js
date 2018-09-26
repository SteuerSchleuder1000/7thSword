


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)
        this.scene.position.z = 2
        this.name = 'Hero'
        this.healthbar = null

        this.abilities = [
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
        ]

        for (let a of this.abilities) { a.t_cast = 1}

        this.assets = [
            'assets/heroback00.png',
            'assets/herobackBlocking.png',
            'assets/heroFront.png',
        ]

        

        
    }



    update(delta) {
        super.update(delta) // updates all abilities and buffs

        switch (this.state) {
            case e_combatStates.idle:
                break;

            case e_combatStates.casting:
                break;

            case e_combatStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.recover() }

            
        }
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
        console.log('took damage',this.name, this.stats.health, damage,caster,ability)
        //this.healthbar.updateHealth(this.stats.health)
    }
}