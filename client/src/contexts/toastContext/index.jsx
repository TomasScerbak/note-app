/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../../components/modals/Toast.jsx";

const toastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, color = "positive", duration = 5000 }) => {
    const id = Date.now(); // Simple unique ID

    const newToast = { id, message, color };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <toastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} color={toast.color} />
      ))}
    </toastContext.Provider>
  );
};

export const useToast = () => useContext(toastContext);
