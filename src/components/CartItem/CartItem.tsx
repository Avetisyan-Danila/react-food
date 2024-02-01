import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props.ts";

function CartItem(props: CartItemProps) {
  const increase = () => {};
  const descrease = () => {};
  const remove = () => {};

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>

      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["currency"]}>{props.price}&nbsp;₽</div>
      </div>

      <div className={styles["actions"]}>
        <button className={styles["button"]} onClick={descrease}>
          <img src="/add-to-cart-icon.svg" alt="Удалить из корзины" />
        </button>

        <div>{props.count}</div>

        <button className={styles["button"]} onClick={increase}>
          <img src="/add-to-cart-icon.svg" alt="Добавить в корзину" />
        </button>

        <button className={styles["remove"]} onClick={remove}>
          <img src="/add-to-cart-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
