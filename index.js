const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height
        )
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y


    }
}

const player = new Player()
player.update()

//loops the animation frame to allow continuous changes to object states
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()


//event listeners for keyboard

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            console.log('up')
            break;
        case 'a':
            console.log('left')
            break;
        case 's':
            console.log('down')
            break;
        case 'd':
            console.log('right')
            break;
    }
})