import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
  title: 'Components/Form Field/Hint',
  component: 'wcs-hint',
  argTypes: getComponentArgs('wcs-hint'),
};

export default meta;

interface HintParams {
  small: boolean;
}

export const Default: StoryObj = {
  render: (args: HintParams) => html`
      <wcs-form-field>
          <wcs-label>Full name</wcs-label>
          <wcs-input placeholder="John Doe"></wcs-input>
          <wcs-hint ?small=${args.small}>A name is something that describes a person</wcs-hint>
          <wcs-error>Your name is not valid, please do what is necessary
              <a href="https://www.service-public.fr/particuliers/vosdroits/F1656">here</a>.
          </wcs-error>
      </wcs-form-field>
  `,
  args: {
    small: false,
  }
}

/**
 * The `wcs-hint` is used to display relevant information to the user.  
 * This is an example of a textarea showing how many characters are left :
 */
export const TextAreaWithCharactersLeft: StoryObj = {
  render: (args) => {

    function handleTextAreaWcsInput(e: any) {
      // @ts-ignore
      const span = document.querySelector('span#char-left');
      const textArea = e.target;
      textArea.addEventListener('wcsInput', () => {
        span.innerText = (textArea?.value?.length ?? 0) + '/255';
      })
    }
    
    return html`
        <wcs-form-field ?is-error=${args.isError}>
            <wcs-label>Feedback about your trip</wcs-label>
            <wcs-textarea id="textarea-example" placeholder="Type your message" rows="6" cols="80"
                          maxlength="255" @wcsInput=${(e: any) => handleTextAreaWcsInput(e)}></wcs-textarea>
            <wcs-hint>
                <div style="display: flex; justify-content: space-between; gap: var(--wcs-margin)">
                    <span>These data will not be sent to a big company that shall remain unnamed</span>
                    <span id="char-left">0/255</span>
                </div>
            </wcs-hint>
        </wcs-form-field>
    `;
  },
  args: {
    ...Default.args
  }
}