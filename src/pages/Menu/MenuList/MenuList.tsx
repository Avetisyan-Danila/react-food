import ProductCard from "../../../components/ProductCard/ProductCard.tsx";
import { MenuListProps } from "./MenuList.props.ts";

function MenuList({ products }: MenuListProps) {
  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      name={p.name}
      ingredients={p.ingredients.join(", ")}
      image={p.image}
      price={p.price}
      rating={p.rating}
    />
  ));
}

export default MenuList;
