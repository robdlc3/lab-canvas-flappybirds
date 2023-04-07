const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')

let gameOn = false

let obstacleArray = []

let animationId
let obstacleId

const background = new Image()
background.src = './images/bg.png'

const fabbyImg = new Image()
fabbyImg.src = './images/flappy.png'

const obstacleTopImg = new Image()
obstacleTopImg.src = './images/obstacle_top.png'

const obstacleBottomImg = new Image()
obstacleBottomImg.src = './images/obstacle_bottom.png'

const fabby = {
  x: 400,
  y: 200,
  width: 80,
  height: 56,
  speedX: 0,
  speedY: 0,
  gravity: .1,
  // gravitySpeed: 0,

  update() {
    if (this.y + this.height >= canvas.height) {
      this.y -= 20
    }
    if (this.y <= 0) {
      this.y += 20
    }
    if (this.speedY < 8) {
      this.speedY += this.gravity
    } else {
      this.speedY = this.speedY
    }
    this.y += this.speedY
    ctx.drawImage(fabbyImg, this.x, this.y, this.width, this.height)
  },

  newPostion(event) {

    switch (event.code) {
      case 'ArrowLeft':
        this.x -= 6

        break;
      case 'ArrowRight':
        this.x += 6

        break;
      case 'Space':
        if (this.speedY > -5) {
          this.speedY -= 1
        }
        console.log("space");
        break;
    }
  }

}


class Obstacle {

  constructor() {
    this.x = canvas.width;
    this.gap = 100;
    this.y = Math.random() * (canvas.height - this.gap);
    this.bottomY = this.y + this.gap

  }

  update() {
    this.x -= 2
  }

  draw() {
    // ctx.drawImage(obstacleTopImg, this.x, this.y, )
    ctx.drawImage(obstacleBottomImg, this.x, this.bottomY)
  }

}

function generateObstacles() {
  console.log("generating obstacle")
  obstacleArray.push(new Obstacle())
  console.log("Obstacles", obstacleArray)
}


function animationLoop() {

  ctx.clearRect(0, 0, 1200, 600)
  ctx.drawImage(background, 0, 0, 1200, 600)

  fabby.update()

  obstacleArray.forEach((obstacle, i, arr) => {
    if (obstacle.x < 0) {
      arr.splice(i, 1)
    }
    obstacle.update()
    obstacle.draw()
  })

}



function startGame() {

  gameOn = true

  animationId = setInterval(animationLoop, 16)
  obstacleId = setInterval(generateObstacles, 4000)

}


window.onload = function () {
  document.getElementById("start-button").onclick = function () {

    if (!gameOn) {

      let logo = document.getElementById('logo')
      logo.style.visibility = 'hidden'
      logo.style.height = '0px'

      let container = document.getElementById('game-board')
      container.style.visibility = 'visible'
      container.style.height = '600px'

      let gameBoard = document.getElementById('my-canvas')
      gameBoard.height = '600'
      gameBoard.width = '1200'

      startGame();

    }
  };

  document.addEventListener("keydown", (event) => {

    fabby.newPostion(event)

  });


};