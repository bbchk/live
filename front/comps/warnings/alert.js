import { Alert } from "@mui/material";
import s from "./alert.module.scss";

const CustomAlert = ({ text, severity = "info" }) => {
  return (
    <Alert severity={severity} className={s.alert}>
      {text}
    </Alert>
  );
};

export default CustomAlert;
