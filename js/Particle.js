function getTimeSecs(t) {
    return t / 1000;
}

class Particle {

    x = 0;
    y = 0;
    radius = 0;
    speed = 0;

    vx = 0;
    vy = 0;
    lifetime = 1;

    fillColor = [255, 255, 255, 1];

    // physics
    gravity = 1;

    //  control
    startTime = new Date().getTime();

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    update() {
        let moveX = this.vx * this.speed;
        let moveY = this.vy * this.speed;
        let timePower = Math.pow( getTimeSecs( this.getAliveTime() ), 2 );

        this.x += moveX;
        // this.x += newX + ( this.gravity * timePower ); // TODO: Gravity direction
        this.y += moveY + ( ( this.gravity * timePower ) / 2 );
    }

    getOpacityFactor() {
        let halfTime = this.lifetime / 2;
        let aliveTime = this.getAliveTime() / 1000;
        
        if( aliveTime <= halfTime )
            return aliveTime / halfTime;
            
        return ( this.lifetime - aliveTime ) / halfTime;
    }

    getAliveTime() {
        return new Date().getTime() - this.startTime;
    }

    getFillStyle() {
        let opacity = this.fillColor[3] * this.getOpacityFactor();
        let fillStyle = `rgba(${this.fillColor[0]}, ${this.fillColor[1]}, ${this.fillColor[2]}, ${opacity})`;

        return fillStyle;
    }

    getIsAlive() {
        let deltaTimeSecs = getTimeSecs( this.getAliveTime() );
        return deltaTimeSecs <= this.lifetime
    }

}

class ParticleController {
    
    //  setting
    boxX = 0;
    boxY = 0;
    birthRate = 0; // particle per second
    lifetime = 1;

    offsetX = 0;
    offsetY = 0;

    //  particle
    speed = 5;
    particleRadius = 10;
    fillColor = [255, 255, 255, 1];
    randomSize = 0; // 0-1

    //  physics
    gravity = 1;

    //  control
    latestCreateParticleTime = 0;
    particles = [];
    process = null;

    constructor(boxX, boxY) {
        this.boxX = boxX;
        this.boxY = boxY;
    }

    setOffsetX(offsetX) {
        this.offsetX = offsetX;
    }

    getRandomBoxX() {
        return Math.floor( Math.random() * ( this.boxX + this.offsetX ) );
    }

    getRandomBoxY() {
        return Math.floor( Math.random() * ( this.boxY + this.offsetY ) );
    }

    getCenterX() {
        return Math.floor( ( this.boxX / 2 ) + this.offsetX );
    }

    getCenterY() {
        return Math.floor( ( this.boxY / 2 ) + this.offsetY );
    }

    getRespawnTimeSecs() {
        return 1 / 100;
    }

    getRandomSize() {
        
        let randomVal = ( ( Math.random() * 2 ) - 1 ) * this.randomSize;
        return this.particleRadius + ( this.particleRadius * randomVal )

    }

    createNewParticle() {
        let posX = this.getRandomBoxX();
        let posY = this.getRandomBoxY();

        let particle = new Particle(posX, posY, this.particleRadius);
        particle.x = posX;
        particle.y = posY;
        particle.radius = this.getRandomSize();
        particle.lifetime = this.lifetime;
        particle.fillColor = this.fillColor;
        particle.gravity = this.gravity;

        this.particles.push(particle);

        this.latestCreateParticleTime = new Date().getTime();
    }
    
    start() {
        this.process = setInterval(this.update.bind(this), 30);
    }

    stop() {
        clearInterval(this.process);
        this.process = null;
    }

    update() {
        this.particles = this.particles.filter( particle => particle.getIsAlive() );

        let currTime = new Date().getTime();
        let deltaTimeSecs = getTimeSecs( new Date().getTime() - this.latestCreateParticleTime );

        if( deltaTimeSecs > this.getRespawnTimeSecs() ) {
            this.createNewParticle();
        }

        for( let i = 0; i < this.particles.length; ++i ) {
            this.particles[i].update();
        }
    }

}

class ParticleDrawer {

    canvas = null

    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(particle) {
        let context = this.canvas.getContext("2d");
        context.fillStyle = particle.getFillStyle();
        context.beginPath();
        context.arc( particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}

class ParticleControllerDrawer {

    particleController = null;
    canvas = null;
    particleDrawer = null;

    process = null;

    constructor(canvas, particleController) {
        this.canvas = canvas;
        this.particleController = particleController;
        this.particleDrawer = new ParticleDrawer(this.canvas);
    }

    redraw() {
        if( this.canvas === undefined || this.canvas == null )
            return;

        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let particles = this.particleController.particles;

        for( let i = 0; i < particles.length; ++i ) {
            this.particleDrawer.draw( particles[i] );
        }
    }

    start() {
        this.process = setInterval(this.redraw.bind(this), 30);
        this.particleController.start();
    }

    stop() {
        clearInterval(this.process);
        this.process = null;
        this.particleController.stop();
    }

}