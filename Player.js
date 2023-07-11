/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el jugador
     */
    constructor (game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;
        this.lives = INITIAL_LIVES;
        super(game, width, height, x, y, speed, myImage, myImageDead,this.lives);
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update () {
        if (!this.dead) {
            switch (this.game.keyPressed) {
            case KEY_LEFT:
                if (this.x > this.speed) {
                    this.x -= this.speed;
                }
                break;
            case KEY_RIGHT:
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                }
                break;
            case KEY_SHOOT:
                this.game.shoot(this);
                break;
            }
        }
    }

    /**
     * Mata al jugador
     */
    collide() {
        if (!this.dead) {
            this.lives -= 1; // Restar una vida

            if (this.lives > 0) {
                // El jugador aún tiene vidas restantes

                setTimeout(() => {
                    this.image.src = this.myImage; // Restaurar la imagen original
                    this.dead = false; // El jugador vuelve a estar vivo
                }, 2000);

                super.collide(); // Llama al método collide de la superclase

            } else {
                // El jugador no tiene vidas restantes

                setTimeout(() => {
                    this.game.endGame();
                }, 2000);

                super.collide(); // Llama al método collide de la superclase
            }
        }
        document.getElementById("livesli").innerHTML = `Lives: ${this.lives}`;
    }

}