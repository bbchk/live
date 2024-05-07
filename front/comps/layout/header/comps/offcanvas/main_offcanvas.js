import s from "./main_offcanvas.module.scss";

import MainOffcanvasHeader from "./comps/main.offcanv_header";
import MainOffcanvasBody from "./comps/main.offcanv_body";

import { useDispatch, useSelector } from "react-redux";
import { toggleMainOffcanvas } from "store/modalSlice";

import { SwipeableDrawer, Box, Divider, Button } from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

export const MainOffcanvas = ({ id }) => {
  const dispatch = useDispatch();
  const { mainOffcanvasOpen } = useSelector((state) => state.modals);

  return (
    <SwipeableDrawer
      open={mainOffcanvasOpen}
      onClose={() => dispatch(toggleMainOffcanvas())}
      transitionDuration={{ appear: 250, enter: 250, exit: 250 }}
    >
      <Box sx={{ width: 350 }} role="presentation">
        <MainOffcanvasHeader />
        <Divider />
        <MainOffcanvasBody />
      </Box>
    </SwipeableDrawer>
  );
};

export const OffcanvasToggler = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className={`${s.offcanvas_toggler}`}
      onClick={() => dispatch(toggleMainOffcanvas())}
    >
      <MenuIcon fontSize="large" />
    </Button>
  );
};
