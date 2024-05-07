import s from "./main.offcanv_body.module.scss";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle,
  Favorite,
  Interests,
  ReceiptLong,
  ShoppingCart,
  MeetingRoom,
} from "@mui/icons-material";
import { balsamiqSans } from "#root/pages/_app.js";

import { signOut, useSession } from "next-auth/react";
import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

function MainOffcanvasBody() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className={`${balsamiqSans.className}`}>
      <List>
        {session ? (
          <>
            <List>
              <ItemLink
                text="Особистий кабінет"
                href={`/profile/personal_data`}
              >
                <Image
                  className={`${s.user_avatar}`}
                  src={user.image}
                  width={50}
                  height={50}
                  sizes="5vw"
                  alt="користувача"
                />
              </ItemLink>
            </List>
            <Divider />
            <ItemLink text="Усі категорії товарів" href="/">
              <Interests />
            </ItemLink>
            <ItemLink text="Список бажань" href="/profile/wish_list">
              <Favorite />
            </ItemLink>
            <ItemLink text="Мої замовлення" href="/profile/orders_list">
              <ReceiptLong />
            </ItemLink>
          </>
        ) : (
          <>
            <List>
              <ItemButton
                text="Увійти в акаунт"
                onClick={() => dispatch(toggleSignInModal())}
              >
                <AccountCircle />
              </ItemButton>
            </List>
            <Divider />
            <ItemLink text="Усі категорії товарів" href="/">
              <Interests />
            </ItemLink>
          </>
        )}
        <ItemButton
          text="Кошик покупок"
          component="button"
          onClick={() => {
            console.log("bug");
          }}
        >
          <ShoppingCart />
        </ItemButton>
      </List>
      <Divider />

      <List className={`${s.dotted_list}`}>
        <ListHeading text="Інформація про магазин" />
        <ItemLink text="Про нас" href="/info" />
        <ItemLink text="Політика приватності" href="/privacy-policy" />
        <ItemLink text="Умови використання сайту" href="/terms-of-usage" />
      </List>

      {session && (
        <>
          <Divider />
          <List>
            <ItemButton
              text="Вийти з акаунту"
              onClick={() => {
                signOut({ callbackUrl: "/" }).then(() => {
                  window.location.href = "/";
                });
              }}
            >
              <MeetingRoom />
            </ItemButton>
          </List>
        </>
      )}
    </div>
  );
}

export default MainOffcanvasBody;

const Item = ({ text, component, onClick, href, children }) => {
  return (
    <ListItem
      className={`${s.item}`}
      button
      component={component}
      href={href}
      onClick={onClick}
    >
      {children && (
        <ListItemIcon className={`${s.item_icon}`}>{children}</ListItemIcon>
      )}
      <ListItemText
        primaryTypographyProps={{
          className: `${balsamiqSans.className} ${s.item_text}`,
        }}
        primary={text}
      />
    </ListItem>
  );
};

const ItemButton = ({ text, onClick, children }) => {
  return (
    <Item text={text} component="button" onClick={onClick}>
      {children}
    </Item>
  );
};

const ItemLink = ({ text, href, children }) => {
  return (
    <Item text={text} component="a" href={href}>
      {children}
    </Item>
  );
};

const ListHeading = ({ text }) => {
  return (
    <Typography
      className={`${s.list_heading} ${balsamiqSans.className}`}
      variant="h6"
    >
      {text}
    </Typography>
  );
};
