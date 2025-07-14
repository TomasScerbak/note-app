/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../../components/modals/Toast.jsx";

const toastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, color = "positive", duration = 5000 }) => {
    const id = Date.now(); // Simple unique ID
    const newToast = { id, message, color, duration };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  return (
    <toastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          color={toast.color}
          duration={toast.duration}
          onRemove={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
        />
      ))}
    </toastContext.Provider>
  );
};

export const useToast = () => useContext(toastContext);
