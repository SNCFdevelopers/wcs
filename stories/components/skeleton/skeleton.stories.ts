import { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit-html";

/**
 * Use skeleton as a placeholder for elements loading on the page.  
 * If your page structure is complex or the loading time is short (< 300ms), use [wcs-spinner](.?path=/docs/components-spinner--documentation) instead.
 *
 * For now, you can use three types of skeleton :
 * - `wcs-skeleton-text` : basic placeholder for titles or paragraphs
 * - `wcs-skeleton-circle` : placeholder for round images, illustrations or components
 * - `wcs-skeleton-rectangle` : placeholder for large images or square-shaped components
 *
 * For practical use, skeletons do not have any margin by default. You have to set them in your stylesheets.
 * 
 * ## Accessibility guidelines 💡
 * > Skeletons are made of empty span with `aria-hidden="true"`. In order to indicate to screenreaders that the
 * > content is loading, you should add on the top level-node container of your skeletons the `aria-busy="true"`
 * > attribute while the content is loading. The `aria-busy` attribute must be removed once the skeleton is not
 * > displayed anymore.  
 * >
 * > ```html
 * > <div class="container" aria-busy="true">
 * >     <wcs-skeleton-text height="h1"></<wcs-skeleton-text>
 * >     <wcs-skeleton-text height="body"></<wcs-skeleton-text>
 * > </div>
 * > ```
 * >
 * > **On your application side**, when the skeleton disappears you should move the focus to a relevant element
 * > within the new content.  
 * > Relevant element could be :
 * > - **Non-interactive elements** like paragraphs or headings 👉 Those non-interactive elements need `tabindex="-1"`
 * > attribute to be able to receive the focus moved via javascript.
 * > - **Interactive elements** like text-fields or buttons 👉 Make sure no information is overlooked when moving focus
 * > directly to the element.
 * >
 * > More info : 
 * > - Source 1 : https://developer.semrush.com/intergalactic/components/skeleton/skeleton-a11y/
 * > - Source 2 : https://mui.com/material-ui/react-skeleton/#accessibility
 * > - Source 3 : https://www.digitala11y.com/aria-busy-state/
 *
 */
const meta: Meta = {
    title: 'Components/Skeleton',
};
export default meta;


/**
 * **Complete example**  
 * Using `wcs-skeleton-text`, `wcs-skeleton-rectangle`, `wcs-skeleton-circle`
 */
export const Example: StoryObj = {
    render: (args: { loading: boolean }) => {
        // XXX : Begin troll region
        const getSeason = d => d.getMonth() === 11 ? 0 : Math.floor((d.getMonth() / 12 * 4)) % 4;
        const imgSrc = `train_${['winter', 'spring', 'summer', 'autumn'][getSeason(new Date())]}.jpg`
        // End troll region
        
        return args.loading ? html`
            <wcs-card mode="flat">
                <wcs-card-body class="container">
                    <div class="heading">
                        <wcs-skeleton-circle radius="50"></wcs-skeleton-circle>
                        <wcs-skeleton-text class="title-skeleton"
                                           height="h1"></wcs-skeleton-text>
                    </div>
                    <wcs-skeleton-rectangle height="200px" width="270px"></wcs-skeleton-rectangle>
                    <wcs-skeleton-text></wcs-skeleton-text>
                    <wcs-skeleton-text></wcs-skeleton-text>
                    <wcs-skeleton-text></wcs-skeleton-text>
                    <wcs-skeleton-text class="last-skeleton"></wcs-skeleton-text>
                </wcs-card-body>
            </wcs-card>
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: var(--wcs-base-margin);
                }
                
                .heading {
                    display: flex;
                    align-items: center;
                    gap: var(--wcs-margin);
                    margin-bottom: var(--wcs-margin);
                }

                .title-skeleton {
                    width: 150px;
                }

                .last-skeleton {
                    width: 70%;
                }
            </style>
        ` : html`
            <wcs-card mode="flat">
                <wcs-card-body>
                    <div class="heading">
                        <img src="./sncf-logo.png" alt="SNCF Logo" height="50">
                        <h1>SNCF</h1>
                    </div>
                    <img
                        src=${imgSrc}
                        alt="Train with landscape"
                        height="200"/>
                    <p style="text-align: justify">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque
                        rerum! Provident similique accusantium nemo autem. Ipsa laudantium molestias eos sapiente
                        officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime
                        adipisci amet laborum.</p>
                </wcs-card-body>
            </wcs-card>
            <style>
                .heading {
                    display: flex;
                    align-items: center;
                    gap: var(--wcs-margin);
                }
            </style>
        `
    },
    args: {
        loading: true,
    },
    argTypes: {
        loading: {
            description: 'Show or hide the loading skeleton for this example',
        }
    }
}
