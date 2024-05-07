import Link from "next/link";
import Image from "next/image";

import { pacifico } from "pages/_app";

import s from "./main.offcanv_header.module.scss";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function MainOffcanvasHeader() {
  return (
    <AppBar position="static" className={`${s.header}`}>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <Image
            src={"/assets/logo.svg"}
            alt="Логотип магазину"
            width={30}
            height={30}
          />
        </IconButton>
        <Typography
          variant="h6"
          className={`${pacifico.className} ${s.shop_name}`}
        >
          Живий світ
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
