# Web Components SNCF *(Sandbox state)*

This is a sanbox project to investigate on the build pipeline, CI/CD, and different kind of testing.

It is built using stencil as a web component compiler, you can find the documentation [here](https://stenciljs.com/docs).

## Table of content
- [Table of content](#table-of-content)
- [What's to be done](#whats-to-be-done)
- [Why Stencil ?](#why-stencil)
  - [Seamless integration](#seamless-integration)
  - [Simple and familiar API](#simple-and-familiar-api)
  - [Lightweight](#lightweight)
- [Goal](#goal)
  - [Dumb components](#dumb-components)
  - [Smart components](#smart-components)
  - [Advantages](#advantages)
- [Getting Started](#getting-started)
  - [Tooling](#tooling)
  - [Installation](#installation)
  - [Running the project](#running-the-project)
  - [Production build](#production-build)
  - [Launching the test suite](#launching-the-test-suite)

## What's to be done

Before we start unsandboxing this project we need to figure out a few things. *(see related issues)*

- [ ] Choose CI / CD tools
- [ ] Automatic build pipeline to produce new build when design system gets update
- [ ] Testing policy
    - [ ] Unit testing
    - [ ] E2E testing
    - [ ] Snapshot testing
- [ ] Investigate decoupling from bootstrap to keep the API stable

## Why [Stencil](https://stenciljs.com/) ?

### Seamless integration  

It's a one line integration for **Vue**, **React** and **Angular** and it can also be used with plain JS if you so desire:

```typescript
/// In the main application script
import { defineCustomElements } from 'wcs-components';

defineCustomElements(window);
```

See the [**docs**](https://stenciljs.com/docs/framework-integration) !

### Simple and familiar API

Stencil take cues from Angular, React and Vue while keeping the API minimal.   
The goal of this project being to rally scattered developpers, a familiar API is a must for everybody to be able to contribute.  

### Lightweight

Stencil relies as much as possible on standardized browser API's and includes polyfills only if needed.

## Goal

The goal of this project would be to provide:

- Dumb components, only styling helpers. *(card, button, ...)*
- Smart components, implementing logic. *(dropdown, dialog, ...)*

### Dumb components

The idea is that the user is free to use dumb components to gain time and readability, exemple:

```html
<wcs-card>
  <wcs-card-content>
    Text inside the content
  </wcs-card-content>
<wcs-card>
```

Or to use the bootstrap classes:

```html
<div class="card">
  <div class="card-body">
    Text inside the content
  </div>
</div>
```

Or even mixing them together:

```html
<wcs-card>
  <img class="card-img-top" alt="Card top image" src="http://placebeard.it/267/128"/>
  <wcs-card-content class="text-center">
    Text inside the content
  </wcs-card-content>
<wcs-card>
```

### Smart components

> **TODO**

### Advantages

This allow two things:

- More flexibility for the end user.
- If this project is behind for whatever reason, you can still use bootstrap classes.

## Getting Started

### Tooling

For better productivity we recommend using the following tools:
- VScode with some extensions
    - TSlint
    - Stencil tools

### Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/groupeSNCF/wcs-sandbox.git 
cd wcs-sandbox 
npm install
```

### Running the project

```bash
npm start
# For browser compatibility you'll probably need to use this one instead:
npm start --es5
```

### Production build

```bash
npm run build
```

### Launching the test suite

```bash
npm test
```
