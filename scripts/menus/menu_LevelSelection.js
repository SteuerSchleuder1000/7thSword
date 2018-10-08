

class Menu_LevelSelection extends Menu {
    constructor(manager, superScene, args) {
        super(manager, superScene)
        this.menuID = e_menus.levelSelect
        this.back = e_menus.introScreen

        let path = 'assets/images/backgrounds/'
        this.bg = new Background(this, {assets: [path+'menuscreen.png']})
        this.assets.push(path+'menuscreen.png')
        
        this.hero = args.hero //new Hero(this, this.scene, null)
        this.hero.state = e_combatStates.dialog // does not update comabt stuff
        this.assets = this.assets.concat(this.hero.assets)

        this.quests = []
        this.questButton = new QuestButton(this, this.scene)
        this.objects.push(this.hero) // hero get updated

    }// constructor


    setup(callback) {
        
       
        this.bg.addToScene({scene:this.scene})
        // this.scene.interactive = true
        // this.scene.on('pointerdown', this.transition.bind(this))


        this.hero.addToScene({x: 0.7*WIDTH, y: 0.81*HEIGHT, z: e_zIndex.character, height: HEIGHT*0.6, scene: this.scene})
        this.hero.frontView()


        for (let i=0; i<5; i++) {
            let quest = new Quest()
            let btn = new QuestButton(this, {quest:quest})
            btn.addToScene({x: 0.05*WIDTH, y: HEIGHT*0.3 + i*WIDTH*0.15, z: e_zIndex.interface, width: WIDTH*0.4, scene: this.scene})
            console.log('questButton',btn)
        }

        //this.questButton.setup()


        let style = new PIXI.TextStyle({
            fontFamily: 'Notable',
            fontSize: 30,
            fill: 'black',
        });

        let text = new Text('Moon', style)
        text.anchor.set(0.5,0.5)
        text.position.set(WIDTH *0.5, HEIGHT *0.1)
        text.position.z = e_zIndex.interface

        this.scene.addChild(text)

        super.setup(callback)
    }

    transition(levelID) {
        // Level 1
        this.manager.loadLevel(e_levels.lv_002)
    }
}

