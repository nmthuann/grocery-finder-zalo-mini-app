import { atom, selector, selectorFamily } from "recoil";
import { Category } from "../types/category";
import categories from "../../mock/categories.json";
import { News } from "../types/news";
import { OldProduct, Page, Product,  } from "../types/product";
import { Cart } from "../types/cart";


export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});


export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});


// export const productsByCategoryState = selectorFamily<OldProduct[], string>({
//   key: "productsByCategory",
//   get:
//     (categoryId) =>
//     ({ get }) => {
//       const allProducts = get(productsState);
//       return allProducts.filter((product) =>
//         product.categoryId.includes(categoryId)
//       );
//     },
// });


export const productByBarcodeState = selectorFamily<OldProduct, string>({
  key: "productByBarcode",
  get:
    (barcode) =>
    ({ get }) => {
      const products = get(oldProductsState);
      return products.find((product) => product.barcode === barcode)!;
    },
})

export const oldProductsState = selector<OldProduct[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    return (await import("../../mock/products.json")).default;
  }
});

export const tempProductsState = selector<Page<Product>>({
  key: "tempProducts",
  get: async () => {
    await wait(2000);
    const rawData = (await import("../../mock/flowers.json")).default;
    return rawData;
  }
})


export const newsListState = selector<News[]>({
  key: "newsList",
  get: async () => {
    await wait(2000);
    return (await import("../../mock/news-list.json")).default;
  }
})

export const cartState = atom<Cart[]>({
  key: "cart",
  default: [],
})


