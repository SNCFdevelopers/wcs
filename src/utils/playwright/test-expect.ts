// TODO: to delete when we update to version of @stencil/playwright that includes forged matchers definition (https://github.com/stenciljs/playwright/pull/54)

interface CustomMatchers<R = unknown> {
    /**
     * Will check if the event spy received the expected event.
     */
    toHaveReceivedEvent(): R;

    /**
     * Will check if the event spy received the expected event with the expected detail.
     * @param eventDetail The expected detail of the event.
     */
    toHaveReceivedEventDetail(eventDetail: any): R;

    /**
     * Will check if the event spy received the expected event at the given index with the expected detail.
     * @param index position of the event in the received events array.
     * @param eventDetail The expected detail of the event.
     */
    toHaveNthReceivedEventDetail(index: number, eventDetail: any): R;

    /**
     * Will check if the event spy received the expected event with the expected detail on the first received event.
     * @param eventDetail The expected detail of the event.
     */
    toHaveFirstReceivedEventDetail(eventDetail: any): R;

    /**
     * Will check how many times the event has been received.
     */
    toHaveReceivedEventTimes(count: number): R;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace PlaywrightTest {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Matchers<R> extends CustomMatchers<R> {}
    }
}

export {};
