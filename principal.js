window.PhaserGlobal = {
	disableWebAudio: true
};

var juego = new Phaser.Game(400, 540, Phaser.CANVAS, 'bloque_juego');

//Agregando los estados del juego
juego.state.add('Portal', Portal);
juego.state.add('Juego', Juego);
juego.state.add('Juego2', Juego2);
juego.state.add('Juego3', Juego3);
juego.state.add('Juego4', Juego4);
juego.state.add('Ganado', Ganado);
juego.state.add('Terminado', Terminado);

//Inicializamos juego en el estado Juego
juego.state.start('Portal');