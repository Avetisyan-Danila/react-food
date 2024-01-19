import styles from "./Search.module.css";
import cn from "classnames";
import { forwardRef } from "react";
import { SearchProps } from "./Search.props.ts";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <div className={styles["input-wrapper"]}>
      <input {...props} ref={ref} className={cn(styles["input"], className)} />

      <img
        className={styles["icon"]}
        src="/search-icon.svg"
        alt="Иконка поиска"
      />
    </div>
  );
});

export default Search;
