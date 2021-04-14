import express from 'express';
import { success } from '#lib/logger';
import { commands } from '#handlers/command';
import cors from 'cors';

const app = express();

//app.use(express.static(process.cwd() + '/website'));

app.use(cors());
app.get('/commands', async (req, res) => {
    const cmds = await commands;
    /*let _list: any[] = [];

	cmds.forEach(cmd => {
		_list.push({
			name: cmd.name,
			help: cmd.help
		})
	});

	const list = {
		commands: _list
	}*/

    const c = cmds.get('ping');

    res.json(JSON.stringify(c));
});

export const start = (port: number): void => {
    app.listen(port, () => {
        success('server started: http://0.0.0.0:' + String(port) + '/');
    });
};
