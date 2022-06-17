#!/usr/bin/env node
const { exec } = require("child_process")
const fs = require("fs")
const inquirer = require("inquirer")
const prependFile = require('prepend-file');
const path = require('path');
const CreateRouteIndexSvelteJS = require("./lib/RouteIndexSvelteJS");
const CreateRouteEndpointIndexJS = require("./lib/RouteEndpointIndexJS");
const CreateRouteIndexSvelteTS = require("./lib/RouteIndexSvelteTS");
const CreateRouteEndpointIndexTS = require("./lib/RouteEndpointIndexTS");
const CreateRouteDataIndexJS = require("./lib/RouteDataIndexJS");
const CreateRouteDataIndexTS = require("./lib/RouteDataIndexTS");
const CreateRouteTitleComponentSvelteJS = require("./lib/RouteTitleComponentSvelteJS");
const CreateRouteTitleComponentSvelteTS = require("./lib/RouteTitleComponentSvelteTS");


// App Questions
const questions = [
    {
        type: "input",
        name: "routeName",
        message: "Route name (src/routes/<routename>)?",
        default: "sample-route"
    },
    {
        type: "list",
        name: "type",
        message: "Javascript or TypeScript?",
        default: "JS",
        choices: ['JS', 'TS'],
        filter(val) {
            return val
        },
    },
    {
        type: "list",
        name: "install",
        message: "Items to Install?",
        default: "ALL",
        choices: [
            'FULL',
            'Svelte File Only (routename.svelte)',
            'Directory + Svelte File (routename/index.svelte)',
            'Endpoint (routename/index.js or ts)',
            'Data (routename/data/index.js or ts)',
            'Components (routename/components)',
        ],
        filter(val) {
            return val
        },
    },
]

const makeDir = (path) => {
    fs.mkdir(path,
        {
            recursive: true
        }, (err) => {
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }

            console.log(`${path} created successfully`);
        });
}

const createFile = (file, data) => {
    if (!file) {
        fs.writeFile(file, data, (err) => {
            if (err) {
                console.log(`Could not save your file`);
            } else {
                console.log("Successfully create your file")
            }
        })

    } else {
        prependFile(file, data)
        console.log(`Successfully create your ${file}`)
    }
}

// Run query function
async function runQuery() {
    return inquirer.prompt(questions)
        .then((answers) => {
            const baseRoutePath = './src/routes'
            const routeName = answers.routeName
            const routeDir = `${baseRoutePath}/${routeName}`
            const componentsDir = `${baseRoutePath}/${routeName}/components`
            const dataDir = `${baseRoutePath}/${routeName}/data`

            const RouteIndexSvelteJS = require("./lib/RouteIndexSvelteJS")
            const RouteIndexSvelteTS = require("./lib/RouteIndexSvelteTS")
            const RouteEndpointIndexJS = require("./lib/RouteEndpointIndexJS")
            const RouteEndpointIndexTS = require("./lib/RouteEndpointIndexTS")
            const RouteDataIndexJS = require("./lib/RouteDataIndexJS")
            const RouteDataIndexTS = require("./lib/RouteDataIndexTS")

            const svelteJS = CreateRouteIndexSvelteJS.generate()
            const svelteTS = CreateRouteIndexSvelteTS.generate()
            const endpointJS = CreateRouteEndpointIndexJS.generate()
            const endpointTS = CreateRouteEndpointIndexTS.generate()
            const dataJS = CreateRouteDataIndexJS.generate()
            const dataTS = CreateRouteDataIndexTS.generate()
            const componentJS = CreateRouteTitleComponentSvelteJS.generate()
            const componentTS = CreateRouteTitleComponentSvelteTS.generate()

            exec("npm i")

            // FULL
            if (answers.type === "JS" && answers.install === 'FULL') {
                makeDir(routeDir)
                makeDir(dataDir)
                makeDir(componentsDir)
                createFile(`${routeDir}/index.svelte`, svelteJS)
                createFile(`${routeDir}/index.js`, endpointJS)
                createFile(`${dataDir}/index.js`, dataJS)
                createFile(`${componentsDir}/Title.svelte`, componentJS)
            }
            // Svelte File Only (routename.svelte)
            else if (answers.type === "JS" && answers.install === 'Svelte File Only (routename.svelte)') {
                makeDir(baseRoutePath)
                createFile(`${baseRoutePath}/${routeName}.svelte`, svelteJS)
            }
            // Directory + Svelte File (routename/index.svelte)
            else if (answers.type === "JS" && answers.install === 'Directory + Svelte File (routename/index.svelte)') {
                makeDir(routeDir)
                createFile(`${routeDir}/index.svelte`, svelteJS)
            }
            // Endpoint (routename/index.js or ts)
            else if (answers.type === "JS" && answers.install === 'Endpoint (routename/index.js or ts)') {
                makeDir(routeDir)
                createFile(`${routeDir}/index.js`, endpointJS)
            }
            // Data (routename/data/index.js or ts)
            else if (answers.type === "JS" && answers.install === 'Data (routename/data/index.js or ts)') {
                makeDir(routeDir)
                makeDir(dataDir)
                createFile(`${dataDir}/index.js`, dataJS)
            }

            // Components (routename/components)
            else if (answers.type === "JS" && answers.install === 'Components (routename/components)') {
                makeDir(routeDir)
                makeDir(componentsDir)
                createFile(`${componentsDir}/Title.svelte`, componentJS)
            }

            // FULL
            else if (answers.type === "TS" && answers.install === 'FULL') {
                makeDir(routeDir)
                makeDir(dataDir)
                makeDir(componentsDir)
                createFile(`${routeDir}/index.svelte`, svelteTS)
                createFile(`${routeDir}/index.ts`, endpointTS)
                createFile(`${dataDir}/index.ts`, dataTS)
                createFile(`${componentsDir}/Title.svelte`, componentTS)
            }
            // Svelte File Only (routename.svelte)
            else if (answers.type === "TS" && answers.install === 'Svelte File Only (routename.svelte)') {
                makeDir(baseRoutePath)
                createFile(`${baseRoutePath}/${routeName}.svelte`, svelteTS)
            }
            // Directory + Svelte File (routename/index.svelte)
            else if (answers.type === "TS" && answers.install === 'Directory + Svelte File (routename/index.svelte)') {
                makeDir(routeDir)
                createFile(`${routeDir}/index.svelte`, svelteTS)
            }
            // Endpoint (routename/index.js or ts)
            else if (answers.type === "TS" && answers.install === 'Endpoint (routename/index.js or ts)') {
                makeDir(routeDir)
                createFile(`${routeDir}/index.ts`, endpointTS)
            }
            // Data (routename/data/index.js or ts)
            else if (answers.type === "TS" && answers.install === 'Data (routename/data/index.js or ts)') {
                makeDir(routeDir)
                makeDir(dataDir)
                createFile(`${dataDir}/index.ts`, dataTS)
            }

            // Components (routename/components)
            else if (answers.type === "TS" && answers.install === 'Components (routename/components)') {
                makeDir(routeDir)
                makeDir(componentsDir)
                createFile(`${componentsDir}/Title.svelte`, componentTS)
            }
        })
        .catch((error) => { console.log("error: ", error); })
}
runQuery()
