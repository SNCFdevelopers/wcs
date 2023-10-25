# Web Components SNCF 

This project is the web component implementation of the [SNCF design system](https://designmetier-bootstrap.sncf.fr/).  
It is built using [stencil](https://github.com/ionic-team/stencil).

If you read this documentation on GitHub, only the development branch is updated at the moment. We use a GitLab project for WCS development and releases.

## Packages

Here is the list of published npm packages and their goal :

- `wcs-core` contains the web components compiled with StencilJS [![npm version](https://badge.fury.io/js/wcs-core.svg)](https://badge.fury.io/js/wcs-core)
- `wcs-angular` angular integrations (value accessors, ...)[![npm version](https://badge.fury.io/js/wcs-angular.svg)](https://badge.fury.io/js/wcs-angular)
- `wcs-formly` Angular Formly integration for WCS [![npm version](https://badge.fury.io/js/wcs-formly.svg)](https://badge.fury.io/js/wcs-formly)
- `wcs-react` React integration for WCS [![npm version](https://badge.fury.io/js/wcs-react.svg)](https://badge.fury.io/js/wcs-react)

## Roadmap

This project is still under heavy development therefore it is not yet released. It is being used internally as of now.

We plan to release first version in **december 2020**.

## Known issues

Select and select options size behavior, especially with multiple select. As of now we recommend setting a fixed width on the select to prevent resizing from happening. A stale branch `fix-select-options-size` contains some work to fix it, but it is abandonned for now.

## Documentation

There is documentation available at 
- https://wcs.dev.sncf/ for production (latest release)
- https://lemon-bush-001d04303-develop.westeurope.3.azurestaticapps.net/ for development environment
- https://lemon-bush-001d04303-review.westeurope.3.azurestaticapps.net/ for review environment

    
### Example usage

There is an example projects under `example` folder for angular.

Step to start the example project :
```shell
# wcs-core build
npm install
npm run build
# angular build (use --watch option to watch files)
cd angular
npm install
ng build --project wcs-angular
ng build --project wcs-formly
# start example
cd ../example
npm install
ng serve
```

If you have any question, don't hesitate to fill an issue !

### Install in your project

You can refer to the 
[official WCS documentation](https://sncf.gitlab.io/wcs/master/?path=/story/documentation-framework-integrations--page) 
to use wcs with Angular or React. For other frameworks, StencilJS offers many integrations with different JS frameworks.

You can refer to [their official documentation](https://stenciljs.com/docs/overview) to add WCS to your project.

After added wcs dependencies, you must add Avenir and icons font faces like so :

```css
@font-face {
    font-family: Avenir;
    src: url("your-custom-path/avenir-lighter.woff");
    font-weight: 300;
}

@font-face {
    font-family: Avenir;
    src: url("your-custom-path/avenir-book.woff");
    font-weight: 400;
}

@font-face {
    font-family: Avenir;
    src: url("your-custom-path/avenir-medium.woff");
    font-weight: 500;
}

@font-face {
    font-family: Avenir;
    src: url("your-custom-path/avenir-black.woff");
    font-weight: 900;
}
@font-face {
    font-family: "icons";
    src: url("your-custom-path/icons.eot?#iefix") format("embedded-opentype"),
    url("your-custom-path/icons.woff2") format("woff2"),
    url("your-custom-path/icons.woff") format("woff"),
    url("your-custom-path/icons.ttf") format("truetype"),
    url("your-custom-path/icons.svg#icons") format("svg");
}
```

## Contributing

### Bug, Feature request, etc...

Don't hesitate to fill in an issue and we'll discuss about it. If you want to contribute code, please fill in an issue first so we can synchronize.

### Dev requirements

- Minimum node version : 10.16

### Starting the project

```sh
git clone https://github.com/SNCFdevelopers/wcs.git
cd wcs
npm install
# To see all components
npm start
# To see only the component you're working on
npm start -- --filter select
```

### Test

The project uses stencil built-in facility for testing : https://stenciljs.com/docs/testing-overview.

We encourage doing TDD on functional components. To launch the tests suite simply launch :

```sh
npm run test:watch
# Or if you simply want to run them once
npm test
```

To launch a specific suite of tests you can simply launch
```sh
npm run test:e2e path_to_tests_file
# Example: you must be at the root of the project
npm run test:e2e src/components/tabs/tabs.e2e.ts
```

### Doing a release

Don't forget to update the changelog.

```sh
# Make sure you're on develop branch
git checkout develop
# Pull latest changes
git pull
# Build the project to make sure that all automatically generated files are up-to-date
npm run build
# Update the changelog by replacing the 'Unreleased' section with the released version number
# Commit your changes
git add . && git commit -m "chore: prepare next release" 
# Go on master
git checkout master
# Merge latest changes
git merge develop
# Do the release, we use semantic versioning for choosing release number
npm run update-version -- --version <major|minor|patch>
# Go on develop
git checkout develop
# Merge the release
git merge master
# Push the changes
git push
```
