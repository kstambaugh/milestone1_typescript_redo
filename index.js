const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.position = {
            x: 50,
            y: 50
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 20
        this.height = 20
        this.speed = 4
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
}


class Boundry {
    static width = 30
    static height = 30
    constructor({ position }) {
        this.position = position;
        this.width = 30;
        this.height = 30;
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

class Door {
    static width = 30
    static height = 30
    constructor({ position },) {
        this.position = position
        this.width = 30;
        this.height = 30;
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

const map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '*', '*', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '*', '*', '-', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '*', '*', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',]
]
const boundries = []
const doors = []

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundries.push(
                    new Boundry({
                        position: {
                            x: Boundry.width * j,
                            y: Boundry.height * i
                        }
                    }))
                break;
            case '*':
                doors.push(
                    new Door({
                        position: {
                            x: Door.width * j,
                            y: Door.height * i,

                        }
                    }))
                break;
        }
    })
})




const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

let lastKey = ''

//loops the animation frame to allow continuous changes to object states
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    boundries.forEach(boundry => {
        boundry.draw()

        if (player.position.y + player.velocity.y <= boundry.position.y + boundry.height &&
            player.position.y + player.velocity.y + player.height >= boundry.position.y &&
            player.position.x + player.velocity.x + player.width >= boundry.position.x &&
            player.position.x + player.velocity.x <= boundry.position.x + boundry.width
        ) {
            player.velocity.x = 0
            player.velocity.y = 0


        }
    })
    doors.forEach(door => {
        door.draw()
    })

    player.update()
    player.velocity.x = 0
    player.velocity.y = 0


    if (keys.right.pressed && lastKey === 'd') {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && lastKey === 'a') {
        player.velocity.x = -player.speed;
    } else if (keys.up.pressed && lastKey === 'w') {
        player.velocity.y = -player.speed;
    } else if (keys.down.pressed && lastKey === 's') {
        player.velocity.y = player.speed;
    } else {
        player.velocity.x = 0, player.velocity.y = 0
    }
}

animate()


//event listeners for keyboard
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.up.pressed = true;
            lastKey = 'w'
            break;
        case 'a':
            keys.left.pressed = true;
            lastKey = 'a'
            break;
        case 's':
            keys.down.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.right.pressed = true;
            lastKey = 'd'
            break;
    }
})
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.up.pressed = false;
            break;
        case 'a':
            keys.left.pressed = false;
            break;
        case 's':
            keys.down.pressed = false;
            break;
        case 'd':
            keys.right.pressed = false;
            break;
    }
})