


class Level_001 extends Level {
    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'Tutorial lv001'

      
        this.assets = [
            'assets/forestbackground.png',
            'assets/healthbar.png',
            'assets/abKnight00.png',
            'assets/abKnight00.png',
            'assets/heroback00.png',
            'assets/menuscreen.png',
        ]

        
    }

    update(delta) {
        
    }



    setup(callback) {
        let bg =        new Sprite(resources["assets/forestbackground.png"].texture);
        let healthbar = new Sprite(resources['assets/healthbar.png'].texture)
        let monster =   new Sprite(resources['assets/abKnight00.png'].texture)
        let hero =      new Sprite(resources['assets/heroback00.png'].texture)
        

        
        let scale = HEIGHT /bg.height
        bg.name = 'bg'
        bg.height *= scale
        bg.width *= scale
        bg.anchor.x = 0.5
        bg.position.x = WIDTH /2

        healthbar.name = 'healthbar'
        healthbar.width = WIDTH*0.8
        healthbar.height = WIDTH*0.08
        healthbar.anchor.set(0, 0.5)
        healthbar.position.set(WIDTH*0.1, HEIGHT*0.95)


        scale = HEIGHT*0.5/hero.height
        hero.name = 'hero'
        hero.height *= scale
        hero.width *= scale
        hero.anchor.set(0,1)
        hero.position.set(0, HEIGHT)

        scale = HEIGHT*0.4/monster.height
        monster.name = 'monster'
        monster.height *= scale
        monster.width *= scale
        monster.anchor.set(0.5,1)
        monster.position.set(WIDTH*0.75,HEIGHT*0.75)

        this.scene.addChild(bg)
        this.scene.addChild(monster)
        this.scene.addChild(hero)
        this.scene.addChild(healthbar)

        hero.interactive = true
        hero.on('pointerdown', this.tap.bind(this))

        super.setup(callback)
    }

    tap() {

    }

    transition() {
        console.log('pointerdown')
        this.manager.loadMenu(e_menues.introScreen)
    }

}
