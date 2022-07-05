const log = console.log
const welcomePage = () => {
    let welcome = document.createElement('div');
    welcome.setAttribute('id', 'welcome');
    welcome.innerHTML = 'Welcome to The Labyrinth'
    document.body.append(welcome)
    let beginGame = document.createElement('button');
    beginGame.setAttribute('id', 'startbutton')
    beginGame.innerHTML = 'Ready to Escape?'
    welcome.append(beginGame)
    welcome.addEventListener('click', function () {
        welcome.remove()
        newGame()
    })
}

const gameEnd = (playerOutcome) => {
    document.getElementById('labyrinthStart').remove()
    let banner = document.createElement('div');
    banner.setAttribute('id', 'gameEnd');
    if (playerOutcome == 'winner') {

        banner.innerText = 'YOU HAVE ESCAPED THE LABYRINTH!'
    } else { banner.innerText = 'YOU HAVE FAILED TO ESCAPE!' }

    document.body.append(banner)
    let startAgain = document.createElement('button');
    startAgain.setAttribute('id', 'startAgain')
    startAgain.innerHTML = 'Try Again?'
    banner.append(startAgain)
    startAgain.addEventListener('click', function () {
        let newGameScreen = document.createElement('script')
        newGameScreen.setAttribute('src', 'welcomeScreen.js');
        banner.remove()
        document.body.append(newGameScreen)
        welcomePage()
    })
}

const newGame = () => {

    //create div to hold inventory, timer, and canvas
    newDiv = document.createElement('div')
    newDiv.setAttribute('id', 'labyrinthStart');
    //create inventory
    makeInventory = document.createElement('div');
    makeInventory.setAttribute('id', 'inventory');

    //create timer
    makeTimer = document.createElement('div');
    makeTimer.setAttribute('id', 'timer')


    //create canvas
    makeCanvas = document.createElement('canvas');
    makeCanvas.setAttribute('id', 'canvas');

    //create timer
    timerLable = document.createElement('span');
    timerLable.setAttribute('id', 'timer-label')
    timerLable.innerText = 'TIME REMAINING:'
    setTime = document.createElement('span');
    setTime.setAttribute('id', 'time-left');
    setTime.innerText = '00'

    //append div to body, then append inv, timer, canvas to dive
    document.body.append(newDiv);
    newDiv.append(makeInventory);
    newDiv.append(makeTimer)
    makeTimer.append(timerLable, setTime)
    newDiv.append(makeCanvas)

    //grabs html elements that we just created/ sizes canvas
    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');
    canvas.width = innerWidth + 55
    canvas.height = innerHeight - 55
    const inventory = document.getElementById('inventory');

    //this are all the classes used by game

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
            this.width = 16
            this.height = 16
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
        giveKey() {
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
        static width = 32
        static height = 32
        constructor({ position }) {
            this.position = position;
            this.width = 32;
            this.height = 32;
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
            this.width = 32;
            this.height = 32;
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
    class FinishLine {
        constructor({ position }) {
            this.position = position;
            this.width = 32;
            this.height = 32;
        }
        draw() {
            c.fillStyle = 'orange'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        update() {
            this.draw()
        }
    }

    //this creates the map used for the game and creates classes based on symbol found in the array of arrays in maps
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
        ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', 'f', 'f', 'f', 'f', 'f', '-',],
        ['-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', '-', ' ', ' ', '-', '-', '-', '-', '*', '-', '-', '-', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', 'f', 'f', 'f', 'f', 'f', '-',],
        ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', 'k', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', ' ', '-', 'f', 'f', 'f', 'f', 'f', '-',],
        ['-', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', 'k', '-', 'f', 'f', 'f', 'f', 'f', '-',],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',]
    ]
    const boundries = []
    const doors = []
    const hiddenkeys = []
    const finisharea = []
    let padLock = 0
    let playersKeys = 0
    const lock = ['heart', 'diamond', 'club', 'spade']
    const myKeys = ['heart', 'diamond', 'spade', 'club']

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
                            keyShape: myKeys[playersKeys - 1]
                        }))
                    break;
                case 'f':
                    finisharea.push(
                        new FinishLine({
                            position: {
                                x: Boundry.width * j,
                                y: Boundry.height * i,
                            }
                        }))
                    break;
            }
        })
    })

    //this set the timer and runs only once the player first moves.  the functions returns true the first time its run and will not run again until the game restarts
    timeRemaining = 50
    let excecuteTimer = false;
    let myTimer = (() => {
        if (!excecuteTimer) {
            let countDown = setInterval(() => {
                if (timeRemaining - 1 >= 0) {
                    timeRemaining--
                    document.getElementById('time-left').innerText = timeRemaining
                } else {
                    clearInterval(countDown)
                    document.getElementById('time-left').innerText = 'GAME OVER';
                    gameEnd('loser');
                }
            }, 1000)
            return excecuteTimer = true
        }
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

    addEventListener('keydown', ({ key }) => {
        myTimer()
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

        hiddenkeys.forEach((hiddenkey, i) => {
            hiddenkey.draw()
            if (player.position.y + player.velocity.y <= hiddenkey.position.y + hiddenkey.height &&
                player.position.y + player.velocity.y + player.height >= hiddenkey.position.y &&
                player.position.x + player.velocity.x + player.width >= hiddenkey.position.x &&
                player.position.x + player.velocity.x <= hiddenkey.position.x + hiddenkey.width
            ) {
                hiddenkey.addToInventory()
                hiddenkey.giveKey()
                hiddenkeys.splice(i, 1)
            }

        })
        finisharea.forEach(block => {
            block.draw()
            if (player.position.y + player.velocity.y <= block.position.y + block.height &&
                player.position.y + player.velocity.y + player.height >= block.position.y &&
                player.position.x + player.velocity.x + player.width >= block.position.x &&
                player.position.x + player.velocity.x <= block.position.x + block.width
            ) {
                //you win function
                timeRemaining = 00
                document.getElementById('time-left').innerText = 'YOU WIN'
                let game = document.getElementById('labyrinthStart')
                game.parentNode.removeChild(game)
                gameEnd('winner')


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
}

welcomePage()