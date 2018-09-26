
class AbilityButton extends Scene {
    constructor(ability, interfaceScene, sprite, hero) {
        super(ability, interfaceScene) // manager = heroAbility
        this.ability = ability
        this.ability.btn = this

        this.scene.visible = true
        this.sprite = sprite
        this.hero = hero
        this.addSprite(sprite)
        this.sprite.interactive = true
        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )
    }

    run() {
        let url = this.ability.assets[1]
        let texture = resources[url].texture
        this.sprite.texture = texture
    }

    cast() {
        let url = this.ability.assets[2]
        let texture = resources[url].texture
        this.sprite.texture = texture
    }
    recover() {
        let url = this.ability.assets[0]
        let texture = resources[url].texture
        this.sprite.texture = texture
    }

    update() { 
        // update castBar
    }

    flash() {
        // special effects
    }

    buttonEvent(e) {
        console.log('button pressed', this.ability)
        this.ability.run(this.hero.target)
    }
}
