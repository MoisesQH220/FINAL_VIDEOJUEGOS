var nave;
var balas;
var tiempoEntreBalas = 400;
var tiempo = 0;
var malos;
var timer;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var explosion;
var gameOver;

var Juego3={
	preload: function () {
		juego.load.image('nave','img/nave.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('malo','img/calavera.png');
		juego.load.image('bg3','img/bg3.jpg');
		juego.load.audio('explosion', 'audio/explosion.wav')
		juego.load.audio('gameOver', 'audio/game_over.wav')
		juego.load.audio('cancion', 'audio/cancion.wav')
	},

	create: function(){
		//BASE
		fondojuego = juego.add.tileSprite(0,0,400,540,'bg3');
		juego.physics.startSystem(Phaser.Physics.ARCADE);

		//AUDIO
		explosion = juego.add.audio('explosion');
		gameOver = juego.add.audio('gameOver');
		cancion = juego.add.audio('cancion');


		//NAVE
		nave = juego.add.sprite(juego.width/2, 485, 'nave');
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave, true);

		balas = juego.add.group();
		balas.enableBody = true;
		balas.setBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(50, 'laser');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 0.5);
		balas.setAll('checkWorldBounds', true);
		balas.setAll('outOfBoundsKill', true);

		malos = juego.add.group();
		malos.enableBody = true;
		malos.setBodyType = Phaser.Physics.ARCADE;
		malos.createMultiple(30, 'malo');
		malos.setAll('anchor.x', 0.5);
		malos.setAll('anchor.y', 0.5);
		malos.setAll('checkWorldBounds', true);
		malos.setAll('outOfBoundsKill', true);

		timer = juego.time.events.loop(2000, this.crearEnemigo, this);

		puntos = 0;
		juego.add.text(20, 20, "Puntos:", {font: "14px Arial", fill: "#FFF"});
		txtPuntos = juego.add.text(80, 20, "0", {font: "14px Arial", fill: "#FFF"});

		vidas = 2;
		juego.add.text(310, 20, "Vidas:", {font: "14px Arial", fill: "#FFF"});
		txtVidas = juego.add.text(360, 20, "2", {font: "14px Arial", fill: "#FFF"});
	},

	update: function(){
		fondojuego.tilePosition.y += 1;
		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;

		if (juego.input.activePointer.isDown)
		{
			this.disparar();
		}

		//Agregando colisión		
		juego.physics.arcade.overlap(balas,malos,this.colision,null,this);

		//Contador de vidas
		malos.forEachAlive(function(m){
			if(m.position.y > 520 && m.position.y < 521)
			{
				vidas -= 1;
				txtVidas.text = vidas;
			}
		});

		if (puntos == 10)
		{
			juego.state.start('Juego4');
		}


		if (vidas == 0)
		{
			gameOver.play();
			juego.state.start('Terminado');
		}

	},

	disparar: function(){
		if(juego.time.now > tiempo && balas.countDead() > 0)
		{
			tiempo = juego.time.now + tiempoEntreBalas;
			var bala = balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x, nave.y);
			bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;
			juego.physics.arcade.moveToPointer(bala, 200);
		}
	},

	crearEnemigo: function(){
		var enem = malos.getFirstDead();
		var num = Math.floor(Math.random()*10 + 1)
		enem.reset(num * 38, 0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y = 150;
		enem.checkWorldBounds = true;
		enem.outOfBoundsKill = true;
	},

	colision: function(b, m){
		b.kill();
		m.kill();
		puntos++;
		txtPuntos.text = puntos;
		explosion.play();
	}


};