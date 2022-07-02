const log = console.log
const table = console.table

const inventory = document.getElementById('inventory')

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
        this.width = 15
        this.height = 15
        this.speed = 4
        this.doorKeys = {
            heart: false,
            club: false,
            diamond: false,
            spade: false,
        }
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

class Key {
    constructor({ position, srcImg, keyShape }) {
        this.position = position;
        this.width = 15;
        this.height = 15;
        this.srcImg = srcImg
        this.keyShape = keyShape
    }
    addToInventory() {
        //updates inventory with picture from asset folder
        let thisImage = 'assets/' + this.keyShape + '.png'
        let imgTag = document.createElement('img')
        imgTag.setAttribute('src', thisImage)
        imgTag.setAttribute('alt', this.keyShape)
        document.getElementById('inventory').append(imgTag);
    }
    //change player.doorKeys.(this key) to true
    giveGive() {
        player.doorKeys[this.keyShape] = true
    }
    draw() {
        c.fillStyle = 'purple'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

class Boundry {
    static width = 35
    static height = 35
    constructor({ position }) {
        this.position = position;
        this.width = 35;
        this.height = 35;
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
    constructor({ position, doorName },) {
        this.position = position
        this.width = 35;
        this.height = 35;
        this.doorName = doorName
    }
    hasProperKey() {
        let currentDoor = this.doorName
        return player.doorKeys[currentDoor] || console.log('no entry')

    }
    openDoor() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    doorLocked() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

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
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '*', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', 'k', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', 'k', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '*', '-', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '*', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', 'k', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', 'k', '-', ' ', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',]
]
const boundries = []
const doors = []
const hiddenkeys = []
let padLock = 0
let playersKeys = 0
const lock = ['heart', 'club', 'diamond', 'spade']





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
                padLock++
                doors.push(
                    new Door({
                        position: {
                            x: Boundry.width * j,
                            y: Boundry.height * i,
                        },
                        doorName: lock[padLock - 1]
                    }))
                break;
            case 'k':
                playersKeys++
                hiddenkeys.push(
                    new Key({
                        position: {
                            x: Boundry.width * j + Boundry.width / 2,
                            y: Boundry.height * i + Boundry.height / 2,
                        },
                        keyShape: lock[playersKeys - 1]
                    })
                )
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
log(player.doorKeys.heart)
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
        if (player.position.y + player.velocity.y <= door.position.y + door.height &&
            player.position.y + player.velocity.y + player.height >= door.position.y &&
            player.position.x + player.velocity.x + player.width >= door.position.x &&
            player.position.x + player.velocity.x <= door.position.x + door.width
        ) {
            if (!door.hasProperKey()) {
                player.velocity.x = 0
                player.velocity.y = 0
                door.doorLocked()
            } else door.openDoor()
        }
    })

    hiddenkeys.forEach(hiddenkey => {
        hiddenkey.draw()
        if (player.position.y + player.velocity.y <= hiddenkey.position.y + hiddenkey.height &&
            player.position.y + player.velocity.y + player.height >= hiddenkey.position.y &&
            player.position.x + player.velocity.x + player.width >= hiddenkey.position.x &&
            player.position.x + player.velocity.x <= hiddenkey.position.x + hiddenkey.width
        ) {
            hiddenkey.addToInventory()
            hiddenkeys.slice(hiddenkey)

        }

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

//this event listener will log true if you click on the player entity within canvas

addEventListener('click', (event) => {
    let mouseX = event.x
    let mouseY = event.y
    if (mouseX >= player.position.x && mouseX <= player.position.x + player.width &&
        mouseY >= player.position.y && mouseY <= player.position.y + player.height)
        console.log('true')
    else console.log('false')
})

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