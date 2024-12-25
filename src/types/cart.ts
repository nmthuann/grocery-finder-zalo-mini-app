

export type SelectedOptions = Record<string, string | string[]>;

export interface CartItem {
  product: any;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];