# Footer

The footer component has been designed to leave as much customization as possible to the developer. The footers are
often specific to the application developed.

There are 3 distinct areas of which only one is assigned a specific function :

- All the elements slotted in the component without name come to be positioned in the first zone. For details on the
  templates to use in the footer, you can consult this
  documentation: [https://design-bootstrap.sncf.fr/docs/4.3/layout/footer/](https://design-bootstrap.sncf.fr/docs/4.3/layout/footer/)
- The slotted elements with the name `end-left` are positioned in the bottom left zone which must contain only links. **
  These links are automatically styled by the component**.
- Finally, the slotted elements with the name end-right are positioned in the last zone at the bottom right. For
  applications that offer several languages to users, it is here that the choice of language can be made as on the
  sncf.com website for example. You can also place actions related to social networks, ...

the maximum width used by the footer content is defined by the css variable `--wcs-com-content-max-width`

```
                <─────────────────────────  container  ─────────────────────────>
  ┌────────────┬─────────────────────────────────────────────────────────────────┬────────────┐
  │            │                                                                 │            │
  │            │                              Slot                               │            │
  │            │                         (without name)                          │            │
  │            │                                                                 │            │
  │            ├────────────────────────────────┬────────────────────────────────┤            │
  │            │                                │                                │            │
  │            │              Slot              │              Slot              │            │
  │            │            end-left            │            end-right           │            │
  └────────────┴────────────────────────────────┴────────────────────────────────┴────────────┘
```

```html
<wcs-footer>
    <p>Contenu libre</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel neque et dolor egestas posuere nec sed neque.
        In porttitor orci vitae orci maximus, eget convallis nisi auctor. Nunc maximus vulputate maximus. Mauris ornare
        tortor mi. Quisque laoreet, erat sit amet volutpat ornare, ligula ante pharetra lacus, sit amet ornare libero
        odio eget nunc. Cras facilisis sem id tellus tempor, consectetur laoreet erat ornare. Sed aliquam tortor et quam
        viverra, nec finibus lacus mattis.</p>
    <a slot="end-left" href="#">Plan du site</a>
    <a slot="end-left" href="#">Mentions légales & CGU</a>
    <a slot="end-left" href="#">Données personnelles & cookies</a>
    <a slot="end-left" href="#">Portail de la cybersécurité</a>
    <span slot="end-right" href="#">Séléction de la langue</span>
</wcs-footer>
```

<!-- Auto Generated Below -->


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
