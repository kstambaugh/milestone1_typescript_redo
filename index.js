const startButton = document.getElementById('startButton')

const loadGame = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const screenDiv = document.getElementById('screen-div');
    screenDiv.append(canvas)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    startButton.style.display = 'none'
}

startButton.addEventListener('click', loadGame)