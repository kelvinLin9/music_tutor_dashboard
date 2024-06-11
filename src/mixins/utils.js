import { Toast } from "@/mixins/swal"

const showErrorToast = (message, code) => {
  Toast.fire({
    title: message || 'An unknown error occurred',
    Text: code || '',
    icon: 'error',
  });
};

export const handleErrorAsync = (targetFunction, finallyCallback) => {
  return async (...args) => {
    try {
      return await targetFunction(...args);
    } catch (error) {
      console.error('Error occurred:', error);
      showErrorToast(error.response.data.message);
      return false;
    } finally {
      if (finallyCallback) {
        finallyCallback();
      }
    }
  };
}