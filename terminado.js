var Terminado ={
	preload: function () {
		juego.load.image('gob','img/gob.png');

	},

	create: function(){
		fondoJuegoOver = juego.add.tileSprite(0,0,400,540,'gob');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
	}

};