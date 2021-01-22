# Grid

The WCS grid is based on the grid-JS library and provides components to simplify its configuration.

Two data sources are available :
- the first one in javascript.
- the second one from an HTML table element.

the sources must not be used simultaneously.

The columns can be configured with wcs-grid-column elements for both data sources as shown in the examples below.

### Set data in JS

```html

<wcs-grid id="grid-1"/>
    <wcs-grid-column field-id="name" sort name="Nom"></wcs-grid-column>
    <wcs-grid-column field-id="email" name="Email"></wcs-grid-column>
    <wcs-grid-column field-id="phone" name="Téléphone"></wcs-grid-column>
</wcs-grid>

<wcs-button id="add-row-button" mode="stroked" shape="small">Ajouter une ligne</wcs-button>


<script>
    document.getElementById('grid-1').data = [
        {name: 'John', email: 'john@example.com', phone: '(353) 01 222 3333'},
        {name: 'Mark', email: 'mark@gmail.com', phone: '(01) 22 888 4444'},
        {name: 'Eoin', email: 'eoin@gmail.com', phone: '0097 22 654 00033'},
        {name: 'Sarah', email: 'sarahcdd@gmail.com', phone: '+322 876 1233'},
    ];
    document.getElementById('add-row-button').addEventListener('click', _ => {
        document.getElementById('grid-1').data = [
            ...document.getElementById('grid-1').data,
            {name: 'John', email: 'john@example.com', phone: '(353) 01 222 3333'}
        ];
    });
</script>
```

### Set data in html

You can add an optional wcs-grid-column definition to customize a specific column.

the `field-id` attribute of the column is the "camelcased" innerHtml of corresponding `th`. 

```html

<wcs-grid id="grid-2">
    <wcs-grid-column field-id="nameTest" sort></wcs-grid-column>
    <table>
        <thead>
        <tr>
            <th width="1px">Name Test</th>
            <th>Email</th>
            <th width="1px">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>John</td>
            <td>john@example.com</td>
            <td>
                <wcs-button shape="small">Ouvrir</wcs-button>
            </td>
        </tr>
        <tr>
            <td>Mike</td>
            <td><b>mike@example.com</b></td>
            <td>
                <wcs-button shape="small">Ouvrir</wcs-button>
            </td>
        </tr>
        </tbody>
    </table>
</wcs-grid>
```

```html
<wcs-grid sort fixed-header height="400px" id="grid-3"/>
    <wcs-grid-column field-id="id" name="Nom"></wcs-grid-column>
    <wcs-grid-column field-id="first_name" name="Prénom"></wcs-grid-column>
    <wcs-grid-column field-id="last_name" name="Nom"></wcs-grid-column>
    <wcs-grid-column field-id="email" name="Email"></wcs-grid-column>
    <wcs-grid-column field-id="ip_address" name="Adresse IP"></wcs-grid-column>
</wcs-grid>

```

