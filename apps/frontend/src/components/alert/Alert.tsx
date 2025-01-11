import { AlertSeverityClassnameMap, getAlertIcon } from "@/components/forms/alert/Alert.utils";

export interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  text: string;
}

export const Alert = ({ severity, text }: AlertProps) => {
  const icon = getAlertIcon(severity);

  return (
    <div
      role="alert"
      className={`alert ${AlertSeverityClassnameMap[severity]}`}
    >
      {icon}

      <span>{text}</span>
    </div>
  );
};
