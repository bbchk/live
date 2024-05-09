import { Alert } from "@mui/material";
import s from "./alert.module.scss";

const CustomAlert = ({ text, severity = "info", animated = true }) => {
  return (
    <Alert
      severity={severity}
      className={`${s.alert} ${animated ? s.animated : ""}`}
    >
      {text}
    </Alert>
  );
};

export default CustomAlert;
