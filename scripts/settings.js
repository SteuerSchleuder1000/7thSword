



let SETTINGS = {
    sound: {
        volume: 1.0,
    },


}


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
        "start": "#fff191",
        "end": "#d60d0d"
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
    "emitterLifetime": -1,
    "maxParticles": 1000,
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






let emitterOptions_rain = { // 700 in 1 second
    "alpha": {
        "start": 0.5,
        "end": 0.5
    },
    "scale": {
        "start": 0.1,
        "end": 0.1,
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

let emitterOptions_rain2 = { // 700 in 1 second
    "alpha": {
        "start": 0.5,
        "end": 0.5
    },
    "scale": {
        "start": 0.1,
        "end": 0.1,
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
        "max": 0.4
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