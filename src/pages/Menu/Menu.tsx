import Heading from "../../components/Headling/Heading.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from "./Menu.module.css";

export function Menu() {
  return (
    <div className={styles["head"]}>
      <Heading>Меню</Heading>
      <Search placeholder="Введите блюдо или состав" />
    </div>
  );
}
