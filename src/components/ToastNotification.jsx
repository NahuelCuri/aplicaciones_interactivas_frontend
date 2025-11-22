import React from 'react';

const toastConfig = {
  success: {
    icon: 'check_circle',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  info: {
    icon: 'info',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  error: {
    icon: 'error',
    iconColor: 'text-error',
    bgColor: 'bg-error/20',
  },
};

const ToastNotification = ({ type = 'info', title, message, closeToast }) => {
  const { icon, iconColor, bgColor } = toastConfig[type] || toastConfig.info;

  return (
    <div className="flex w-full items-start gap-4 p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bgColor} ${iconColor}`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-medium text-foreground-light dark:text-gray-100">{title}</p>
        <p className="text-sm text-placeholder-light dark:text-gray-400">{message}</p>
      </div>
      <button onClick={closeToast} className="shrink-0 text-text-secondary/60 hover:text-text-primary dark:text-gray-500 dark:hover:text-gray-300">
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
};

export default ToastNotification;
