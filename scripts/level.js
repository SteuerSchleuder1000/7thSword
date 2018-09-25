
let e_levels = {
    properties: {}
}


for (let i=0; i< 10; i++) {
    e_levels['lv_00'+i] = i
}




class Level extends Scene {
    constructor(manager, superScene) {
        super(manager, superScene)
    }

}



class LevelManager extends Manager {

    constructor(manager, superScene) {
        super(manager, superScene)

        this.state.add(e_levels.lv_001, new Level_001(this, this.scene))
        //this.state.add(e_levels.lv_001, new Level_002(this, this.scene))
        
    }

    loadInterface(interfaceID) {}

    loadHero() {}

    transition(levelID) { this.state.change(levelID) }

    loadMenu(menuID) {
        this.manager.transition(e_gameStates.mainMenu, menuID)
    }


}



// LEVELS


class Level_001 extends Level {
    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'Tutorial lv001'
        this.assets = [
            'assets/forestbackground.png',
            'assets/healthbar.png',
            'assets/abKnight00.png',
            'assets/heroback00.png',
        ]
    }



    setup(callback) {
        let bg =        new Sprite(resources["assets/forestbackground.png"].texture);
        let healthbar = new Sprite(resources['assets/healthbar.png'].texture)
        let monster =   new Sprite(resources['assets/abKnight00.png'].texture)
        let hero =      new Sprite(resources['assets/heroback00.png'].texture)
        

        
        let scale = HEIGHT /bg.height
        bg.height *= scale
        bg.width *= scale
        bg.anchor.x = 0.5
        bg.position.x = WIDTH /2

        healthbar.width = WIDTH*0.8
        healthbar.anchor.set(0, 0.5)
        healthbar.position.set(WIDTH*0.1, HEIGHT*0.95)


        scale = HEIGHT /2/hero.height
        hero.name = 'hero'
        hero.height *= scale
        hero.width *= scale
        hero.anchor.set(0,1)
        hero.position.set(0, HEIGHT)

        monster.name = 'monster'
        monster.anchor.set(0.5,1)
        monster.position.set(WIDTH*0.75,HEIGHT*0.75)

        this.scene.addChild(bg)
        this.scene.addChild(monster)
        this.scene.addChild(hero)
        this.scene.addChild(healthbar)

        hero.interactive = true
        hero.on('pointerdown', this.transition.bind(this))

        super.setup(callback)
    }

    transition() {
        console.log('pointerdown')
        this.manager.loadMenu(e_menues.introScreen)
    }

}