<script>
    document.getElementById('grid-3').data = [{
      "id": 1,
      "first_name": "Layton",
      "last_name": "Ficken",
      "email": "lficken0@virginia.edu",
      "ip_address": "218.72.240.171"
    }, {
      "id": 2,
      "first_name": "Orrin",
      "last_name": "Omand",
      "email": "oomand1@ca.gov",
      "ip_address": "76.142.208.149"
    }, {
      "id": 3,
      "first_name": "Adi",
      "last_name": "Lauritsen",
      "email": "alauritsen2@homestead.com",
      "ip_address": "177.88.32.189"
    }, {
      "id": 4,
      "first_name": "Jason",
      "last_name": "Uccelli",
      "email": "juccelli3@icio.us",
      "ip_address": "88.183.212.203"
    }, {
      "id": 5,
      "first_name": "Olympia",
      "last_name": "Ibbett",
      "email": "oibbett4@google.fr",
      "ip_address": "88.127.147.93"
    }, {
      "id": 6,
      "first_name": "Lenna",
      "last_name": "McGettigan",
      "email": "lmcgettigan5@angelfire.com",
      "ip_address": "220.169.98.185"
    }, {
      "id": 7,
      "first_name": "Ninnette",
      "last_name": "Lilburne",
      "email": "nlilburne6@sciencedaily.com",
      "ip_address": "142.129.177.125"
    }, {
      "id": 8,
      "first_name": "Louisa",
      "last_name": "Bines",
      "email": "lbines7@bing.com",
      "ip_address": "178.206.80.119"
    }, {
      "id": 9,
      "first_name": "Annabell",
      "last_name": "Lawrenceson",
      "email": "alawrenceson8@tinypic.com",
      "ip_address": "12.29.214.10"
    }, {
      "id": 10,
      "first_name": "Brinn",
      "last_name": "McDoual",
      "email": "bmcdoual9@ebay.co.uk",
      "ip_address": "148.122.38.174"
    }, {
      "id": 11,
      "first_name": "Edgardo",
      "last_name": "Kahn",
      "email": "ekahna@samsung.com",
      "ip_address": "83.194.66.246"
    }, {
      "id": 12,
      "first_name": "Ambur",
      "last_name": "Southouse",
      "email": "asouthouseb@narod.ru",
      "ip_address": "34.83.123.226"
    }, {
      "id": 13,
      "first_name": "Thomas",
      "last_name": "Champe",
      "email": "tchampec@indiatimes.com",
      "ip_address": "8.36.92.114"
    }, {
      "id": 14,
      "first_name": "Ange",
      "last_name": "Stubbley",
      "email": "astubbleyd@amazonaws.com",
      "ip_address": "120.94.204.155"
    }, {
      "id": 16,
      "first_name": "Daloris",
      "last_name": "Bangiard",
      "email": "dbangiardf@xrea.com",
      "ip_address": "69.241.212.201"
    }, {
      "id": 17,
      "first_name": "Charline",
      "last_name": "Downham",
      "email": "cdownhamg@eepurl.com",
      "ip_address": "160.79.196.110"
    }, {
      "id": 18,
      "first_name": "Nealy",
      "last_name": "Fahrenbacher",
      "email": "nfahrenbacherh@cornell.edu",
      "ip_address": "243.201.4.63"
    }, {
      "id": 19,
      "first_name": "Eldridge",
      "last_name": "Budgett",
      "email": "ebudgetti@hao123.com",
      "ip_address": "183.248.68.245"
    }, {
      "id": 20,
      "first_name": "Anallese",
      "last_name": "Erley",
      "email": "aerleyj@nifty.com",
      "ip_address": "67.42.233.39"
    }, {
      "id": 21,
      "first_name": "Rodrique",
      "last_name": "Readman",
      "email": "rreadmank@dedecms.com",
      "ip_address": "239.22.60.62"
    }, {
      "id": 22,
      "first_name": "Andromache",
      "last_name": "Byfford",
      "email": "abyffordl@uol.com.br",
      "ip_address": "167.109.107.152"
    }, {
      "id": 23,
      "first_name": "Noach",
      "last_name": "Portam",
      "email": "nportamm@canalblog.com",
      "ip_address": "244.83.218.52"
    }, {
      "id": 24,
      "first_name": "Brana",
      "last_name": "Feldbrin",
      "email": "bfeldbrinn@fastcompany.com",
      "ip_address": "67.138.221.127"
    }, {
      "id": 25,
      "first_name": "Joyan",
      "last_name": "Lazare",
      "email": "jlazareo@ucsd.edu",
      "ip_address": "194.230.147.173"
    }, {
      "id": 26,
      "first_name": "Judie",
      "last_name": "Gerbi",
      "email": "jgerbip@berkeley.edu",
      "ip_address": "17.82.104.88"
    }, {
      "id": 27,
      "first_name": "Margarethe",
      "last_name": "Church",
      "email": "mchurchq@pinterest.com",
      "ip_address": "56.237.193.121"
    }, {
      "id": 28,
      "first_name": "Kerrie",
      "last_name": "Daveley",
      "email": "kdaveleyr@psu.edu",
      "ip_address": "53.59.38.240"
    }, {
      "id": 29,
      "first_name": "Kenny",
      "last_name": "Armal",
      "email": "karmals@sina.com.cn",
      "ip_address": "226.220.193.245"
    }, {
      "id": 30,
      "first_name": "Reid",
      "last_name": "Falloon",
      "email": "rfalloont@amazonaws.com",
      "ip_address": "75.77.41.188"
    }, {
      "id": 31,
      "first_name": "Ola",
      "last_name": "De Francisci",
      "email": "odefrancisciu@domainmarket.com",
      "ip_address": "12.124.83.201"
    }, {
      "id": 32,
      "first_name": "Stavros",
      "last_name": "Coch",
      "email": "scochv@cbslocal.com",
      "ip_address": "224.102.82.130"
    }, {
      "id": 33,
      "first_name": "Juliana",
      "last_name": "Fiddian",
      "email": "jfiddianw@amazon.com",
      "ip_address": "88.34.71.19"
    }, {
      "id": 34,
      "first_name": "Arturo",
      "last_name": "Noni",
      "email": "anonix@unicef.org",
      "ip_address": "61.159.164.3"
    }, {
      "id": 35,
      "first_name": "Elita",
      "last_name": "Rathjen",
      "email": "erathjeny@latimes.com",
      "ip_address": "73.207.134.5"
    }, {
      "id": 36,
      "first_name": "Nicolette",
      "last_name": "Titchmarsh",
      "email": "ntitchmarshz@nymag.com",
      "ip_address": "228.199.174.217"
    }, {
      "id": 37,
      "first_name": "Ilise",
      "last_name": "Ondracek",
      "email": "iondracek10@smugmug.com",
      "ip_address": "95.154.139.162"
    }, {
      "id": 38,
      "first_name": "Etan",
      "last_name": "Le Barre",
      "email": "elebarre11@elpais.com",
      "ip_address": "120.56.26.147"
    }, {
      "id": 39,
      "first_name": "Rose",
      "last_name": "Vaughten",
      "email": "rvaughten12@indiegogo.com",
      "ip_address": "150.188.43.89"
    }, {
      "id": 40,
      "first_name": "Borg",
      "last_name": "Clac",
      "email": "bclac13@deviantart.com",
      "ip_address": "167.44.217.137"
    }, {
      "id": 41,
      "first_name": "Raff",
      "last_name": "Garrit",
      "email": "rgarrit14@hostgator.com",
      "ip_address": "56.11.68.170"
    },
     {
      "id": 42,
      "first_name": "Amanda",
      "last_name": "Dobbison",
      "email": "adobbison15@hao123.com",
      "ip_address": "146.91.75.191"
    }];
