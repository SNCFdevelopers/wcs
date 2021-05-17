# Grid

## Available CSS Variables

|   Name                           | Description                         |
|:---------------------------------|:------------------------------------|
| `--wcs-grid-highlight-color`     | Color for selected rows             |
| `--wcs-grid-column-border-left`  | Left border of all grid headers     |

let's define some data for examples

```html
<script>
    const usersData = [
        {
            "id": 1,
            "first_name": "Mozes",
            "last_name": "Daleman",
            "email": "mdaleman0@dropbox.com",
            "ip_address": "14.151.191.92"
        }, {
            "id": 2,
            "first_name": "Humbert",
            "last_name": "Hegge",
            "email": "hhegge1@soup.io",
            "ip_address": "141.127.144.144"
        }
    ];
</script>
```

## Basic

```html
<wcs-grid id="grid-simple-1">
    <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
    <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
    <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
    <wcs-grid-column name="Adresse IP" path="ip_address" sort></wcs-grid-column>
</wcs-grid>
<script>
let wcsGridSimple1 = document.getElementById('grid-simple-1');
wcsGridSimple1.data = [
    {
        "id": 1,
        "first_name": "Mozes",
        "last_name": "Daleman",
        "email": "mdaleman0@dropbox.com",
        "ip_address": "14.151.191.92"
    }, {
        "id": 2,
        "first_name": "Humbert",
        "last_name": "Hegge",
        "email": "hhegge1@soup.io",
        "ip_address": "141.127.144.144"
    }
]
</script>
```

## Selection & pagination

```html

<wcs-grid id="grid-1" selection-config="single" wcs-grid-pagination-id="grid-pagination">
    <wcs-grid-column id="grid-column-1" name="Prénom" path="first_name" sort></wcs-grid-column>
    <wcs-grid-column id="grid-column-2" name="Nom" path="last_name" sort></wcs-grid-column>
    <!-- <wcs-grid-pagination id="grid-pagination" page-size="2" items-count="2000" page-count="20" current-page="0"></wcs-grid-pagination> -->
</wcs-grid>

<wcs-grid id="grid-2">
    <wcs-grid-column name="Prénom" path="person.first_name"></wcs-grid-column>
    <wcs-grid-column name="Nom" path="person.last_name"></wcs-grid-column>
    <wcs-grid-column name="Lien" path="link"></wcs-grid-column>
</wcs-grid>
```

<script>
    let wcsGridPagination = document.getElementById('grid-pagination');
    //wcsGridPagination.availablePageSizes = [2, 4, 6];
    /*wcsGridPagination.addEventListener('wcsGridPaginationChange', function (event) {
        console.log(event.detail);
        wcsGrid1.data = [{
            "id": 1,
            "first_name": "Mozes",
            "last_name": "Daleman",
            "email": "mdaleman0@dropbox.com",
            "ip_address": "14.151.191.92"
        }];
        wcsGridPagination.itemsCount = 100;
        wcsGridPagination.pageCount = 16;
        wcsGridPagination.currentPage = 8;
    });*/
    let wcsGridColumn1 = document.getElementById('grid-column-1');
    wcsGridColumn1.sortFn = (a, b, column) => {
        if(a[column.path] < b[column.path]) { return 1; }
        if(a[column.path] > b[column.path]) { return -1; }
        return 0;
    };
    wcsGridColumn1.formatter = (createElement, column, rowData) => {
        //return rowData.data.first_name;
        return createElement('wcs-button', {shape: 'small', mode: 'stroked', id: rowData.data.id, onClick: () => console.log('ici')}, rowData.data.first_name);
    };
    /* wcsGridColumn1.addEventListener('wcsSortChange', function (event) {
        console.log(event.detail);
        wcsGrid1.data = [{
            "id": 2,
            "first_name": "Humbert",
            "last_name": "Hegge",
            "email": "hhegge1@soup.io",
            "ip_address": "141.127.144.144"
        }];
        wcsGridPagination.itemsCount = 200;
        wcsGridPagination.pageCount = 9;
        wcsGridPagination.currentPage = 2;
    }); */

    let wcsGrid1 = document.getElementById('grid-1');
    wcsGrid1.addEventListener('wcsGridSelectionChange', function (event) { console.log(event.detail) });
    wcsGrid1.addEventListener('wcsGridAllSelectionChange', function (event) { console.log(event.detail) });
    wcsGrid1.loading = true;
    setTimeout(() => {
        wcsGrid1.data = [{
                "id": 1,
                "first_name": "Mozes",
                "last_name": "Daleman",
                "email": "mdaleman0@dropbox.com",
                "ip_address": "14.151.191.92"
            }, {
                "id": 2,
                "first_name": "Humbert",
                "last_name": "Hegge",
                "email": "hhegge1@soup.io",
                "ip_address": "141.127.144.144"
            }, {
                "id": 3,
                "first_name": "Tamara",
                "last_name": "Allday",
                "email": "tallday2@wufoo.com",
                "ip_address": "144.42.150.25"
            }, {
                "id": 4,
                "first_name": "Nicolai",
                "last_name": "Selley",
                "email": "nselley3@nbcnews.com",
                "ip_address": "179.227.142.220"
            }, {
                "id": 5,
                "first_name": "Efrem",
                "last_name": "Shearston",
                "email": "eshearston4@cpanel.net",
                "ip_address": "156.140.101.220"
            }, {
                "id": 6,
                "first_name": "Lonni",
                "last_name": "Swindin",
                "email": "lswindin5@wikipedia.org",
                "ip_address": "35.89.126.128"
            }
        ];
        wcsGrid1.loading = false;
    }, 3000);

    let wcsGrid2 = document.getElementById('grid-2');
    wcsGrid2.data = [{
      "person": {
        "first_name": "Yevette",
        "last_name": "Houlridge"
      },
      "link": "http://telegraph.co.uk"
    }, {
      "person": {
        "first_name": "Donella",
        "last_name": "Lievesley"
      },
      "link": "http://shutterfly.com"
    }, {
      "person": {
        "first_name": "Candida",
        "last_name": "Petrillo"
      },
      "link": "https://bbb.org"
    }, {
      "person": {
        "first_name": "Bail",
        "last_name": "Vevers"
      },
      "link": "https://nba.com"
    }];


