import { Client } from "ssh2";

export default (io) => {
    io.on('connection', (socket) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.shell((err, stream) => {
                if (err) {
                    logger.error(err);
                    socket.emit('output', `Error: ${err.message}`);
                    return;
                }

                // let lastCommand = '';
                socket.on('command', (command) => {
                    // lastCommand = command.trim();
                    stream.write(`${command}\n`);
                });

                stream.on('data', (data) => {
                    const output = data.toString();
                    // const filteredOutput = output.replace(lastCommand, '').trim();
                    socket.emit('output', output);
                })
                    .stderr.on('data', (data) => {
                        logger.error(data.toString());
                        socket.emit('output', `Error: ${data}`);
                    });

                stream.on('close', () => {
                    conn.end();
                });
            });
        }).connect({
            host: '20.197.55.106',
            port: 22,
            username: 'azureuser',
            password: 'D4debug@kloudstac'
        });

        socket.on('disconnect', () => {
            conn.end();
        });
    });
}

