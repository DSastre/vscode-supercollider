const vscode = require('vscode');
const path = require('path');
const platformDetect = require('platform-detect');

function detectOS() {
    var result = null;
    result = platformDetect.macos ? 'macos' : result;
    result = platformDetect.linux ? 'linux' : result;
    result = platformDetect.windows ? 'windows' : result;

    return result;
}

let _activeTerminal = null;
vscode.window.onDidCloseTerminal((terminal) => {
    if (terminal.name === 'SuperCollider') {
        if (!terminal.tckDisposed) {
            disposeTerminal();
        }
    }
});

function createTerminal() {
    _activeTerminal = vscode.window.createTerminal('SuperCollider');
    return _activeTerminal;
}

function disposeTerminal() {
    _activeTerminal.tckDisposed = true;
    _activeTerminal.dispose();
    _activeTerminal = null;
}

function getTerminal() {
    if (!_activeTerminal) {
        createTerminal();
    }

    return _activeTerminal;
}
// END TERMINAL

function resolve(editor, command) {
    const scPath = vscode.workspace.getConfiguration().get('supercollider.sclangCmd');
    return command
        .replace(/\${file}/g, `${editor.document.fileName}`)
        .replace(/\${sclangCmd}/g, scPath)
}

function run(command) {
    const terminal = getTerminal();

    terminal.show(true);

    vscode.commands.executeCommand('workbench.action.terminal.scrollToBottom');
    terminal.sendText(command, true);
}

function warn(msg) {
    console.log('supercollider.execInTerminal: ', msg)
}

function handleInput(editor) {
    vscode.workspace.saveAll(false);
    let command = "${sclangCmd} ${file}";
    const cmd = resolve(
        editor,
        command
    )

    run(cmd);
}

function activate(context) {

    const winPath = "& \"C:\\Program Files\\SuperCollider-3.9.3\\sclang.exe\"";
    const macPath = "/Applications/SuperCollider/SuperCollider.app/Contents/MacOS/sclang";

    let os = detectOS();

    switch (os) {
        case 'windows':
            vscode.workspace.getConfiguration().update('supercollider.sclangCmd', winPath);
            break;
        case 'macos':
            vscode.workspace.getConfiguration().update('supercollider.sclangCmd', macPath);
            break;
        default: 
            vscode.workspace.getConfiguration().update('supercollider.sclangCmd', winPath);
    }

    let execInTerminal = vscode.commands.registerCommand('supercollider.execInTerminal', () => {
        const editor = vscode.window.activeTextEditor
        if (!editor) {
            warn('no active editor');
            return;
        }

        handleInput(editor)
    });
    context.subscriptions.push(execInTerminal);

    let killTerminal = vscode.commands.registerCommand('supercollider.killTerminal', () => {
        if(_activeTerminal)
            disposeTerminal();
    });
    context.subscriptions.push(killTerminal);
}
exports.activate = activate;

function deactivate() {
    disposeTerminal();
}
exports.deactivate = deactivate;