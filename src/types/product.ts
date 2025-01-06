export type Page<T> = {
 current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}


export type OldProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  categoryId: string[];
  description?: string;
  barcode: string;
} 

export type Product = {
id: string;
    sku: string;
    upc: string | null;
    ean: string | null;
    jan: string | null;
    isbn: string | null;
    mpn: string | null;
    image: string;
    brand_id: string;
    supplier_id: string;
    price: string;
    cost: string;
    stock: number;
    sold: number;
    minimum: number;
    weight_class: string;
    weight: string;
    length_class: string;
    length: string;
    width: string;
    height: string;
    kind: number;
    property: string;
    tax_id: string;
    status: number;
    approve: number;
    sort: number;
    view: number;
    alias: string;
    date_lastview: string;
    date_available: string;
    created_at: string;
    updated_at: string;
    images: string[];
    descriptions: ProductDescription[];
    promotion_price: string | null;
    attributes: ProductAttribute[];
}

export type ProductDetail  = {
  id: string,
  sku: string,
  image: string,
  brand_id: string,
  supplier_id: string
  price: number,
  cost: number,
  stock: number,
  sold: number,
  minimum: number,
  weight_class: string,
  weight: number,
  length_class: string,
  length: number,
  width: number,
  height: number,
  kind: number,
  property: string,
  tax_id: string,
  status: boolean,
  approve: boolean,
  sort: number,
  view: number,
  images: Image[] | [],
  descriptions: ProductDescription[],
  promotion_price: string | null,
  attributes: ProductAttribute [] | []

}

export type ProductModel = Product | ProductDetail;


export type ProductDescription = {
  product_id: string,
  lang: string,
  name: string,
  keyword: string | null,
  description: string | null,
  content: string
}

export type ProductAttribute = {
  attribute: string;
}

export type Image = {
  image: string;
}

export enum ProductStatus {
  OutOfStock = 0,  // Hết hàng
  InStock = 1      // Còn hàng
}

export enum ProductDescriptionLang {
  VI = 'vi',
  EN = 'en'
}



export type  PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
}

