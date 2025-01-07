import { Page, Product, ProductDescription, ProductDescriptionLang } from "../types/product";



export const truncateText = (text: string, maxLength: number): string => {
  if(text == null){
    return "sản phẩm không có mô tả.";
  }
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)} ...`;
};

export const getProductNameVietNamese = (descriptions: ProductDescription[]) => {
    return descriptions.find(item => item.lang === ProductDescriptionLang.VI)?.name;

}

export const handleProductImageLink = (link: string) => {
    const prefix = "https://staging-shop.fado.vn/";
    return `${prefix}${link}`
}

export const  formatCurrency = (value: number)  =>  {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
    return value.toString();
}

export const getProductByPage = async (pageNumber: number): Promise<Page<Product>> => {
    const baseUrl = import.meta.env.VITE_API_URL ?? "https://staging-shop.fado.vn/api/admin/products?page[number]=";
    const url = `${baseUrl}/admin/products?page[number]=${pageNumber}`
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