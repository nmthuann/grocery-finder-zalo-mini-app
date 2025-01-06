import { ProductDescription, ProductDescriptionLang } from "../types/product";



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