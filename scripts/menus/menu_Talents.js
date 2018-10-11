



class Menu_Talents extends Menu {
    constructor(manager, superScene, args) {
        super(manager, superScene)
        this.menuID = e_menus.levelSelect
        this.back = e_menus.introScreen

        let path = 'assets/images/backgrounds/'
        this.bg = new Background(this, {assets: [path+'menuscreen.png']})
        this.assets.push(path+'menuscreen.png')
        
        this.hero = args.hero 
        this.assets = this.assets.concat(this.hero.assets)

        path = 'assets/images/abilities/'
        this.assets.push(path+'choice.png')
        this.assets.push(path+'emberblade.png')
        this.assets.push(path+'swipe.png')
        this.assets.push(path+'burning-dot.png')

        this.allSetup = false
        
        this.objects.push(this.hero) // hero get updated

    }// constructor


    setup(callback) {
        
       
        this.bg.addToScene({scene:this.scene})

        let path = 'assets/images/abilities/'
        let images = [ path+'choice.png', path+'burning-dot.png', path+'swipe.png', path+'emberblade.png']

        let rowGap = 0.08*HEIGHT
        let gap = 0.1*WIDTH
        let btnWidth = SETTINGS.ui.btnWidth
        let x0 = (WIDTH-3*btnWidth)/4
        let y0 = 0.1*HEIGHT

        for (let row =0; row< 5; row++) {
            for (let i=0; i< 3; i++) {
                let url = randChoice(images)
                let x = x0 + i*(btnWidth+gap)
                let y = y0 + row*(btnWidth+ rowGap)
                let sprite = this.createSprite({ url: url, x: x, y: y, z: 1, width: btnWidth, addToScene: true,})
                sprite.id = 'row:'+row+'_t:'+i
                //let trigger = (e)=>{ console.log(e) }
                sprite.interactive = true
                sprite.on('pointerdown', this.selectTalent.bind(this))
            }
        }
        
        
        let btn = this.createButton({x:0,y:0,width:btnWidth,height:btnWidth})
        btn.on('pointerdown',this.transition.bind(this))

        let btn2 = this.createButton({x:WIDTH-btnWidth,y:0,width:btnWidth,height:btnWidth})
        btn2.on('pointerdown',this.goBack.bind(this))

        this.allSetup = true
        super.setup(callback)
    }

    onEntry() {
        console.log('ON ENTRY')
        console.log('hero inCombat:',this.heroInCombat, this.hero.inCombat)
        super.onEntry()
        
        this.heroState = this.hero.state
        this.heroInCombat = this.hero.inCombat
        // this.hero.inCombat = false
        // this.hero.state = e_combatStates.dialog
        // if (this.allSetup) { this.updateData() }
        console.log('hero inCombat2:',this.heroInCombat, this.hero.inCombat)
    }


    onExit() {
        console.log('ON EXIT')

        this.hero.state = this.heroState
        this.hero.inCombat = this.heroInCombat
        super.onExit()
    }

    selectTalent(e) {
        console.log('talent selected',e.target.id)
    }

    transition() { this.manager.transition(e_stages.lv_002) }
    goBack() { this.manager.transition(e_stages.hero) }
}

