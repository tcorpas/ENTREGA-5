/**
 * Jefe final del juego. Hereda de la clase Opponent.
 * @extends Opponent
 */

class Boss extends Opponent {
    constructor(game) {
      const height = BOSS_HEIGHT * game.width / 100;
      const width = BOSS_WIDTH * game.width / 100;
      const x = game.width / 2 - width / 2;
      const y = 0;
      const speed = BOSS_SPEED;
      const myImage = BOSS_PICTURE;
      const myImageDead = BOSS_PICTURE_DEAD;
  
      super(game, width, height, x, y, speed, myImage, myImageDead);
      this.direction = "R";
      this.shootInterval = null;
    }
  
    shoot() {
      if (!this.dead && !this.game.ended) {
        if (!this.game.paused) {
          this.game.shoot(this);
        }
      }
    }
  
    collide() {
      if (!this.dead) {
        this.lives -= 1;
  
        if (this.lives > 0) {
          setTimeout(() => {
            this.image.src = this.myImage;
            this.dead = false;
            this.startShooting(); // Reiniciar los disparos del jefe
          }, 2000);
  
          super.collide();
  
        } else {
          setTimeout(() => {
            this.game.endGame();
          }, 2000);
  
          super.collide();
        }
      }
    }
  
    startShooting() {
      this.shootInterval = setInterval(() => {
        this.shoot();
      }, BOSS_SHOOT_INTERVAL);
    }
  
    stopShooting() {
      clearInterval(this.shootInterval);
      this.shootInterval = null;
    }
  }
  