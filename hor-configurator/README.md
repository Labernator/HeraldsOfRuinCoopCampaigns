# Heralds of Ruin - Roster viewer and Pdf Generator

## Usage

1. Download and install Node.js: https://nodejs.org/en/

2. Run `execute.bat` (on first execution this will install some node modules so
   it might take a bit longer)

If you want to run node.js in a container (yes, you want to do that :), you can
use the `docker-compose.yml` file, in order to spin up a Docker container, build
the application (it's a multi stage Dockerfile) and serve it afterwards. The
container will expose port 5000 on localhost for that. To use docker-compose,
you need to [install](https://docs.docker.com/compose/install/) it first.

    $ docker-compose up [--build]


## Working with the configuration files

Choose one of the current rosters to view and download or upload your own roster.
If you want to upload your own roster, you need to create a JSON file that sticks to the warband interface.

You can find the warband interface definition here:
[Types definition](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/blob/master/hor-configurator/src/types.ts)

You can find the sample warband JSON files here:
[Folder with warband JSONs](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/tree/master/hor-configurator/src/data)

If you want to use other/new units you might need to add new weapons/rules etc. to the respective jsons. I will add stuff there over time.
