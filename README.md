# Web Components SNCF 

This project is the web component implementation of the [SNCF design system](https://designmetier-bootstrap.sncf.fr/).  
It is built using [stencil](https://github.com/ionic-team/stencil).

If you read this documentation on Github, only the development branch is updated at the moment. We use a GitLab project for WCS development and releases.

## Roadmap

This project is still under heavy development therefore it is not yet released. It is being used internally as of now.

We plan to release first version in **december 2020**.

## Known issues

Select and select options size behavior, especially with multiple select. As of now we recommend setting a fixed width on the select to prevent resizing from happening. A stale branch `fix-select-options-size` contains some work to fix it, but it is abandonned for now.

## Documentation

There is documentation available at https://sncf.gitlab.io/wcs-ci/develop/. It is only available for the develop branch though as the project remains unreleased.

For a specific component you can also look under src/components/<the-component-you-want-the-doc-for>/README.md.
    
### Example usage

There is an example projects under `example` folder for angular.

If you have any question, don't hesitate to fill an issue !

### Install in your project

StencilJS offers many integrations with different JS frameworks.

You can refer to their official documentation to add WCS to your project : https://stenciljs.com/docs/overview

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

### Doing a release

```sh
# Make sure you're on develop branch
git checkout develop
# Pull latest changes
git pull
# Go on master
git checkout master
# Merge latest changes
git merge develop
# Do the release, we use semantic versioning for choosing release number
npm version <major|minor|patch>
# Go on develop
git checkout develop
# Merge the release
git merge master
# Push the changes
git push
```
