export interface Product {
    id: number;
    name: string;
    description: string;
    path_image: string;
    thumbnail_image: string;
    price: number;
    LIV: number;
    CAC: number;
    store_id: number;
    category_id: number;
    created_at: string;
    updated_at: Date;
    is_enabled: number;
  }
  
  export interface SubProduct {
    id: number;
    name: string;
    price: number;
    store_id: number;
    group_id: number;
    created_at: Date;
    updated_at: Date;
    max: number;
    default: number;
  }
  
  export interface SubElementsOrder {
    id: number;
    price: number;
    quantity: number;
    total_amount_sub_element: number;
    element_order_id: number;
    sub_product_id: number;
    created_at: Date;
    updated_at: Date;
    sub_product: SubProduct;
  }
  
  export interface ElementsOrder {
    id: number;
    price: number;
    quantity: number;
    total_amount_element: number;
    comment?: any;
    order_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date;
    product: Product;
    sub_elements_order: SubElementsOrder[];
  }
  
  export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    email_verified_at: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Deliveryaddress {
    id: number;
    address: string;
    zip_code: string;
    city: string;
    customer_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Order {
    id: number;
    type: string;
    status: string;
    is_paid: number;
    total_amount: number;
    comment?: any;
    delivery_address_id: number | null;
    cac_address_id?: number | null;
    customer_id: number | null;
    store_id: number;
    created_at: Date;
    updated_at: Date;
    elements_order: ElementsOrder[];
    customer: Customer;
    cacaddress?: any;
    deliveryaddress: Deliveryaddress;
    planified: number;
    printed: boolean;
  }
  
  export interface Pending {
    CAC: Order[];
    LIV: Order[];
    AT_PLACE: Order[];
  }
  export interface Delivered {
    CAC: Order[];
    LIV: Order[];
    AT_PLACE: Order[];
  }
  export interface Accepted {
    CAC: Order[];
    LIV: Order[];
    AT_PLACE: Order[];
  }
  
  export interface RootObject {
    message: string;
    pending: Pending;
    accepted: Accepted;
    delivered: Delivered;
  }
  