import { atom, selector, selectorFamily } from "recoil";
import { Category } from "../types/category";
import categories from "../../mock/categories.json";
import { News } from "../types/news";
import { OldProduct, Page, Product,  } from "../types/product";
import { Cart } from "../types/cart";
import { getProductByPage } from "../utils/product";


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


export const oldProductsState = selector<OldProduct[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    return (await import("../../mock/products.json")).default;
  }
});

export const productByBarcodeState = selectorFamily<OldProduct, string>({
  key: "productByBarcode",
  get:
    (barcode) =>
    ({ get }) => {
      const products = get(oldProductsState);
      return products.find((product) => product.barcode === barcode)!;
    },
})

export const productByPageSate = selectorFamily<Page<Product>, number> ({
  key:"productByPage",
  get: (pageNumber: number) => async () => {
    const products = await getProductByPage(pageNumber);
    return products;
  }
})


export const initProductsState = selector<Page<Product>>({
  key: "initProducts",
  get: async () => {
    const baseUrl = import.meta.env.VITE_API_URL ?? "https://staging-shop.fado.vn/api";
    const url = `${baseUrl}/admin/products?page[number]=3`
    const headers = {
      accept: 'application/json',
      apiconnection: 'appmobile',
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN ?? "",
      Cookie: import.meta.env.VITE_COOKIE ?? "",
      apikey: import.meta.env.VITE_API_KEY ?? "",
    };

    
    try {
      const response = await fetch(url, { method: 'GET', headers: headers });
      const data = await response.json();
      console.log(data)
      return data;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
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
