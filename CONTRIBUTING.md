# Contributing to WCS
We're looking for contributors in all way. If you're an user and have problems, questions ore recommendation feel free to fill an issue. 

If you want to contribute to the project, we'll be happy to welcome you, contact us and we'll see from there.

## Deployment environments and CI/CD

Documentation is available at 
- https://wcs.dev.sncf/ for production (latest release)
- https://lemon-bush-001d04303-develop.westeurope.3.azurestaticapps.net/ for development environment
- https://lemon-bush-001d04303-devreview.westeurope.3.azurestaticapps.net/ for developers review environment
- https://lemon-bush-001d04303-featurereview.westeurope.3.azurestaticapps.net/ for design, accessibility teams review environment

### Deploy a branch to a review environment

* Go to Gitlab
* CI/CD > Pipelines
* Blue Run pipeline button at top right
* Choose the desired branch
* Variable: enter dev-review or feature-review
* Run pipeline

*The pipeline run with 3 jobs: test, build and deploy-mr-tmp-env*

## Hacking on WCS
### StackBlitz 

For quick testing you can use these templates :
- WcsAngular + WcsFormly : https://stackblitz.com/edit/wcs-angular-template
- WcsReact : https://stackblitz.com/edit/wcs-react-template
- WcsCore only (Plain HTML) : https://stackblitz.com/edit/wcs-plain-html-template

While contributing through an issue, please link a forked StackBlitz that reproduces the bug.

### Tooling
For better productivity we recommend using the following tools:
- VScode with some extensions
    - TSlint
    - Stencil tools

### Installation
Clone this repository and install dependencies:

```bash
git clone https://gitlab.com/SCNF/wcs.git 
cd wcs-sandbox 
npm install
```

### Running the project
```bash
npm start
# For browser compatibility you'll probably need to use this one instead,
# although it is recommended you turn on needed flags in your browser for faster build.
npm start --es5
```

### Launching the test suite
```bash
npm test
# Or in watch mode
npm run test:watch
```

### Working on the merge request from a fork (as a maintainer)

First of all, you have to make sure that the person who created the fork allow commits from upstream members, see : https://docs.gitlab.com/ee/user/project/merge_requests/allow_collaboration.html#allow-commits-from-upstream-members

Then, it is possible to clone the pushed branch from the fork via origin (it is a Gitlab feature) : https://docs.gitlab.com/ee/user/project/merge_requests/reviews/index.html#checkout-merge-requests-locally-through-the-head-ref

> Example : `git fetch origin merge-requests/<id>/head:mr-origin-<id> && git checkout mr-origin-<id>`

Finally, if you want to push modifications (for example the result of a rebase) follow this  documentation: https://docs.gitlab.com/ee/user/project/merge_requests/allow_collaboration.html#push-to-the-fork-as-the-upstream-member

> Example : `git push https://gitlab.com/contributor-username/wcs local-branch:remote-branch` (add `-f` if it's a rebase).


### Doing a release

Don't forget to update the changelog and the StackBlitz templates version.

> ⚠️ If you're going to release a **major version**, you should update the wcs archive documentation (https://gitlab.com/SNCF/wcs-archive).  
> You must also update the version list in `.storybook/addons/versioning/register.js` to allow users to switch between versions on Storybook directly.
> ```gitexclude
> # Go on the latest release branch
> git checkout master
> # Run a build of the projet
> npm run build
> # Copy the storybook-static folder to the wcs-archive repository in a new corresponding folder for the current version
> # Commit and push the changes in the wcs-archive repository
> # Go back to the wcs repository
> # Revert all the change made during the build process
> git checkout .
> ```
> Now you can follow the steps below to release the new version.

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


## Resources

- https://www.joshmorony.com/understanding-jsx-for-stencil-js-applications/

### Design system

- https://developer.microsoft.com/en-us/fluentui#/controls/web
- https://www.carbondesignsystem.com/
- https://clarity.design/
- https://material.angular.io/components/categories
- https://mui.com/components/
- https://vaadin.com/docs/latest/ds/components
- https://design.baloise.dev/?path=/story/welcome--page&globals=framework:react
- https://ix.siemens.io/ - https://ix.siemens.io/docs/getting-started/
- https://github.com/freshworks/crayons
- https://component.gallery/

### Accessibility

- https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/

### HTML attributes vs. DOM properties
- https://stackoverflow.com/a/6004028 : explication simple
- https://jakearchibald.com/2024/attributes-vs-properties : explication détaillée

## Issues to track

- https://github.com/storybookjs/storybook/issues/15436 : pour la présence des private props dans storybook
- https://github.com/storybookjs/storybook/issues/18298 : pour l'upgrade de Storybook qui ne fonctionne pas avec npm v8+
