const vscode = require('vscode');
const path = require('path');
const platformDetect = require('platform-detect');

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
    let execInTerminal = vscode.commands.registerCommand('supercollider.execInTerminal', () => {
        const editor = vscode.window.activeTextEditor
        if (!editor) {
            warn('no active editor');
            return;
        }

        handleInput(editor)
    });
    context.subscriptions.push(execInTerminal);
    //vscode.window.showInformationMessage('SuperCollider Server is starting...');

    var os = null;
    os = platformDetect.macos ? 'macos' : os;
    os = platformDetect.linux ? 'linux' : os;
    os = platformDetect.windows ? 'windows' : os;

    var message = '';
    switch (os) {
        case 'macos': {
            message = 'You are using MacOS.';
            break;
        }
        case 'windows': {
            message = 'You are using Windows.';
            break;
        }
        case 'linux': {
            message = 'You are using Linux.';
            break;
        }
        default: {
            message = 'Operating System could not be detected.';
        }
    }

    vscode.window.showInformationMessage(message);

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