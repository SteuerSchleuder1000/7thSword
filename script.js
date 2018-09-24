

let app
let height = 1334
let width = 750 
let healthbar

//let randint = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min }


class Box {
    constructor() {

        this.x0 = randint(0,width)//width*0.65
        this.y0 = randint(0,height) //height*0.45
        this.s0 = width/4
        this.a0 = this.pythagoras(this.x0-width/2, this.y0-height/2)
        this.sprite = new PIXI.Graphics();
        this.sprite.lineStyle(4, 0xFFFFFF, 1);
        this.sprite.beginFill(0xFFFFFF);
        this.sprite.drawRect(0,0, this.s0,this.s0)
        this.sprite.position.set(this.x0, this.y0)
        this.sprite.endFill();
        this.sprite.alpha = 0.3

    }

    update() {
        let factor = 0.01
        
        let x = width/2 - this.sprite.x
        let y = height/2 - this.sprite.y

        //let d0 = this.pythagoras(x,y)


        this.sprite.x -= factor*x
        this.sprite.y -= factor*y

        let a1 = this.pythagoras(this.sprite.x - width/2, this.sprite.y - height/2)

        this.sprite.height = this.s0 * a1/this.a0
        this.sprite.width = this.s0 * a1/this.a0

        // let x = this.x0 - this.sprite.x
        // let y = this.y0 - this.sprite.y

    }

    pythagoras(x,y) { return Math.sqrt(x * x + y * y) }
}


window.onload = function() {
    
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){ type = "canvas" }

    let animations = new AnimationLib()

    let Application = PIXI.Application,
        Container = PIXI.Container,
        Graphics = PIXI.Graphics,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Text = PIXI.Text;

    

    app = new Application({ 
        width: width,         // default: 800
        height: height,       // default: 600
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 0.5,       // default: 1
      }
    );
    

    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0x061639;

    let hero, monster,  interface, speechBubble, state // state = gameloop called
    let boxes = []
    let buttons = []
    let time = 0


    loader
        .add([
            "assets/forestbackground.png",
            "assets/abKnight00.png",
            "assets/heroback00.png",
            'assets/healthbar.png',
            'assets/combo.png',
            'assets/swipe.png',
            'assets/choice.png',
        ])
        .on('progress',loadProgressHandler)
        .load(setup);


    function loadProgressHandler(loader, resource) {
        console.log('loading',loader.progress.toFixed(2))
    }

    

    function setup() {

        let bg =        new Sprite(resources["assets/forestbackground.png"].texture);
        healthbar =     new Sprite(resources['assets/healthbar.png'].texture)
        monster =       new Sprite(resources['assets/abKnight00.png'].texture)
        hero =          new Sprite(resources['assets/heroback00.png'].texture)
        for (let i=0; i< 3; i++) { 
            let btn = new Sprite(resources['assets/choice.png'].texture)
            btn.interactive = true
            btn.name = 'btn '+i
            buttons.push(btn)
            let size = width/5
            btn.width = size
            btn.height = size
            btn.position.set(5,5+i*(size+30))
            btn.on('click',clickHandler)
            btn.on('tap',clickHandler)
        }
        

        
        let scale = height/bg.height
        //for (let i=0;i<5;i++) { boxes.push(new Box())}

        bg.height *= scale
        bg.width *= scale
        bg.anchor.x = 0.5
        bg.position.x = width/2

        healthbar.width = width*0.8
        healthbar.anchor.set(0, 0.5)
        healthbar.position.set(width*0.1, height*0.95)


        scale = height/2/hero.height
        hero.name = 'hero'
        hero.height *= scale
        hero.width *= scale
        hero.anchor.set(0,1)
        hero.position.set(0, height)

        monster.name = 'monster'
        monster.anchor.set(0.5,1)
        monster.position.set(width*0.75,height*0.75)

        interface = new Container()
        interface.addChild(healthbar)

        speechBubble = new Container()

        app.stage.addChild(bg);
        app.stage.addChild(monster)
        app.stage.addChild(hero)
        app.stage.addChild(speechBubble)
        app.stage.addChild(interface)
        for (let btn of buttons) {  app.stage.addChild(btn)}
       

        updateSpeechBubble('Who Dares Entering\nThese Woods?')
        animations.shake(monster, width*0.1, 30)

        state = play

        app.ticker.add(delta => state(delta));
    }

    let comboPoints = 0
    let health = 100

    function clickHandler(e) {
        console.log('click',e)
    }

    function updateCombo() {
        
        let comboPoint = new Sprite(resources['assets/combo.png'].texture)
        comboPoint.anchor.set(0,0.5)
        comboPoint.position.set(comboPoints*width*0.2+width*0.1,healthbar.position.y)
        interface.addChild(comboPoint)
        animations.shake(comboPoint, width*0.02, 30)
        comboPoints += 1
        if (comboPoints >= 5) { state = endGame }
    }

    function updateHealth() {
        health -= 10
        healthbar.removeChildren()

        let hb_width = width * health/100

        let sprite = new Graphics();
        sprite.lineStyle(4, 0xFFFFFF, 1);
        sprite.beginFill(0xFFFFFF);
        sprite.drawRect(0, -healthbar.height/2, hb_width , healthbar.height)
        sprite.endFill();
        //sprite.anchor.y = 0.5
        healthbar.addChild(sprite)
        healthbar.mask = sprite


        animations.shake(healthbar, width*0.02, 30)
        if (health <= 0) { state = endGame }

    }

    function updateSpeechBubble(text) {
        let fontSize = height*0.03
        let roundBox = new Graphics();
        roundBox.lineStyle(4, 0xFFFFFF, 1);
        roundBox.beginFill(0xFFFFFF);
        roundBox.drawRoundedRect(0, 0, width*0.5, fontSize*3, 10)
        roundBox.endFill();
        roundBox.position.set(width*0.3,height*0.25)

        
        let style = new PIXI.TextStyle({
            fontFamily: "Notable",
            fontSize: fontSize,
            fill: 'black',
            stroke: 'black',
            strokeThickness: 1,
        });
        let message = new Text(text,style)
        message.position.set(10,10)

        roundBox.addChild(message)

        speechBubble.alpha = 1
        speechBubble.addChild(roundBox);
        animations.alpha(speechBubble, -1, 300)
    }


    function play(delta) {
        time += 1
        for (let box of boxes) { box.update() }
        hero.scale.y = 1 + 0.02*Math.sin(time*0.01+Math.PI)
        monster.scale.y = 1 + 0.02*Math.sin(time*0.01)
        if (Math.random() < 0.002) { updateCombo() }
        if (Math.random() < 0.004) { updateHealth() }
       
        animations.update()

    }

    function endGame(delta) {
        time += 1
        let text = (health > 0) ? 'You May Have\nWon This Time' : 'Justice Has\nBeen Served!'
        updateSpeechBubble(text)
    }

}

