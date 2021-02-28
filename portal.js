var Portal ={
	preload: function () {
		juego.load.image('bg','img/bg.jpg');

	},

	create: function(){
		fondo = juego.add.tileSprite(0,0,400,540,'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
	},

	update: function(){

		if (juego.input.activePointer.isDown)
		{
			juego.state.start('Juego');
		}

	}

};