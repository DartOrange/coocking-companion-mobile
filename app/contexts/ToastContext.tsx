import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

type ToastType = "success" | "error" | "info";

interface ToastData {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (data: ToastData) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [opacity] = useState(new Animated.Value(0));

  const showToast = useCallback((data: ToastData) => {
    setToast(data);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, data.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View style={[styles.toastContainer, { opacity }]}>
          <View style={[styles.toast, styles[toast.type || "info"]]}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    zIndex: 9999,
    width: Dimensions.get("window").width - 40,
  },
  toast: {
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  toastText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#F44336",
  },
  info: {
    backgroundColor: "#2196F3",
  },
});
