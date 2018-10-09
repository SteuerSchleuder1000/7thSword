

/*
    Button for quest log


*/


class QuestButton extends Button {

    constructor(manager,args) {
        super(manager, args)


        this.quest = args.quest

        //this.questText = 'Quest Title'



        this.style = new PIXI.TextStyle({
            fontFamily: 'Notable',
            fontSize: 20,
            fill: 'black',
            //align: 'left',
        });
    }

    addToScene(args) {
        args = args || {}


        let x = args.x || WIDTH*0.1
        let y = args.y || HEIGHT*0.3
        let z = args.z || e_zIndex.interface
        let width = args.width || WIDTH*0.4
        let height = args.height || WIDTH*0.1

        this.superScene = args.scene
        this.superScene.addChild(this.scene)
        this.scene.position.set(x,y)
        this.scene.position.z = z



        let bg = new Graphics()
        bg.beginFill(0xFFFFFF);
        bg.drawRect(0,0, width, height)
        bg.alpha = 0.5
        bg.interactive = true
        bg.name = this.quest.title
        bg.on('pointerdown', this.buttonEvent.bind(this))
        bg.buttonMode = true

        this.addSprite(bg)
        this.bg = bg



        let text = new Text( this.quest.title , this.style)
        text.anchor.set(0, 0.5)
        text.position.x = height*1.0
        text.position.z = e_zIndex.interface+0.1
        this.addSprite(text)


        let path = 'assets/images/UI/'
        let questIcon = new PIXI.Sprite.fromImage(path+'questIcon.png')
        let f = 0.8
        questIcon.width = height*f
        questIcon.height = height*f
        questIcon.anchor.set(0,0.5)
        this.addSprite(questIcon)


    }

    buttonEvent(e) {
        this.manager.transition(this.quest.levelID)
        console.log('buttonEvent quest')
    }



}