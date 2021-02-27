var Ganado ={
	preload: function () {
		juego.load.image('gwb','img/gwb.jpg');

	},

	create: function(){
		fondoJuegoOver = juego.add.tileSprite(0,0,400,540,'gwb');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
	}

};