const initial_velocity = 0.025;
const velocity_increase = 0.00001;

export default class Ball {
    constructor(ballElm) {
        this.ballElm = ballElm;
        this.reset()
    }
    get x() {
        return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--x"));
    }
    set x(value) {
        this.ballElm.style.setProperty("--x",value)
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--y"));
    }
    set y(value) {
        this.ballElm.style.setProperty("--y", value)
    }
    rect() {
        return this.ballElm.getBoundingClientRect();
    }
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {x: 0};
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumberBetween(0 , 2*Math.PI);
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = initial_velocity;
    }
    update(d,paddleRects) {
        this.x += this.direction.x * this.velocity * d;
        this.y += this.direction.y * this.velocity * d;
        this.velocity += velocity_increase * d;
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (paddleRects.some(r => isCollection(r, rect))) {
            this.direction.x *= -1;
        }
    }
}
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}
function isCollection(rect1,rect2) {
    return rect1.left <= rect2.right && 
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top;
}