</script>

## Selection

You can assign an item selection with the `selectedItems` property.
If the selection mode is set to multiple, the value must be an array, otherwise a single item.

The values are compared with the `_.equals()` function of loadash.

When the selection changes, the `wcsGridSelectionChange` event contains the details of the rows selected by the user.

```html
<wcs-grid id="grid-3" selection-config="multiple">
    <wcs-grid-column name="Prénom" path="first_name"></wcs-grid-column>
    <wcs-grid-column name="Nom" path="last_name"></wcs-grid-column>
    <wcs-grid-column name="Email" path="email"></wcs-grid-column>
</wcs-grid>

<script>
    let wcsGrid3 = document.getElementById('grid-3');
    wcsGrid3.data = [{
        "first_name": "Janot",
        "last_name": "Gillean",
        "email": "jgillean0@ocn.ne.jp"
    }, {
        "first_name": "Zacherie",
        "last_name": "Purple",
        "email": "zpurple1@nih.gov"
    }, {
        "first_name": "Vin",
        "last_name": "Hacking",
        "email": "vhacking2@shinystat.com"
    }, {
        "first_name": "Kevon",
        "last_name": "Millsap",
        "email": "kmillsap3@istockphoto.com"
    }];
    wcsGrid3.selectedItems = [{
        "first_name": "Vin",
        "last_name": "Hacking",
        "email": "vhacking2@shinystat.com"
    }, {
        "first_name": "Kevon",
        "last_name": "Millsap",
        "email": "kmillsap3@istockphoto.com"
    }];
</script>
```

## Cells styling

For simple customization needs, wcs generates a css part on each cell. All cells of a same column have the same css part
whose name is prefixed with the `path` attribute of the column concatenated with `-column` (e.g. `email-column`).

If you need more customization, you can add css parts yourself in the formatter function and then use them in your CSS sheet.

For more information on CSS part, see [https://developer.mozilla.org/fr/docs/Web/CSS/::part](https://developer.mozilla.org/fr/docs/Web/CSS/::part).

```html
<wcs-grid id="grid-cell-styling">
    <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
    <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
    <wcs-grid-column id="grid-cell-styling-mail-cl" name="Email" path="email" sort></wcs-grid-column>
    <wcs-grid-column name="Adresse IP" path="ip_address" sort></wcs-grid-column>
</wcs-grid>

<style>
    /* Auto generated part */
    #grid-cell-styling::part(first_name-column){
        background-color: var(--wcs-cyan);
        color: var(--wcs-white);
    }
    
    /* Custom user part added in formatter function */
     #grid-cell-styling::part(custom-user-part){ 
         color: var(--wcs-cyan); 
     } 
</style>

<script>
let wcsGridCellStyling = document.getElementById('grid-cell-styling');
wcsGridCellStyling.data = usersData;

let wcsGridCellStylingEmailColumn = document.getElementById('grid-cell-styling-mail-cl');
wcsGridCellStylingEmailColumn.formatter = (createElement, column, rowData) => {
    // We add the part attribute on the element we want to style
    return createElement('a', {'href': 'mailto:' + rowData.data.email, 'class': 'grid-email-column', 'part': 'custom-user-part'}, rowData.data.email);
};
</script>
```


<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                              | Type                               | Default     |
| --------------------- | ------------------------ | ------------------------------------------------------------------------ | ---------------------------------- | ----------- |
| `data`                | --                       |                                                                          | `any[]`                            | `undefined` |
| `loading`             | `loading`                | Flag to display spinner during data loading                              | `boolean`                          | `undefined` |
| `selectedItems`       | `selected-items`         | Set the selected items                                                   | `any`                              | `[]`        |
| `selectionConfig`     | `selection-config`       | Used to manage grid's row selection                                      | `"multiple" \| "none" \| "single"` | `'none'`    |
| `serverMode`          | `server-mode`            | True to manage sort and pagination with a backend server, default: false | `boolean`                          | `undefined` |
| `wcsGridPaginationId` | `wcs-grid-pagination-id` |                                                                          | `string`                           | `undefined` |


## Events

| Event                       | Description                                            | Type                                             |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `wcsGridAllSelectionChange` | Event emitted when all rows are selected or unselected | `CustomEvent<WcsGridAllRowSelectedEventDetails>` |
| `wcsGridSelectionChange`    | Event emitted when a row is selected or unselected     | `CustomEvent<WcsGridRowSelectedEventDetails>`    |


## Dependencies

### Depends on

- [wcs-radio](../radio)
- [wcs-checkbox](../checkbox)
- [wcs-spinner](../spinner)

### Graph
```mermaid
graph TD;
  wcs-grid --> wcs-radio
  wcs-grid --> wcs-checkbox
  wcs-grid --> wcs-spinner
  style wcs-grid fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
