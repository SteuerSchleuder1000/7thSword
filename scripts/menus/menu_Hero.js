



class Menu_Hero extends Menu {
    constructor(manager, superScene, args) {
        super(manager, superScene)
        this.menuID = e_menus.levelSelect
        this.back = e_menus.introScreen

        let path = 'assets/images/backgrounds/'
        this.bg = new Background(this, {assets: [path+'menuscreen.png']})
        this.assets.push(path+'menuscreen.png')
        
        this.hero = args.hero 
        this.assets = this.assets.concat(this.hero.assets)

        this.allSetup = false
        
        this.objects.push(this.hero) // hero get updated

    }// constructor


    setup(callback) {
        
       
        this.bg.addToScene({scene:this.scene})

        this.hero.addToScene({x: 0.7*WIDTH, y: 0.81*HEIGHT, z: e_zIndex.character, height: HEIGHT*0.6, scene: this.scene})
        this.hero.frontView()

        let z = e_zIndex.interface
        let stats = this.hero.stats
        this.createText('HERO',{style: textStyles.title, anchor: [0.5,0.5], x:0.5*WIDTH, y: 0.1*HEIGHT, z:z})
        this.text_level = this.createText('Lv. '+stats.level,{style: textStyles.banner, anchor: [0.5,0.5], x:0.5*WIDTH, y: 0.13*HEIGHT, z:z})
        this.text_health = this.createText('Health: '+stats.health_init, {style: textStyles.banner, x:0.1*WIDTH, y:0.3*HEIGHT, z:z})
        this.text_power = this.createText('Power: '+stats.power_init, {style: textStyles.banner, x:0.1*WIDTH, y:0.4*HEIGHT, z:z})
        
        let btnWidth = SETTINGS.ui.btnWidth
        let btn = this.createButton({x:0,y:0,width:btnWidth,height:btnWidth})
        btn.on('pointerdown',this.transition.bind(this))

        this.allSetup = true
        super.setup(callback)
    }

    onEntry() {
        console.log('ON ENTRY')
        console.log('hero inCombat:',this.heroInCombat, this.hero.inCombat)
        super.onEntry()
        
        // this.heroState = this.hero.state
        // this.heroInCombat = this.hero.inCombat
        // this.hero.inCombat = false
        // this.hero.state = e_combatStates.dialog
        if (this.allSetup) { this.updateData() }
        console.log('hero inCombat2:',this.heroInCombat, this.hero.inCombat)
    }


    onExit() {
        console.log('ON EXIT')

        // this.hero.state = this.heroState
        // this.hero.inCombat = true//this.heroInCombat
        super.onExit()
    }

    updateData() {
        let stats = this.hero.stats
        this.text_level.text = 'Lv. '+stats.level
        this.text_health.text = 'Health '+stats.health_init
        this.text_power.text = 'Power '+stats.power
    }

    transition() {

        this.manager.loadLevel(e_levels.lv_002)
    }
}

