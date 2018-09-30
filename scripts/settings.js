



let SETTINGS = {
    sound: {
        volume: 1.0,
    },

    fps: 60,
}


let e_zIndex = {

    bg: 0,
    character: 1,
    hero: 2,
    interface: 3,

}

let game, app // Global Objects
let HEIGHT = window.innerHeight //1334
let WIDTH = window.innerWidth //750 






let Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text


let emitterOptions_flame = {
    "alpha": {
        "start": 0.62,
        "end": 0
    },
    "scale": {
        "start": 0.25,
        "end": 0.75,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "list": [
            {"value":"fff191", "time":0},
            {"value":"ff622c", "time":0.6},
            {"value":"660802", "time":0.7},
            {"value":"333333", "time":1},
        ],
        "isStepped": false
        // "start": "#fff191",
        // "end": "#d60d0d"
    },
    "speed": {
        "start": 500,
        "end": 500,
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 265,
        "max": 275
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 50,
        "max": 50
    },
    "lifetime": {
        "min": 0.1,
        "max": 0.75
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": 0.2,//-1,
    "maxParticles": 100,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "circle",
    "spawnCircle": {
        "x": 0,
        "y": 0,
        "r": 10
    }
}// flame



let emitterOptions_sparks2 = {
    "alpha": {
        "start": 1,
        "end": 0.62
    },
    "scale": {
        "start": 0.15,
        "end": 0.1,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#f7fad2",
        "end": "#b88925"
    },
    "speed": {
        "start": 200,
        "end": 200,
        "minimumSpeedMultiplier": 0.1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 320
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 20
    },
    "lifetime": {
        "min": 0.5,
        "max": 1
    },
    "blendMode": "normal",
    "frequency": 0.01,
    "emitterLifetime": 0.2,
    "maxParticles": 37,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "point"
}



let emitterOptions_rain = { // 700 in 1 second
    "alpha": {
        "start": 0.5,
        "end": 0.5
    },
    "scale": {
        "start": 0.15,
        "end": 0.15,
        "minimumScaleMultiplier": 0.1
    },
    "color": {
        "start": "#ffffff",
        "end": "#e4f9ff"
    },
    "speed": {
        "start": 1000,
        "end": 1000,
        "minimumSpeedMultiplier": 0.7
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 89,
        "max": 95
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.25,
        "max": 0.7
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 100,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
        "x": 0,
        "y": 0,
        "w": WIDTH*1.1,
        "h": 1
    }
} // rain

let emitterOptions_rain2 = { // background
    "alpha": {
        "start": 0.5,
        "end": 0.5
    },
    "scale": {
        "start": 0.07,
        "end": 0.07,
        "minimumScaleMultiplier": 0.1
    },
    "color": {
        "start": "#ffffff",
        "end": "#e4f9ff"
    },
    "speed": {
        "start": 700,
        "end": 700,
        "minimumSpeedMultiplier": 0.7
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 89,
        "max": 95
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.25,
        "max": 0.5
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 100,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
        "x": 0,
        "y": HEIGHT*0.2,
        "w": WIDTH*1.1,
        "h": 1
    }
} // rain


let emitterOptions_sparks = {
    "alpha": {
        "start": 1,
        "end": 0
    },
    "scale": {
        "start": 0.2,
        "end": 0.2,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#f7fad2",
        "end": "#f7fad2",
        //"end": "#423628"
    },
    "speed": {
        "start": 200,
        "end": 100,
        "minimumSpeedMultiplier": 0.1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 320
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 20
    },
    "lifetime": {
        "min": 0.25,
        "max": 1
    },
    "blendMode": "normal",
    "frequency": 0.05,
    "emitterLifetime": 0.2,//-1,
    "maxParticles": 37,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "point"
}