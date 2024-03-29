import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props.ts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { cartActions } from "../../store/cart.slice.ts";
import { MouseEvent } from "react";
import { Store } from "react-notifications-component";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));

    Store.addNotification({
      title: `${props.name} - Добавлено в корзину`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__flipInY"],
      animationOut: ["animate__animated", "animate__flipOutX"],
      dismiss: {
        duration: 5000,
      },
    });
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <div className={styles["price"]}>
            {props.price}&nbsp;
            <span className={styles["currency"]}>₽</span>
          </div>

          <button className={styles["add-to-cart"]} onClick={add}>
            <img src="/add-to-cart-icon.svg" alt="Добавить в корзину" />
          </button>

          <div className={styles["rating"]}>
            {props.rating}&nbsp;
            <img src="/star-icon.svg" alt="Иконка звезды" />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.name}</div>
          <div className={styles["description"]}>{props.ingredients}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
