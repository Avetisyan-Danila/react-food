import Heading from "../../components/Headling/Heading.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import CartItem from "../../components/CartItem/CartItem.tsx";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface.ts";
import axios from "axios";
import { PREFIX } from "../../helpers/API.ts";
import styles from "./Cart.module.css";
import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice.ts";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);

      if (!product) return 0;
      return i.count * product.price;
    })
    .reduce((acc, i) => acc + i, 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    );

    dispatch(cartActions.cleanCart());
    navigate("/success");
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Heading className={styles["title"]}>Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);

        if (!product) return;
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}

      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог</div>
        <div className={styles["price"]}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>

      <hr className={styles["hr"]} />

      <div className={styles["line"]}>
        <div className={styles["text"]}>Доставка</div>
        <div className={styles["price"]}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>

      <hr className={styles["hr"]} />

      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Итог <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div className={styles["price"]}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>

      <div className={styles["checkout"]} onClick={checkout}>
        <Button appearance="big">Оформить</Button>
      </div>
    </>
  );
}
