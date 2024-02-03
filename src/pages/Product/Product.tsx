import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product.interface.ts";
import { MouseEvent, Suspense } from "react";
import styles from "./Product.module.css";
import Heading from "../../components/Headling/Heading.tsx";
import Button from "../../components/Button/Button.tsx";
import { cartActions } from "../../store/cart.slice.ts";
import { Store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";

export function Product() {
  const { data } = useLoaderData() as { data: Product };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const add = (e: MouseEvent, id: number, name: string) => {
    e.preventDefault();
    dispatch(cartActions.add(id));

    Store.addNotification({
      title: `${name} - Добавлено в корзину`,
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
    <Suspense fallback={"Загрузка"}>
      <Await resolve={data}>
        {({ data }: { data: Product }) => {
          return (
            <div className={styles["product"]}>
              <div className={styles["head"]}>
                <div className={styles["head-left"]}>
                  <button
                    className={styles["back"]}
                    onClick={() => navigate("/")}
                  >
                    <img src="/arrow-back.svg" alt="Кнопка назад" />
                  </button>
                  <Heading>{data.name}</Heading>
                </div>
                <Button onClick={(e) => add(e, data.id, data.name)}>
                  <img
                    style={{ marginRight: "10px" }}
                    src="/add-to-cart-icon.svg"
                    alt="Добавить в корзину"
                  />
                  В корзину
                </Button>
              </div>
              <div className={styles["product-info"]}>
                <div className={styles["image"]}>
                  <img
                    src={data.image}
                    alt={"Изображение товара - " + data.name}
                  />
                </div>

                <div className={styles["info"]}>
                  <div className={styles["info-block"]}>
                    <div>Цена</div>
                    <div className={styles["price"]}>
                      {data.price}&nbsp;
                      <span className={styles["currency"]}>₽</span>
                    </div>
                  </div>

                  <div className={styles["info-block"]}>
                    <div>Рейтинг</div>
                    <div className={styles["rating"]}>
                      {data.rating}&nbsp;
                      <img src="/star-icon.svg" alt="Иконка звезды" />
                    </div>
                  </div>

                  <div className={styles["ingredients"]}>
                    <div>Состав:</div>
                    <ul>
                      {data.ingredients.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
