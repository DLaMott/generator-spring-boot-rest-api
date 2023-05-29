'use strict';
const BaseGenerator = require('./base-generator');
const constants = require('./constants');
const prompts = require('./prompts');
const path = require('path');
const {version} = require("chai");

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        this.logSuccess('Generating SpringBoot Application')
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.configOptions.appName));
        this.config.set(this.configOptions);
        Object.assign(this.configOptions, constants);
        this.configOptions.formatCode = this.options.formatCode !== false
    }

    writing() {

        this._copyDynamicConfiguration();
        this._copyDynamicApp(this.configOptions);
        this._renameGitIgnore();
        if(this.configOptions.generateSampleApp){
            this._copySampleApp(this.configOptions);
        }
        this.config.set(constants.versionName, version)
    }

    install(){
        this._copyStaticConfiguration();
    }

    end() {
        if(this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions);
        }
        this._printGenerationSummary(this.configOptions);
    }

    _printGenerationSummary(configOptions) {
        this.logError("==========================================");
        this.logSuccess("Your application is generated successfully");
        this.logSuccess(`  cd ${configOptions.appName}`);
        this.logSuccess("  > ./gradlew bootRun");
        this.logError("==========================================");
    }

    _copyStaticConfiguration(){
        this.fs.copy(
            this.templatePath(constants.staticDir),
            this.destinationPath(),
            {globalOptions: {dot: true}}
        )
    }

    _copyDynamicConfiguration() {
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/config"),
            this.destinationPath(),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _copyDynamicApp(configOptions){
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/app/Application.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/" + configOptions.appName + "Application.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/app/application.properties"),
            this.destinationPath(
                'src/main/resources/application.properties'
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _renameGitIgnore(){
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/rename/_gitignore"),
            this.destinationPath(
                '.gitignore'
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _copySampleApp(configOptions){
        this.fs.copyTpl(
            this.templatePath("sample/EchoController.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/endpoint/EchoController.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/EchoControllerTest.java"),
            this.destinationPath(
                'src/test/java/' + configOptions.packageFolder + "/endpoint/EchoControllerTest.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/logback-spring.xml"),
            this.destinationPath(
                "src/main/resources/logback-spring.xml"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }
};