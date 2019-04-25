# Contributinf to WCS
We're looking for contributors in all way. If you're an user and have problems, questions ore recommendation feel free to fill an issue. 

If you want to contribute to the project, we'll be happy to welcome you, contact us and we'll see from there.

## Hacking on WCS
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

