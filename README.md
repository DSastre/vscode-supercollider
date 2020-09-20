# SuperCollider Extension for VS Code

[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/jatinchowdhury18/vscode-supercollider/master/LICENSE.md)

vscode-supercollider is a [SuperCollider](https://supercollider.github.io/) 
extension for your
[Visual Studio Code](https://code.visualstudio.com/).
The extension currently supports text highlighting and
running in the VS Code terminal. For this extension to work
properly, you must have SuperCollider already installed.

Disclaimer: This extension has only been tested on Windows.

## Features
 - Syntax highlighting
 - Running SuperCollider from the VS Code terminal

## Instructions
1. Install the vscode-supercollider extension in VS Code.

2. Install SuperCollider from the
[SuperCollider website](https://supercollider.github.io/).

3. If your path to `sclang` does not correspond to the default values you can change it in `Preferences > Settings > Extensions > SuperCollider`.

Default values:
  - Windows: `"C:\\Program Files\\SuperCollider-3.9.3\\sclang.exe\"`
  - MacOS: `"Applications/SuperCollider/SuperCollider.app/Contents/MacOS/sclang"`

4. Open a SuperCollider file (`.scd`). To run use
`Ctrl + Shift + b`. Once your SuperCollider script
is running you can kill it with `Ctrl + .`

5. N.B: Since SuperCollider will run code sequentially
without waiting for the previous command to finish
executing. Make sure any code requring the server is wrapped
as follows:
```C
s.waitForBoot{
  //Code here
}
```

## Future Improvements
  - Improved text highlighting
  - Auto-complete
  - Evaluating individual lines/blocks of code

## License
vscode-supercollider is licensed under the
[MIT License](https://opensource.org/licenses/MIT).
