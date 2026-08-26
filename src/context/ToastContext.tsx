import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X, ArrowRight } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'booking';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (options: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
  }) => string;
  success: (title: string, message?: string, duration?: number) => string;
  error: (title: string, message?: string, duration?: number) => string;
  info: (title: string, message?: string, duration?: number) => string;
  bookingSuccess: (details: { title?: string; message?: string; date?: string }) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback((options: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
  }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = options.duration ?? 4500;

    const newToast: ToastItem = {
      id,
      type: options.type || 'success',
      title: options.title,
      message: options.message,
      duration,
      action: options.action,
      createdAt: Date.now(),
    };

    setToasts(prev => [newToast, ...prev].slice(0, 4));

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  const success = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'success', title, message, duration });
  }, [showToast]);

  const error = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'error', title, message, duration });
  }, [showToast]);

  const info = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'info', title, message, duration });
  }, [showToast]);

  const bookingSuccess = useCallback((details: { title?: string; message?: string; date?: string }) => {
    const title = details.title || 'Booking Request Confirmed!';
    const message = details.message || (details.date 
      ? `Your reservation request for ${details.date} has been dispatched. Our team will contact you shortly.` 
      : 'Your event reservation request has been submitted successfully.');
    return showToast({ type: 'booking', title, message, duration: 5500 });
  }, [showToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        info,
        bookingSuccess,
        dismissToast,
        clearAllToasts,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: () => void;
}

export const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'booking':
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
      case 'success':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'error':
        return (
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  const getCardStyle = () => {
    switch (toast.type) {
      case 'booking':
        return 'border-indigo-200 bg-white shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/10';
      case 'success':
        return 'border-emerald-200 bg-white shadow-lg shadow-emerald-500/5';
      case 'error':
        return 'border-rose-200 bg-white shadow-lg shadow-rose-500/5';
      case 'info':
      default:
        return 'border-slate-200 bg-white shadow-lg';
    }
  };

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto relative w-full rounded-2xl p-4 border ${getCardStyle()} flex items-start gap-3 transition-all duration-200 transform animate-fast-in group`}
    >
      {getIcon()}

      <div className="flex-1 min-w-0 pr-6">
        <h5 className="font-bold text-sm text-slate-900 leading-snug">
          {toast.title}
        </h5>
        {toast.message && (
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>{toast.action.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
