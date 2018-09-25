

class Level_002 extends Level {
    constructor(manager, superScene) {
        super(manager, superScene)
        this.scene.name = 'First Fight lv002'

        // standard
        this.combat = new Combat(this)
        this.interface = new Interface(this, this.scene)

        // characters
        this.knight = new Enemy_Knight()
        
        this.combat.addEnemy(this.knight)
        this.characters = [this.knight]


        this.assets = [
            'assets/forestbackground.png',
        ]

    }


    update(delta) {
        this.combat.update(delta)

    }



    setup(callback) {


        this.bg = this.createSprite({
            name: 'bg',
            url: 'assets/forestbackground.png',
            anchor: [0.5, 0],
            height: HEIGHT,
            x: WIDTH/2,
            y: 0,
            z: 0,
            addToScene: true,
        })


        this.knight.sprite = this.createSprite({
            name: this.knight.name,
            url: this.knight.assets[0],
            anchor: [0.5, 1],
            height: HEIGHT*0.4,
            x: 0.75*WIDTH,
            y: 0.75*HEIGHT,
            z: 1,
            addToScene: true,
        })


        this.hero.sprite = this.createSprite({
            name: 'hero',
            url: this.hero.assets[0],
            anchor: [0, 1],
            height: HEIGHT*0.5,
            x: 0,
            y: HEIGHT,
            z: 0,
            addToScene: true,
        })


        this.interface.setup()
        this.addSprite( this.interface.scene )

        this.hero.sprite.interactive = true
        this.hero.sprite.on('pointerdown', this.transition.bind(this))

        super.setup(callback)
    }

    transition() {
        console.log('pointerdown')
        this.manager.loadMenu(e_menues.introScreen)
    }

}
