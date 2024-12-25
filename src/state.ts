import { atom, selector } from "recoil";
import { Cart } from "./types/cart";
import { Category } from "./types/category";
import categories from "../mock/categories.json";
import { Product, Variant } from "./types/product";

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});


export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});


export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsState = selector<any[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const products = (await import("../mock/products.json")).default;
    const variants = (await import("../mock/variants.json"))
      .default as Variant[];
    return products.map(
      (product) =>
        ({
          ...product,
          variants: variants.filter((variant) =>
            product.variantId.includes(variant.id)
          ),
        } as Product)
    );
  },
});


export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}