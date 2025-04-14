# JSON to Design Tokens Format 

> **This script aims to convert a Token Studio JSON export into our readable format, used for comparaison between versions or additions of design tokens.**


- Input : JSON exported from Figma with Token Studio. Rules :
  - The name of the file must contain the theme : e.g. `sncf-holding`
  - The name of the file must contain `primitive` or `semantic`
  - Use `-` between words (kebab-base) : e.g: `sncf-holding-primitive.json`
  - **For primitive files** : make sure it contains a subgroup equals to the name of the theme: _e.g. primitive file for SNCF Groupe must contains a `primitive.color.sncf.groupe` subfolder inside the JSON._
- Output : JSON that respects the [DTCG specifications](https://tr.designtokens.org/format/) and alphabetically ordered with either semantics or primitives tokens.

> Exported files should be placed in `design-tokens/tokens` and re-generated using the `generate-design-tokens` script. Changes must be commited to git. 