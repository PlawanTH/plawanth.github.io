let particleController = new ParticleController(bgCanvas.width + 500, bgCanvas.height + 500);

//  setting
particleController.birthRate = 30;
particleController.lifetime = 5;

particleController.offsetX = 250;
particleController.offsetY = 250;

//  particle
particleController.speed = 1;
particleController.particleRadius = 20;
particleController.randomSize = 5 / particleController.particleRadius;
particleController.fillColor = [34, 219, 255, 0.1];

//  physics
particleController.gravity = -0.5;

let particleControllerDrawer = new ParticleControllerDrawer(bgCanvas, particleController);
particleControllerDrawer.start();