


class Combat {

    constructor(manager) {
        this.manager = manager
        this.hero = this.manager.hero
        this.enemies = []
        this.stack = []
    }

    addEnemy(enemy) {
        this.enemies.push(enemy)
    }

    update(delta) {
        for (let e of this.enemies) {
            let action = e.update()
            if (action) { this.addAction(action) }
        }
        this.hero.update()

        for (let s of this.stack) {
            if (this.stack[0].delta < delta) { stack[0].pop().execute() }
            else { break }
        }
        
    }

    addAction(action) { 
        this.stack.push(action)
        this.sortStack()
    }

    sortStack() {}

}