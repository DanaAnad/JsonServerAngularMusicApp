
# MusicTop App

Used Angular features to replicate a song top behavior as follows:
- created a Song component which displays Song info (artist, name, date, votes, buttons);
- a SongTop component to display songs and handle their top positioning;
- created a Song interface to use across the app;
- used Json server for the song array;
- added separate scss styling to each components;

## Development server

- download or clone the repository.
- install Node JS, NPM and Angular CLI on your computer using yarn install or npm install command in shell.

Open your terminal of choice and navigate to the app folder. 
Run `json-server --watch db.json` to start the database server that holds the songs.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
