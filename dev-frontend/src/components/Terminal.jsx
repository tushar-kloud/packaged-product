import { useEffect, useRef } from "react";
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { socket } from '../utils/socket'

const XtermTerminal = () => {
    const terminalRef = useRef(null);
    const inputBuffer = useRef('');

    useEffect(() => {
        const terminal = new Terminal();
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalRef.current);
        fitAddon.fit();

        const handle_Terminal_Connect = () => console.log('Connected to server');
        const handle_Terminal_Disconnect = () => console.log('Disconnected from server');
        const handle_Terminal_Output = (data) => terminal.write(data);


        socket.on("connect", handle_Terminal_Connect);
        socket.on('disconnect', handle_Terminal_Disconnect);
        socket.on('output', (data) => {
            terminal.write(data)

            // Use regular expression to remove the command part
            // const output = data.replace(/^[^\n]*\n/, '');
            // terminal.write(output);
        });


        terminal.onData((data) => {
            if (data === '\r') {
                terminal.write('\r\n');
                socket.emit('command', inputBuffer.current);
                inputBuffer.current = '';
            }
            else if (data === '\u007F') {
                // User pressed Backspace
                if (inputBuffer.current.length > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, -1);
                    terminal.write('\b \b');
                }
            }
            else {
                inputBuffer.current += data;
                terminal.write(data);
            }
        });
        return () => {
            socket.off('connect', handle_Terminal_Connect);
            socket.off('disconnect', handle_Terminal_Disconnect);
            socket.off('output', handle_Terminal_Output);
            terminal.dispose();
        };
    }, []);
    return (
        <div ref={terminalRef} className="terminal-container"></div>
    )
}

export default XtermTerminal