import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button.tsx";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { getProfile, userActions } from "../../store/user.slice.ts";
import { useEffect, useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  const onBurgerClick = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  useEffect(() => {
    setIsMenuOpened(false);
  }, [location]);

  return (
    <div
      className={cn(styles["layout"], {
        [styles["layout-darken"]]: isMenuOpened,
      })}
    >
      <div
        className={cn(styles["sidebar"], {
          [styles["sidebar-active"]]: isMenuOpened,
        })}
      >
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src="/avatar.png"
            alt="Аватар пользователя"
          />

          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
        </div>

        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/menu-icon.svg" alt="Иконка меню" />
            Меню
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            Корзина
            <span className={styles["cart-count"]}>
              {items.reduce((acc, item) => acc + item.count, 0)}
            </span>
          </NavLink>
        </div>

        <Button className={styles["exit"]} onClick={logout}>
          <img src="/exit-icon.svg" alt="Иконка выхода" />
          <span>Выход</span>
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
      <div
        className={cn(styles["burger"], {
          [styles["burger-active"]]: isMenuOpened,
        })}
        onClick={onBurgerClick}
      >
        <div className={styles["burger-line"]}></div>
        <div className={styles["burger-line"]}></div>
        <div className={styles["burger-line"]}></div>
      </div>
    </div>
  );
}
