import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const toastSuccess = (message: string): void => {
  toast.success(message, defaultOptions);
};

export const toastError = (message: string): void => {
  toast.error(message, defaultOptions);
};
