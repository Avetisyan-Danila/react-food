import {Link, Outlet} from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button.tsx";

export function Layout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img className={styles["avatar"]} src="/avatar.png" alt="Аватар пользователя"/>

          <div className={styles["name"]}>Аветисян Данила</div>
          <div className={styles["email"]}>avetisyandanila21@yandex.ru</div>
        </div>

        <div className={styles["menu"]}>
          <Link to='/' className={styles["link"]}>
            <img src="/menu-icon.svg" alt="Иконка меню"/>
            Меню
          </Link>

          <Link to='/cart' className={styles["link"]}>
            <img src="/cart-icon.svg" alt="Иконка корзины"/>
            Корзина
          </Link>
        </div>

        <Button className={styles["exit"]}>
          <img src="/exit-icon.svg" alt="Иконка выхода"/>
          <span>Выход</span>
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
