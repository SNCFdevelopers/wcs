import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Grid component', () => {
    test.describe('Events', () => {
        test.describe('simple', () => {
            test('should emit a wcsGridSelectionChange event when a row is selected', async ({ page }: { page: E2EPage }) => {
                // Given
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }];
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="single" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = page.locator('#simpleGrid');
                await simpleGrid.evaluate((el: any, d) => el.data = d, data);

                const selectionSpy = await page.spyOnEvent('wcsGridSelectionChange');

                // When
                const gridRadioFirstRow = simpleGrid.locator('table tbody tr:first-child td .grid-radio');
                await gridRadioFirstRow.click();
                await page.waitForChanges();

                // Then
                expect(selectionSpy).toHaveReceivedEventTimes(1);
                const detail = selectionSpy.events[0].detail;
                expect(detail.selectedRows[0].data).toEqual(data[0]);
                expect(detail.selectedRows[0].selected).toBe(true);
                expect(detail.changedRow.selected).toBe(true);
                expect(detail.changedRow.data).toEqual(data[0]);
            });
        });

        test.describe('multiple', () => {
            test('should emit a wcsGridSelectionChange event when a row is selected', async ({ page }: { page: E2EPage }) => {
                // Given
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }];
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = page.locator('#simpleGrid');
                await simpleGrid.evaluate((el: any, d) => el.data = d, data);

                const selectionSpy = await page.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxFirstRow = simpleGrid.locator('table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click();
                await page.waitForChanges();

                // Then
                expect(selectionSpy).toHaveReceivedEventTimes(1);
                const detail = selectionSpy.events[0].detail;
                expect(detail.selectedRows[0].data).toEqual(data[0]);
                expect(detail.selectedRows[0].selected).toBe(true);
                expect(detail.changedRow.selected).toBe(true);
                expect(detail.changedRow.data).toEqual(data[0]);
            });

            test('should emit a wcsGridSelectionChange event when a row is unselected', async ({ page }: { page: E2EPage }) => {
                // Given
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }];
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = page.locator('#simpleGrid');
                await simpleGrid.evaluate((el: any, d) => el.data = d, data);

                const wcsCheckboxFirstRow = simpleGrid.locator('table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click(); // Row is selected
                await page.waitForChanges();

                const selectionSpy = await page.spyOnEvent('wcsGridSelectionChange');

                // When
                await wcsCheckboxFirstRow.click(); // Row is unselected
                await page.waitForChanges();

                // Then
                expect(selectionSpy).toHaveReceivedEventTimes(1);
                const detail = selectionSpy.events[0].detail;
                expect(detail.selectedRows).toEqual([]);
                expect(detail.changedRow.selected).toBe(false);
                expect(detail.changedRow.data).toEqual(data[0]);
            });

            test('should emit a wcsGridSelectionChange event when a new row is selected while another are already selected', async ({ page }: { page: E2EPage }) => {
                // Given
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }];
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = page.locator('#simpleGrid');
                await simpleGrid.evaluate((el: any, d) => el.data = d, data);

                const wcsCheckboxFirstRow = simpleGrid.locator('table tbody tr:first-child td wcs-checkbox');
                await wcsCheckboxFirstRow.click();
                await page.waitForChanges();

                const selectionSpy = await page.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxLastChild = simpleGrid.locator('table tbody tr:last-child td wcs-checkbox');
                await wcsCheckboxLastChild.click();
                await page.waitForChanges();

                // Then
                expect(selectionSpy).toHaveReceivedEventTimes(1);
                const detail = selectionSpy.events[0].detail;
                expect(detail.selectedRows.length).toBe(2);
                expect(detail.selectedRows[0].data).toEqual(data[0]);
                expect(detail.selectedRows[1].data).toEqual(data[data.length - 1]);
                expect(detail.changedRow.selected).toBe(true);
                expect(detail.changedRow.data).toEqual(data[data.length - 1]);
            });

            test('should emit a wcsGridSelectionChange event when all rows are selected', async ({ page }: { page: E2EPage }) => {
                // Given
                const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Smith' }];
                await setWcsContent(page, `
                    <wcs-grid id="simpleGrid" selection-config="multiple" sort="">
                        <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                    </wcs-grid>
                `);

                const simpleGrid = page.locator('#simpleGrid');
                await simpleGrid.evaluate((el: any, d) => el.data = d, data);

                const selectionSpy = await page.spyOnEvent('wcsGridSelectionChange');

                // When
                const wcsCheckboxAll = simpleGrid.locator('table thead th:first-child wcs-checkbox');
                await wcsCheckboxAll.click();
                await page.waitForChanges();

                // Then
                expect(selectionSpy).toHaveReceivedEventTimes(1);
                const detail = selectionSpy.events[0].detail;
                expect(detail.selectedRows.length).toBe(data.length);
                expect(detail.changedRow).toBe('allCheckbox');
            });
        });
    });

    test.describe('Sort', () => {
        test('should well sort with pagination', async ({ page }: { page: E2EPage }) => {
            const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }, { id: 3, first_name: 'Jane' }, { id: 4, first_name: 'Zoe' }];
            await setWcsContent(page, `
                <wcs-grid id="simpleGrid" selection-config="multiple">
                    <wcs-grid-column path="first_name" name="First Name" sort sort-order="desc"></wcs-grid-column>
                    <wcs-grid-pagination available-page-sizes="2"></wcs-grid-pagination>
                </wcs-grid>
            `);

            const simpleGrid = page.locator('#simpleGrid');
            await simpleGrid.evaluate((el: any, d) => el.data = d, data);

            // First page should contain 2 elements (page-size = 2) sorted descending by first_name
            // Data order before sort: John, Doe, Jane, Zoe
            // After descending sort: Zoe, John, Jane, Doe
            // Page 1 should show Zoe, John

            const firstRowFirstCell = simpleGrid.locator('table tbody tr:first-child td:last-child');
            const secondRowFirstCell = simpleGrid.locator('table tbody tr:nth-child(2) td:last-child');

            await expect(async () => {
                await expect(firstRowFirstCell).toHaveText('Zoe');
                await expect(secondRowFirstCell).toHaveText('John');
            }).toPass();
        });
    });

    test.describe('Behavior in window with scroll', () => {
        test('should preserve the window scroll position when clicking on a single-selection radio inside a scrollable container', async ({ page }: { page: E2EPage }) => {
            // Given
            const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }];
            await setWcsContent(page, `
                <div id="scroll-container" style="height: 100vh; overflow-y: auto;">
                    <div style="margin-top: 150vh; display: flex; flex-direction: column; gap: 16px;">
                        <wcs-grid id="simpleGrid" selection-config="single" sort="">
                            <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                        </wcs-grid>
                    </div>
                    <div style="margin-top: 200vh;">Other content</div>
                </div>
            `);

            const simpleGrid = page.locator('#simpleGrid');
            await simpleGrid.evaluate((el: any, d) => el.data = d, data);

            const body = page.locator('body');
            const gridRadioFirstRow = simpleGrid.locator('table tbody tr:first-child td .grid-radio');

            await gridRadioFirstRow.scrollIntoViewIfNeeded();

            // When
            await gridRadioFirstRow.click();
            await page.waitForChanges();

            // Then
            const scrollY = await body.evaluate(() => window.scrollY);
            expect(scrollY).toBe(0);
        });

        test('should preserve the window scroll position when tabbing to a single-selection grid inside a scrollable container', async ({ page }: { page: E2EPage }) => {
            // Given
            const data = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Doe' }];
            await setWcsContent(page, `
                <div id="scroll-container" style="height: 100vh; overflow-y: auto;">
                    <div style="margin-top: 150vh; display: flex; flex-direction: column; gap: 16px;">
                        <button id="before-grid">Before grid</button>
                        <wcs-grid id="simpleGrid" selection-config="single" sort="">
                            <wcs-grid-column path="first_name" name="First Name"></wcs-grid-column>
                        </wcs-grid>
                    </div>
                    <div style="margin-top: 200vh;">Other content</div>
                </div>
            `);

            const simpleGrid = page.locator('#simpleGrid');
            await simpleGrid.evaluate((el: any, d) => el.data = d, data);

            const body = page.locator('body');
            const beforeGridButton = page.locator('#before-grid');
            const firstGridRadio = simpleGrid.locator('table tbody tr:first-child td .grid-radio input');

            await beforeGridButton.scrollIntoViewIfNeeded();
            await beforeGridButton.focus();

            // When
            await page.keyboard.press('Tab');

            // Then
            await expect(firstGridRadio).toBeFocused();
            const scrollY = await body.evaluate(() => window.scrollY);
            expect(scrollY).toBe(0);
        });
    });
});
