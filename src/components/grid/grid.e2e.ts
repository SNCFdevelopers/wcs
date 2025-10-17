import { newE2EPage } from "@stencil/core/testing";
import { setWcsContent } from "../../utils/tests";

describe('Grid component', () => {
    describe('Events', () => {
        describe('simple', () => {
            it('should emit a wcsGridSelectionChange event when a row is selected', async () => {
                // Given
                const page = await newE2EPage();
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }]
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="single" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = await page.find('#simpleGrid');
                simpleGrid.setProperty('data', data);
                await page.waitForChanges();

                const eventSpy = await simpleGrid.spyOnEvent('wcsGridSelectionChange');

                // When
                const gridRadioFirstRow = await page.find('wcs-grid >>> table tbody tr:first-child td .grid-radio');

                await gridRadioFirstRow.click();

                // Then
                expect(eventSpy)
                    .toHaveReceivedEventDetail({
                        selectedRows: [{ data: data[0], selected: true }], // compare by reference (deep equality)
                        changedRow: {
                            selected: true,
                            data: data[0], // compare by reference (deep equality)
                            // page is not present because we don't have any pagination with <wcs-grid-pagination>
                        }
                    });
            });
        });

        describe('multiple', () => {
            it('should emit a wcsGridSelectionChange event when a row is selected', async () => {
                // Given
                const page = await newE2EPage();
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }]
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = await page.find('#simpleGrid');
                simpleGrid.setProperty('data', data);
                await page.waitForChanges();

                const eventSpy = await simpleGrid.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxFirstRow = await page.find('wcs-grid >>> table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click();

                // Then
                expect(eventSpy)
                    .toHaveReceivedEventDetail({
                        selectedRows: [{ data: data[0], selected: true }], // compare by reference (deep equality)
                        changedRow: {
                            selected: true,
                            data: data[0], // compare by reference (deep equality)
                            // page is not present because we don't have any pagination with <wcs-grid-pagination>
                        }
                    });
            });
            it('should emit a wcsGridSelectionChange event when a row is unselected', async () => {
                // Given
                const page = await newE2EPage();
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }]
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = await page.find('#simpleGrid');
                simpleGrid.setProperty('data', data);
                await page.waitForChanges();

                const wcsCheckboxFirstRow = await page.find('wcs-grid >>> table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click(); // Row is selected

                const eventSpy = await simpleGrid.spyOnEvent('wcsGridSelectionChange');

                // When
                await wcsCheckboxFirstRow.click(); // Row is unselected

                // Then
                expect(eventSpy)
                    .toHaveReceivedEventDetail({
                        selectedRows: [],
                        changedRow: {
                            selected: false,
                            data: data[0], // compare by reference (deep equality)
                            // page is not present because we don't have any pagination with <wcs-grid-pagination>
                        }
                    });
            });
            it('should emit a wcsGridSelectionChange event when a new row is selected while another are already selected', async () => {
                // Given
                const page = await newE2EPage();
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }]
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = await page.find('#simpleGrid');
                simpleGrid.setProperty('data', data);
                await page.waitForChanges();

                const wcsCheckboxFirstRow = await page.find('wcs-grid >>> table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click();

                const eventSpy = await simpleGrid.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxLastChild = await page.find('wcs-grid >>> table tbody tr:last-child td wcs-checkbox');
                await wcsCheckboxLastChild.click();

                // Then
                expect(eventSpy)
                    .toHaveReceivedEventDetail({
                        selectedRows: [{ data: data[0], selected: true }, { data: data[data.length - 1], selected: true }], // compare by reference (deep equality)
                        changedRow: {
                            selected: true,
                            data: data[data.length - 1], // compare by reference (deep equality)
                            // page is not present because we don't have any pagination with <wcs-grid-pagination>
                        }
                    });
            });
            it('should emit a wcsGridSelectionChange event when all rows are selected', async () => {
                // Given
                const page = await newE2EPage();
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }]
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = await page.find('#simpleGrid');
                simpleGrid.setProperty('data', data);
                await page.waitForChanges();

                const eventSpy = await simpleGrid.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxAll = await page.find('wcs-grid >>> table thead th:first-child wcs-checkbox');
                await wcsCheckboxAll.click();

                // Then
                expect(eventSpy)
                    .toHaveReceivedEventDetail({
                        selectedRows: data.map(d => {
                            return { data: d, selected: true };
                        }), // compare by reference (deep equality)
                        changedRow: 'allCheckbox'
                    });
            });
        });
    });
    describe('Sort', () => {
        it('should well sort with pagination', async () => {
            const page = await newE2EPage();
            const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Zoe' }]
            await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple">
                        <wcs-grid-column path="first_name" name="First Name" sort sort-order="desc"></wcs-grid-column>
                        <wcs-grid-pagination available-page-sizes="2"></wcs-grid-pagination>
                    </wcs-grid>
                `);

            const simpleGrid = await page.find('#simpleGrid');
            simpleGrid.setProperty('data', data);

            await page.waitForChanges();

            // First page should contain 2 elements (page-size = 2) sorted descending by first_name
            // Data order before sort: John, Doe, Jane, Zoe
            // After descending sort: Zoe, John, Jane, Doe
            // Page 1 should show Zoe, John

            const firstRowFirstCell = await page.find('wcs-grid >>> table tbody tr:first-child td:last-child');
            const secondRowFirstCell = await page.find('wcs-grid >>> table tbody tr:nth-child(2) td:last-child');

            expect(firstRowFirstCell.textContent).toBe('Zoe');
            expect(secondRowFirstCell.textContent).toBe('John');
        });
    })
});
