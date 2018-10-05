

/*
    Button for quest log


*/


class QuestButton extends Button {

    constructor(manager, superScene,assets) {
        super(manager, superScene, assets)

        this.questText = 'Quest Title'



        this.style = new PIXI.TextStyle({
            fontFamily: 'Notable',
            fontSize: 20,
            fill: 'white',
            //align: 'left',
        });
    }

    setup(args) {
        args = args || {}

        let x = args.x || WIDTH*0.1
        let y = args.y || HEIGHT*0.3
        let z = args.z || e_zIndex.interface
        let width = args.width || WIDTH*0.4
        let height = args.height || WIDTH*0.1


        this.scene.position.set(x,y)
        this.scene.position.z = z

        // super.setup(x,y,z,width)
        let bg = new Graphics()
        bg.beginFill(0xFFFFFF);
        bg.drawRect(0,0, width, height)
        bg.alpha = 0.5
        //sprite.position.set(x,y)
        //sprite.position.z = z
        bg.interactive = true
        bg.on('pointerdown', this.buttonEvent.bind(this))

        this.addSprite(bg)
        this.bg = bg



        let text = new Text( this.questText , this.style)
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
        console.log('buttonEvent quest')
    }



}