import { atom, selector, selectorFamily } from "recoil";
import { Cart } from "./types/cart";
import { Category } from "./types/category";
import categories from "../mock/categories.json";
import { Product, Variant } from "./types/product";
import { getUserInfo } from "zmp-sdk";

export const userState = selector({
  key: "user",
  get: async () => {
    const { userInfo } = await getUserInfo({ autoRequestPermission: true });
    return userInfo;
  },
});


export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});


export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});


export const cartState = atom<Cart>({
  key: "cart",
  default: []
})

export const totaltotalQuantityState = selector({
  key: "totalQuantity",
  get:({get}) => {
    const cart = get(cartState);
    return cart.reduce((total, item)=>total + item.quantity,0);
  }
})

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

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});


export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}