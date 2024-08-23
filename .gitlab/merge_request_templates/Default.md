### To check

- [ ] **Explain what has changed in the changelog**
- [ ] _For newly created web components only :_ Declare all new angular proxy components in the file `angular/projects/wcs-angular/src/lib/wcs-angular.module.ts`
- [ ] _For newly created web components only :_ Add the component name in `Components-Overview.mdx` with its corresponding image into `assets/images/components-overview`

#### Design token migration (specific task)

- [ ] check that css variables for which you change the name are not setter / read in typescript code. Rename them in the ts code if necessary.
- [ ] Document all renamed css variables in the migration guide.
- [ ] Document all component token (css variable) in the component doc (with ts annotation) so that they can be used by the projects.