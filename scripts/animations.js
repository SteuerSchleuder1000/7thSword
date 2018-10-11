
/*

to do

    - simple animationList
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
    let animationList = Animations()

    animationList.move(sprite, {x: 0, y: 0, time: 2.0, ease-in: true })

    // animationList adds .animationList = [] to sprite
*/








class Animations {
    constructor() {
        this.list = [] // lists all objects currently animated
    }

    update(delta) {
        if (delta == undefined) { delta = 1/SETTINGS.fps; console.log('WARNING delta undefined')}
        for (let obj of this.list) {
            if (!obj.animationList || obj.animationList == []) { this.remove(obj); continue }

            for (let f of obj.animationList) { // cycle through all animationList
                f(delta) // updates animation
            }
        }
    }

    add(obj) { this.list.push(obj) }

    remove(obj) { this.list = this.list.filter(item => item !== obj) }

    removeAnimation(f) {}

    removeAll() {
        for (let obj of this.list) {
            if (!obj.animationList) {continue}
            else { obj.animationList = [] }
        }
        this.list = []
    }













    move(obj, args) {

        
        args = args || {}
        // let speed = args.speed || 0.01
        let time = args.time || 0
        let x = args.x
        let y = args.y
        let reset = args.reset || false
        let callback = args.callback

        let x0 = obj.position.x
        let y0 = obj.position.y

        if (x == undefined) { x = x0 }
        if (y == undefined) { y = y0 }

        let duration = time

        // FUNCTION
        let f = ()=>{} 
        f = (delta)=> { 

            if (time <= 0) { 
                if(reset) { obj.position.set(x0,y0) }

                obj.animationList = obj.animationList.filter(item => item !== f)
                if (callback) { return callback() }
                return 
            }


            obj.position.x = x0 + (duration - time)/duration*(x-x0)
            obj.position.y = y0 + (duration - time)/duration*(y-y0)


            time -= delta
        } // f


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
        this.add(obj)
        return f
    }
















    scale(obj,args) {

        // parameter
        let time = args.time || 0
        let scale = args.scale || 1.0
        let reset = args.reset || false


        let scaleX0 = obj.scale.x
        let scaleY0 = obj.scale.x
        let callback = args.callback

        let scaleX, scaleY
        if (args.x != undefined) { scaleX = args.x }
        if (args.y != undefined) { scaleY = args.y }
        if (scaleX == undefined && scaleY != undefined) { scaleX = 1 }
        if (scaleY == undefined && scaleX != undefined) { scaleY = 1 }
        if (scaleY == undefined && scaleX == undefined) { scaleX = 1; scaleY = 1 }
        if (args.scale != undefined) { scaleX = args.scale; scaleY = args.scale }

        // let scale0 = obj.scale.x
        let progress = 0
        let duration = time

        // 
        let f = ()=>{} // update function
        f = (delta)=> { 

            if (time <= 0) { 
                if(reset) { obj.scale.x = scaleX0; obj.scale.y = scaleY0 }

                obj.animationList = obj.animationList.filter(item => item !== f)
                if (callback) { return callback() }
                return
            }

            progress = (duration-time)/duration
            obj.scale.x = scaleX0 * (1 + progress*(scaleX - 1)) // progress*(scale*scale0 - scale0)
            obj.scale.y = scaleY0 * (1 + progress*(scaleY - 1)) //scale0 + progress*(scale*scale0 - scale0)
            time -= delta

            return f
        }


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
        this.add(obj)
        return f
    } // scale
















    rotate(obj,args) {
        args = args || {}
        let speed = args.speed || 0.01
        let time = args.time || 0
        let loop = args.loop || false

        let duration = time
        
        let angle = obj.rotation

        // FUNCTION
        let f = ()=>{} 
        f = (delta)=> { 

            if (time <= 0 && !loop) { 
                obj.rotation = angle
                obj.animationList = obj.animationList.filter(item => item !== f) 
                return
            }


            obj.rotation += speed/SETTINGS.fps

            time -= delta
        } // f


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
        this.add(obj)
        return f
    }











    alpha(obj,args) {
        // parameter
        let time = args.time || 0
        let alpha = args.alpha || 1.0
        let reset = args.reset || false
        let callback = args.callback

        let alpha0 = obj.alpha
        let progress = 0
        let duration = time

        // 
        let f = ()=>{} // update function
        f = (delta)=> { 

            if (time <= 0) { 
                obj.animationList = obj.animationList.filter(item => item !== f) 
                if(reset) { obj.alpha = alpha0 }
                if(callback) { return callback() }

                return
            }


            progress = time/duration //(duration-time)/duration
            //console.log('progress alpha', progress, obj.alpha)
            obj.alpha = progress //alpha0 + progress*(alpha - alpha0)
            
            time -= delta

            return f
        }


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
        this.add(obj)

        return f



    }













    tint() {}


    shake(obj,args) {

        args = args || {}
        let magnitude = args.magnitude || 0.01
        let time = args.time || 0
        let loop = args.loop || false
        let callback = args.callback

        let duration = time
        let x0 = obj.position.x
        let y0 = obj.position.y
        let magnitudeUnit = magnitude/time*SETTINGS.fps

        // FUNCTION
        let f = ()=>{} 
        f = (delta)=> { 

            if (time <= 0 && !loop) { 
                obj.position.set(x0, y0)
                obj.animationList = obj.animationList.filter(item => item !== f)
                if (callback) { return callback() }
                return
            }


            let m = magnitude*time/duration
            obj.position.x = x0 + randInt(-m, m);
            obj.position.y = y0 + randInt(-m, m);


            time -= delta
        } // f


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
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


        if (!obj.animationList) { obj.animationList = [] }
        obj.animationList.push(f)
        this.add(obj)
        return f
    }










    sequence(obj,arr) {

    }


}














