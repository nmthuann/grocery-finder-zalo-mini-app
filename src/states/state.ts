import { atom, selector, selectorFamily } from "recoil";
import { Category } from "../types/category";
import categories from "../../mock/categories.json";
import { News } from "../types/news";
import { OldProduct, Page, Product,  } from "../types/product";
import { Cart } from "../types/cart";


// export const productsState = selector<Page<Product>>({
//   key: 'productPages',
//   get: async () => {
//     const url = 'https://staging-shop.fado.vn/api/admin/products?page[number]=3';

//     const headers = {
//       'accept': 'application/json',
//       'apiconnection': 'appmobile',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 1|CVPgFpL9i1kYdzGUrz02ySMn76kBoseALxXHHDL713f60738',
//       'Cookie': 'XSRF-TOKEN=eyJpdiI6Im1XR1JPRFRXMis1a1F3VktodGo4N0E9PSIsInZhbHVlIjoiZWhZQmlOZWZwWVVienZyM2N6c1dwQm5XeDdPNkNhR2FwMGdsdGhUWGs2dGRxbzZrRDhrWVNub21DM2lkMHZ0V1BVaElwdm5TbDBPRUVFQ0owTkNUUURhUmdYM1RSSC9ZU1pTM1VDUmY3aGZYeDdWZCtZMFNCR2RQcEJEUFVIenIiLCJtYWMiOiIxMmMwZWU5ZDRjYjM3MTQwOGY1MDMzMDkxZjRkNGM0NzQwNWY0ZDI4NGUyMjIwZTlkYTlhMmEzNWNiZGY4ZTFlIiwidGFnIjoiIn0%3D; shop_session=eyJpdiI6IlMzOEVaY09idDByQ1ZxNkJMSHNOdkE9PSIsInZhbHVlIjoiY0JkU3pFOUhLK2lGN0pVbkYxRytkWm8vWTZTZVY3M1JORFNMS2dQSXFhbU1Kd1JESUF3UWZCcmg5T0Zxdms0ZXdZckFYaTg3c1FveklubnY4SFNaNzhqL21nYXpEd2kzanVGQlZURGppZ2phcnhBbXlnZHRFTlMxbEJZNjNUU3oiLCJtYWMiOiJiODM2YmU3ZDI0ZDhiNDdjZTVkYjAxNjljYzA2YjFmY2E4OWI5ZmRmMGY5ODVkNGE5MjU0NjAxNDZjNGI5YjY4IiwidGFnIjoiIn0%3D',
//       'apikey': '9cdfc6b4-2b4b-44b5-b427-b27c0dc32dfa'
//     };

//     try {
//       const response = await fetch(url, { method: 'GET', headers: headers });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error; 
//     }
//   },
// });


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


