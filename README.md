# Generator-Spring-Boot
A Yeoman generator for generating a Spring-Boot Microservice

## Features

* Quick Spring-Boot Project setup
* JUnit
* Localstack configuration
* ApplicationName selection
* ContextRoot selection
* ProjectPath selection


This will generate:

* Service
* Spring MVC REST Controller with CRUD operations
* Unit and Integration Tests for REST Controller

## Local Development Setup

```
> git clone https://github.com/DLaMott/generator-spring-boot-rest-api.git
> cd generator-spring-boot
> npm install -g yo
> npm install 
> npm link
> yo generator-spring-boot
```

## Don't want the code?

```
> npm install -g yo
> npm install -g generator-spring-boot-rest-api
> yo generator-spring-boot-rest-api
```

## Note
* Tested using JDK 17