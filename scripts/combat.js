


class Combat {

    constructor(manager) { // manager = stage
        this.manager = manager
        //this.hero = this.manager.hero
        this.enemies = []
        this.log = []
        this.shouldUpdate = false
    }

    start() { 
        this.shouldUpdate = true
        for (let e of this.enemies) { 
            //e.healthbar.show()
            //e.setTarget()
            e.startCombat(this)
        }
        this.hero.startCombat(this)
        //this.hero.setTarget()
    }

    end() { this.shouldUpdate = false }

    addEnemy(enemy) {

        this.enemies.push(enemy)
        if (this.shouldUpdate) { enemy.startCombat(this) }
        if(this.hero) { this.hero.setTarget() }
    }

    removeEnemy(enemy) {
        let idx = this.enemies.indexOf(enemy)
        if (idx != -1) { 
            this.enemies.splice(idx,1) 
            for (let e of this.enemies) { e.setTarget() }
            this.hero.setTarget()
        }
        else { console.log('ERROR: Enemy could not be found in enemies',this)}
    }

    addHero( hero ) {
        this.hero = hero
        if (this.shouldUpdate) { this.hero.startCombat(this) }
        // this.hero.setTarget()
        // this.hero.target = this.enemies[0]
    }

    update(delta) {
        if ( !this.shouldUpdate ) { return }

        for (let e of this.enemies) { e.update(delta) }
        this.hero.update(delta)
        
    }




    dealDamage(damage, target, ability, caster) {
        if (!target) { console.log('ERROR: no target for ability:', damage, ability, caster); return }

        target.takeDamage(damage, ability, caster)

    }

}