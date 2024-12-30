import { getUserInfo } from "zmp-sdk";
import { atom, selector, selectorFamily } from "recoil";
import { Cart } from "./types/cart";
import { Category } from "./types/category";
import categories from "../mock/categories.json";
import { Product, } from "./types/product";
import { News } from "./types/news";

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


export const productByBarcodeState = selectorFamily<Product, string>({
  key: "productByBarcode",
  get:
    (barcode) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.find((product) => product.barcode === barcode)!;
    },
})

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
   return (await import("../mock/products.json")).default;
  }
});

export const newsListState = selector<News[]>({
  key: "newsList",
  get: async () => {
    await wait(2000);
    return (await import("../mock/news-list.json")).default;
  }
})

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}