const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const component = (width, height, color, x, y) => {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx.fillStyle = color
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

component(10, 10, 'green', 20, 140)

