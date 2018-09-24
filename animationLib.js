

class AnimationLib {

    constructor(renderingEngine = PIXI) {
        if (renderingEngine === undefined) throw new Error("Please supply a reference to PIXI in the SpriteUtilities constructor before using spriteUtilities.js"); 

        this.animating = true

        this.animatedSprites = []

        this.alphaSprites = []
        this.scalingSprites = []
        this.shakingSprites = [] // sprites currently shaking
    }




    update() { // update all sprites currently animated
        if (!this.animating) { return }
        // update Shaking sprites
        for (let s of this.shakingSprites) { if (s.updateShake) { s.updateShake() } }
        for (let s of this.alphaSprites) { if (s.updateAlpha)  { s.updateAlpha() } }


    }


    /*
        Animations:
            - alpha
            - scale (sprite, factor, frames)
            - shake (sprite, magnitude, frames, callback?)
            - tint  (sprite, color, frames)
    
    */

    alpha(sprite, delta, frames) {

        let self = this
        let counter = 0
        let unit = delta/ frames

        if( self.alphaSprites.indexOf(sprite) === -1 ) { // check if sprite is already in self.shakingSprites
            self.alphaSprites.push(sprite);
            sprite.updateShake = () => { updateAlpha() } // adds updateShake methode to sprite
        }

        function updateAlpha() {

            sprite.alpha += unit
            counter += 1
            if (counter > frames) {
                self.alphaSprites.splice(self.alphaSprites.indexOf(sprite), 1);
            }
        }
    }

    scale(sprite, factor, frames) {

    } // scale

    shake(sprite, magnitude = 16, frames = 10, angular = false) {
        let self = this

        let counter = 1

        let startX = sprite.x,
            startY = sprite.y,
            startR = sprite.rotation

        let magnitudeUnit = magnitude / frames;

        if( self.shakingSprites.indexOf(sprite) === -1 ) { // check if sprite is already in self.shakingSprites
            self.shakingSprites.push(sprite);
            sprite.updateShake = () => { (angular) ? angularShake() : upAndDownShake() } // adds updateShake methode to sprite
        }
        
        function upAndDownShake() {

            if (counter < frames) {

                sprite.x = startX;
                sprite.y = startY;

                magnitude -= magnitudeUnit;

                sprite.x += randint(-magnitude, magnitude);
                sprite.y += randint(-magnitude, magnitude);

                counter += 1;
            }

            if (counter >= frames) {
                sprite.x = startX;
                sprite.y = startY;
                self.shakingSprites.splice(self.shakingSprites.indexOf(sprite), 1);
            }
        } // shake.upAndDownShake

        let tiltAngle = 1;

        function angularShake() {
            if (counter < frames) {

                sprite.rotation = startR;

                magnitude -= magnitudeUnit;

                sprite.rotation = magnitude * tiltAngle;
                counter += 1;

                tiltAngle *= -1;
            }

            if (counter >= frames) {
                sprite.rotation = startAngle;
                self.shakingSprites.splice(self.shakingSprites.indexOf(sprite), 1);
            }
        } // shake.angularShake()


    } // shake



    tint(sprite, color, frames) {


    } // tint


}