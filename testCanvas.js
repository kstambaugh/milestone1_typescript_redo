const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let keys = {};
window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
    e.preventDefault();
});
window.addEventListener('keyup', function (e) {
    delete keys[e.key];
});

class Character {
    constructor(color, height, width, x, y) {
        this.color = color;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.speed = 5
    }
}
let player = new Character('green', 20, 30, 5, 5);


function input(player) {
    if ('ArrowLeft' in keys) {
        if (player.x - player.speed > 0) {
            player.x -= player.speed;
        }
        player.direction = 'left';
    }
    if ('ArrowRight' in keys) {
        if (player.x + player.width + player.speed < canvas.width) {
            player.x += player.speed;
        } player.direction = 'right';
    }
    if ('ArrowUp' in keys) {
        if (player.y - player.speed > 0) {
            player.y -= player.speed;
        } player.direction = 'up';
    }
    if ('ArrowDown' in keys) {
        if (player.y + player.height + player.speed < canvas.height) {
            player.y += player.speed;
        }
        player.direction = 'down';
    }
}
function drawBox(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
}
function update() {
    input(player);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBox(player);
}

function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop);
}
loop();