</script>

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                                          | Type                                                                                | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| `autoWidth`   | `auto-width`   |                                                                                                                                                                                                                                                                                                                      | `boolean`                                                                           | `true`      |
| `columns`     | --             | Allows you to configure the columns manually.  If you provide a value for this attribute, the wcs-grid-column components will not be used (but please, don't!).                                                                                                                                                      | `(string \| number \| boolean \| object \| TColumn \| VNode<any>)[]`                | `undefined` |
| `data`        | --             | Allows you to set the table data in JS. This option is taken into account only if no table element is present in the component slot.  This attribute must not be used beside an html table in the slot. In this case, no guarantees can be given on the component behaviour's                                        | `(() => Promise<TData>) \| (() => TData) \| OneDArray<TCell>[] \| TDataObjectRow[]` | `undefined` |
| `fixedHeader` | `fixed-header` | fixes the table header to the top of the table                                                                                                                                                                                                                                                                       | `boolean`                                                                           | `undefined` |
| `height`      | `height`       | sets the height of the table                                                                                                                                                                                                                                                                                         | `string`                                                                            | `'auto'`    |
| `pagination`  | --             |                                                                                                                                                                                                                                                                                                                      | `PaginationConfig`                                                                  | `undefined` |
| `search`      | `search`       | To enable or disable the global search plugin see: https://gridjs.io/docs/config/search                                                                                                                                                                                                                              | `SearchConfig \| boolean`                                                           | `undefined` |
| `sort`        | `sort`         | To enable the sorting plugin. Sort has two config objects: - Generic config: to enable sort for all columns, enable multi column sort, server-side integration, etc. - Column specific config: to enable sort on a specific column, to set custom comparator function, etc. see : https://gridjs.io/docs/config/sort | `GenericSortConfig \| boolean`                                                      | `undefined` |
| `width`       | `width`        |                                                                                                                                                                                                                                                                                                                      | `string`                                                                            | `'100%'`    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
