const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 300);
const CANVAS_HEIGHT = (canvas.height = 300);
let gameFrame = 0;
const staggerFrames = 5;

class Dog {
  static animationStates = [
    {name: 'idle', frames: 7},
    {name: 'jump', frames: 7},
    {name: 'fall', frames: 7},
    {name: 'run', frames: 9},
    {name: 'dizzy', frames: 11},
    {name: 'sit', frames: 5},
    {name: 'roll', frames: 7},
    {name: 'bite', frames: 7},
    {name: 'ko', frames: 12},
    {name: 'get_hit', frames: 4},
  ];

  constructor() {
    this.state = 'idle';
    this.scale = 0.25;
    this.image = {
      element: new Image(),
      width: 575,
      height: 523,
    };
    this.image.element.src = 'shadow_dog.png';

    this.animations = [];

    this.init();

    this.maxFrame = this.animations[this.state].loc.length;
    this.position = 0;
    this.frame = {
      x: 0,
      y: 0,
    };

    this.x = CANVAS_WIDTH * this.scale;
    this.y = CANVAS_HEIGHT * this.scale;
    this.width = this.image.width * this.scale;
    this.height = this.image.height * this.scale;
  }

  init() {
    // reset sprite animations
    for (let i = 0; i < Dog.animationStates.length; i++) {
      let frames = {
        loc: [],
      };

      for (let j = 0; j < Dog.animationStates[i].frames; j++) {
        let positionX = j * this.image.width;
        let positionY = i * this.image.height;
        frames.loc.push({x: positionX, y: positionY});
      }

      this.animations[Dog.animationStates[i].name] = frames;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image.element,
      this.frame.x,
      this.frame.y,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  updateAnimation = (gameFrame) => {
    this.position = Math.floor(gameFrame / staggerFrames) % this.maxFrame;
    this.frame = {
      x: this.animations[this.state].loc[this.position].x,
      y: this.animations[this.state].loc[this.position].y,
    };
  };

  updateState(num) {
    num = parseInt(num);
    this.state = Dog.animationStates[num].name;
    this.maxFrame = Dog.animationStates[num].frames;

    document.getElementById('stateDisplay').textContent = this.state;
  }
}
const dog = new Dog();

function controller(e) {
  const key = e.key;

  switch (key) {
    case '0':
      dog.updateState(key);
      break;
    case '1':
      dog.updateState(key);
      break;
    case '2':
      dog.updateState(key);
      break;
    case '3':
      dog.updateState(key);
      break;
    case '4':
      dog.updateState(key);
      break;
    case '5':
      dog.updateState(key);
      break;
    case '6':
      dog.updateState(key);
      break;
    case '7':
      dog.updateState(key);
      break;
    case '8':
      dog.updateState(key);
      break;
    case '9':
      dog.updateState(key);
      break;

    default:
      dog.updateState(0);
      break;
  }
}

window.addEventListener('keydown', (e) => controller(e));

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  dog.updateAnimation(gameFrame);
  dog.draw(ctx);

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
