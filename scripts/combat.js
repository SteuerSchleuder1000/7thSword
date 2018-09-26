


class Combat {

    constructor(manager) { // manager = stage
        this.manager = manager
        //this.hero = this.manager.hero
        this.enemies = []
        this.log = []
        this.running = false
    }

    start() { this.running = true }
    end() { this.running = false }

    addEnemy(enemy) {
        this.enemies.push(enemy)
    }

    addHero( hero ) {
        this.hero = hero
        this.hero.target = this.enemies[0]
    }

    update(delta) {
        if ( !this.running ) { return }

        for (let e of this.enemies) { e.update(delta) }

        this.hero.update(delta)
        
    }




    dealDamage(damage, target, ability, caster) {
        if (!target) { console.log('ERROR: no target for ability:', damage, ability, caster); return }

        target.takeDamage(damage, ability, caster)

    }

    sortStack() {}

}