import { Keyboard } from 'react-native';

export const appearListener: any = { current: null };
export const setListener = (listener: any) => (appearListener.current = listener);

const poppingCounter: any = { isClosing: false, pendingActions: [] };

export function addActionAfterClosingSheet(action: any) {
  if (poppingCounter.isClosing) {
    poppingCounter.pendingActions.push(action);
  } else {
    action();
  }
}

export function onWillPop() {
  poppingCounter.isClosing = true;
}

export function onDidPop() {
  poppingCounter.isClosing = false;
  if (poppingCounter.pendingActions.length !== 0) {
    setImmediate(() => {
      poppingCounter.pendingActions.forEach((action: any) => action());
      poppingCounter.pendingActions = [];
    });
  }
}

export const nativeStackConfig = {
  mode: 'modal',
  screenOptions: {
    contentStyle: {
      backgroundColor: 'transparent',
    },
    onAppear: () => {
      appearListener.current && appearListener.current();
    },
    onDismissed: onDidPop,
    onTouchTop: ({ nativeEvent: { dismissing } }: any) => {
      if (dismissing) {
        Keyboard.dismiss();
      } else {
        appearListener.current && appearListener.current();
      }
    },
    onWillDismiss: onWillPop,
    showDragIndicator: false,
    springDamping: 0.8,
    stackPresentation: 'modal',
    transitionDuration: 0.35,
  },
};
