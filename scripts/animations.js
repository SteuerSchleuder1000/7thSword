
/*

to do

    - simple animations
        - move
        - scale
        - rotate
        - alpha
        - shake
        - tint
    - continuous
    - sequence
    - ease-in, ease-out

    
    let sprite = ....
    let animations = Animations()

    animations.move(sprite, {x: 0, y: 0, time: 2.0, ease-in: true })

    // animations adds .animations = [] to sprite
*/








class Animations {
    constructor() {
        this.list = [] // lists all objects currently animated
    }

    update(delta) {
        if (delta == undefined) { delta = 1/FPS; console.log('WARNING delta undefined')}
        for (let obj of this.list) {
            if (!obj.animations || obj.animations == []) { this.remove(obj); continue }

            for (let f of obj.animations) { // cycle through all animations
                f(delta) // updates animation
            }
        }
    }

    add(obj) { this.list.push(obj) }
    remove(obj) {}
    removeAnimation(f) {}



    move(obj, args) {

        
        // parameter
        let loop = args.loop
        let time = args.time || 0



        // 
        let f = ()=>{} // update function
        f = (delta)=> { 

            if (time <= 0 && !loop) {
                obj.animations = obj.animations.filter(item => item !== f) // removes this function
            }


            obj.position.x += 0.1
            obj.position.y += 0.1
            time -= delta
            
        }


        if (!obj.animations) { obj.animations = [] }
        obj.animations.push(f)
        this.add(obj)
        return f
    }




    scale(obj,args) {

        // parameter
        let loop = args.loop
        let time = args.time || 0
        let scale = args.scale || 1.0

        let unit = scale/ 1

        // 
        let f = ()=>{} // update function
        f = (delta)=> { 

            if (time <= 0 && !loop) {
                obj.animations = obj.animations.filter(item => item !== f) // removes this function
            }


            obj.position.x += 0.1
            obj.position.y += 0.1
            time -= delta
            
        }


        if (!obj.animations) { obj.animations = [] }
        obj.animations.push(f)
        this.add(obj)
        return f
    }


    rotate() {}
    alpha() {}
    tint() {}


    shake(obj,args) {

        args = args || {}
        let magnitude = args.magnitude || 0.01
        let time = args.time || 0
        let loop = args.loop || false

        let x0 = obj.position.x
        let y0 = obj.position.y
        let magnitudeUnit = magnitude/time*FPS

        // FUNCTION
        let f = ()=>{} 
        f = (delta)=> { 
            if (time <= 0 && !loop) { 
                obj.position.set(x0, y0)
                obj.animations = obj.animations.filter(item => item !== f) 
            }


            //magnitude -= magnitudeUnit;
            obj.position.x = x0 + randInt(-magnitude, magnitude);
            obj.position.y = y0 + randInt(-magnitude, magnitude);


            time -= delta
        } // f


        if (!obj.animations) { obj.animations = [] }
        obj.animations.push(f)
        this.add(obj)
        return f
    }



    breathing(obj,args) {

        args = args || {}
        let magnitude = args.magnitude || 0.01
        let time = Math.random()*2*Math.PI //args.shift || Math.random()
        let scale = obj.scale.y
        let speed = 0.2

        let f = ()=>{} // update function
        f = (delta)=> { 

            obj.scale.y = scale + Math.sin( time * Math.PI * 2 * speed) * magnitude
            time += delta
        }


        if (!obj.animations) { obj.animations = [] }
        obj.animations.push(f)
        this.add(obj)
        return f
    }



    sequence(obj,arr) {

    }


}














