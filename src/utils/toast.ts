type ToastType = 'info' | 'success' | 'error';

let showToastFunction: (message: string, type: ToastType) => void;

export const setShowToastFunction = (fn: (message: string, type: ToastType) => void) => {
  showToastFunction = fn;
};

export const showToast = (message: string, type: ToastType = 'info') => {
  if (showToastFunction) {
    showToastFunction(message, type);
  } else {
    console.warn('Toast function not set. Call setShowToastFunction first.');
  }
};