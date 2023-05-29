'use strict';
const path = require('path');
const yeoman = require('yeoman-environment')
const env = yeoman.createEnv();

env.lookup(() => {
        env.run('Springboot-generator',
            {
                "repoName": "sample-java-microservice",
                "description": "Cool",
                "projectVersion": "0.0.1",
                "contextRoot": "sample-java-microservice",
                "generateSampleApp": "true"
            },

            err => {
                if (err) {
                    console.log("ERROR: " + err)
                }
            }
        );
    });