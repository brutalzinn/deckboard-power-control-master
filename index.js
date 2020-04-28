const { dialog } = require('electron');
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const { shutdown } = require('wintools');

class PowerControlExtension extends Extension {
	constructor() {
		super();
		this.name = 'Power Option';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.inputs = [
			{
				label: 'Controle de tesdsda',
				value: 'power-option',
				icon: 'power-off',
				color: '#34495e',
				input: [
					{
						label: 'Action',
						ref: 'powerAction',
						type: INPUT_METHOD.INPUT_SELECT,
						items: [
							{
								label: 'Shutdown',
								value: 'shutdown'
							},
							{
								label: 'Restart',
								value: 'restart'
							}
						]
					},
					{
						label: 'With Confirmation',
						ref: 'powerActionProcess',
						type: INPUT_METHOD.INPUT_FILE,
						value : ''
						
					}
				]
			}
		];
	}

	execute(action, {  powerAction, confirmation = true, powerActionProcess }) {
		log.info(`${action} ${powerAction}`);
		switch (action) {
			case 'power-option': {
				switch (powerAction) {
					case 'shutdown':
						if (confirmation)
							dialog.showMessageBox(
								null,
								{
									type: 'question',
									buttons: ['Cancelar', 'Sim'],
									defaultId: 0,
									title: 'Iniciar',
									message:
										'Você deseja iniciar o processo'
								},
								response => {
									if (response === 1) 
					doNothing(powerActionProcess);
				
									
								}
							);
						else 
							
						console.log('teste');
						break;
					case 'restart':
						if (confirmation)
							dialog.showMessageBox(
								null,
								{
									type: 'question',
									buttons: ['Cancelar', 'Sim'],
									defaultId: 0,
									title: 'Parar',
									message:
										'Você deseja matar o processo?'
								},
								response => {
									if (response === 1) shutdown.restart();
								}
							);
						else shutdown.restart();
						break;
					default:
						break;
				}
			}
			default:
				break;
		}
	}
	
	
doNothing(directory_path) {
 
		
		
		var exec = require('child_process').exec;
exec(directory_path, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }
})
		
	
}
	
	
	
	
	
}

module.exports = new PowerControlExtension();
