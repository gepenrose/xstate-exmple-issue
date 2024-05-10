import { fromPromise, setup } from 'xstate';


function timeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// eslint-disable-next-line import/no-default-export
export const creditCheckMachine = setup({
  types: {
    input: {} as { formId: string; templateId: string },
    // context: {} as { formId: string; templateId: string },
    events: {} as { type: 'SAVE' } | { type: 'REJECT' } | { type: 'SUBMIT' } | { type: 'APPROVE' },
  },
  schemas: {
    events: {
      SAVE: {
        type: 'object',
        properties: {},
      },
      REJECT: {
        type: 'object',
        properties: {},
      },
      SUBMIT: {
        type: 'object',
        properties: {},
      },
      APPROVE: {
        type: 'object',
        properties: {},
      },
    },
    // context: {
    //   // user: {
    //   //   type: 'object',
    //   //   description: 'requested user',
    //   //   properties: {},
    //   // },
    //   // document: {
    //   //   type: 'object',
    //   //   description: 'form document',
    //   //   properties: {},
    //   // },
    // },
  },
  // actions: {
  //   'notify-submit': async function ({ context, event }, params) {
  //     await timeout(2000);
  //     console.log('sending email-->', 'notify-submit');
  //     console.log(context, event, params);
  //     // send email
  //     // Add your action code here
  //     // ...
  //   },
  //   'notify-reject': function ({ context, event }, params) {
  //     console.log('sending email-->', 'notify-reject');
  //     console.log(context, event, params);
  //     // send email
  //     // Add your action code here
  //     // ...
  //   },
  //   'notify-aprove': function ({ context, event }, params) {
  //     console.log('sending email-->', 'notify-aprove');
  //     console.log(context, event, params);
  //     // send email
  //     // Add your action code here
  //     // ...
  //   },
  // },
  // actors: {
  //   updateService: fromPromise(async () => {
  //     await timeout(2000);
  //     // console.log('In INVOKE', input);
  //     // throw new Error("im here");
  //     // console.log('In INVOKE', input);
  //     return 'success';
  //   }),
  // },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwIYFsAOAbMBaA7gPYBOA1gGZaH4B0AIgEoCCAYgCoDEAygKoBCAWQCSbANoAGALqJQGQrACWAFwWEAdjJAAPRAEYArLpoHx4gEziAHAE5dANgDs4gCwOANCACee28fF2zXQBmM2dxa2t9AF8oj1RMHAISCipaRlZOLiYANQBRCWkkEDlFFXVNHQRDGhDdS0szB3rnQP1nD28EYLsaayCHZ11ba0aw-UsYuPRsPCIySmoaAAVcgDk6IVWAcQ4GXIApXIBhMSlNEuVVDSLKu2dLGnqHOxd9IJbrVw69f0eDAPCln0wzMkxA8RmSXmqWWaw22w4TCWSwYAHk8gVzvJLuUbog7g8ni9nG8Pl8vIhAs5esD3pZxEFxPoHP1omC1IQIHBNBDEnMUtQsaUrhVELhdN8ELh9L0InL5XLLHYwbzZskFmlmOwhTjrqBKuTOkNxDQHHKzNZxA5grp-MrYuDpnz1TCVutNlsdWU9dpKU5Tf5Gg4moFAizJcEHq56XYgpZdAZnP0giqnWroYs9ocTrk6F6RXiEE0jLoHIZQmY3pYQmZJfGaI59OJdKFzJZg6mEumBbQkSj0bn87j9Yhi8Yyy2WlWaxGbH920FPq43gYYjEgA */
  id: 'sample-workflow',
  initial: 'DRAFT',
  states: {
    DRAFT: {
      on: {
        SUBMIT: {
          target: 'PENDING',
        },
        SAVE: {
          target: 'DRAFT',
        },
      },
    },
    PENDING: {
      on: {
        REJECT: {
          target: 'REJECTED',
        },
        APPROVE: {
          target: 'APPROVED',
        },
      },
      // NOTE: these entries will not run until setUp has associated portions included/ commented out
      // entry: {
      //   type: 'notify-submit',
      // },
      description: 'awaiting approval or rejection',
      // invoke: {
      //   input: {},
      //   src: 'updateService',
      //   id: 'updateService',
      // },
    },
    REJECTED: {
      type: 'final',
      // entry: {
      //   type: 'notify-reject',
      // },
    },
    APPROVED: {
      type: 'final',
      // entry: {
      //   type: 'notify-aprove',
      // },
    },
  },
});

