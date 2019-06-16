# ROT.js, TypeScript, Webpack template from Roguelikes

## Build instructions

You will need to install node.js (instructions can be found on offical site: https://nodejs.org/en/).

One time command to install dependencies:

    npm install

Command to build the actual project:

    npx webpack

Or to keep webpack building the project every time something changes:

    npx webpack --watch

In order to serve the game locally, you can use http-server.

To install http-server:

    npm install --global http-server

To run the game:

    http-server [game-dir] -p 3456

It can be then open by navigating to `localhost:3456`.
