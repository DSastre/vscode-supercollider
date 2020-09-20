# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
  - Configuration is controlled by the VS Code configuration view and not by editing the JSON file directly anymore.

### Added
  - OS Recognition changes the command path to start sclang. Support of Windows and MacOS.


## [0.0.2] - 2019-05-19
### Changed
  - The `supercollider.scPath` setting has been replaced with the new `supercollider.sclangCmd`.
    For more information, see the latest [Instructions](https://github.com/jatinchowdhury18/vscode-supercollider#instructions).

### Security
  - Updated ``tar`` dependency to version 4.4.2 or greater.

## [0.0.1] - 2019-03-17
### Initial Release
