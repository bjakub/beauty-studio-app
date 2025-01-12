"use client";

import { useEffect, useState } from "react";

import { Alert } from "@/components/alert";

export interface ToastProps {
  text: string;
  severity: "success" | "error" | "warning" | "info";
  timeoutTime?: number;
}

const DEFAULT_TOAST_TIMEOUT = 5000;

export const Toast = (props: ToastProps) => {
  const { text, severity, timeoutTime } = props;
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeout = timeoutTime || DEFAULT_TOAST_TIMEOUT;

    const timeoutIndex = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => {
      clearTimeout(timeoutIndex);
    };
  }, [timeoutTime, text]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="toast toast-bottom toast-start transition-opacity">
      <Alert
        severity={severity}
        text={text}
      />
    </div>
  );
};
