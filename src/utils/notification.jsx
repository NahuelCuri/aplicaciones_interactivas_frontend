import React from 'react';
import { toast } from 'react-toastify';
import ToastNotification from '../components/ToastNotification';

export const showSuccessToast = (title, message) => {
  toast(<ToastNotification type="success" title={title} message={message} />, {
    progressClassName: 'Toastify__progress-bar--info', 
  });
};

export const showErrorToast = (title, message) => {
  toast(<ToastNotification type="error" title={title} message={message} />, {
    progressClassName: 'Toastify__progress-bar--error',
  });
};

export const showInfoToast = (title, message) => {
  toast(<ToastNotification type="info" title={title} message={message} />, {
    progressClassName: 'Toastify__progress-bar--info',
  });
};
