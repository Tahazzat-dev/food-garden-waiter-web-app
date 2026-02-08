// types/lang.ts
// export type TCategory = {
//     id: string;
//     name: {
//         en: string;
//         bn: string;
//     };
//     img: string;
//     slug: string;
// }

export type TActiveOrderDetailsModal = "online" | "web" | null;

// TODO: temp_
export type TCategory = {
    id: number;
    name: string;
    image: {
        link: string;
    };
    slug: string;
}

export type TPaymentType = {
    id: number;
    provider: string;
    name: TLocal;
}


export type Lang = "en" | "bn";


export type TAuthFormType = "login" | "register" | "phone" | "otp" | "reset";


export type TLocal = {
    en: string;
    bn: string;
}


// pagination 
export interface Pagination {
    current_page: number
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    next_page_url: string | null
    prev_page_url: string | null
    path: string
    per_page: number
    to: number | null
    total: number
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
}



// TODO: have to add necessary properties

export type TFoodVariant = {
    id: number;
    product_id: number;
    variation: string;       // e.g. "1:03" (Main:Sub ratio)
    cost: string;            // coming as string from API ("0.00")
    price: string;           // "500.00"
    image: string | null;
    stock: number;
    main_unit_stock: number;
    sub_unit_stock: number;
    total_sold: number;
    created_at: string | null;
    updated_at: string | null;

};

// export interface TProduct {
//     id: string;
//     categoryId: string;
//     title: TLocal;
//     des: TLocal;
//     img: string;
//     variants: TFoodVariant[];
// }


export interface TProduct {
    id: number;

    name: string;
    code: string;

    description: string | null;
    details: string | null;
    image: string | null;

    brand_id: number;
    category_id: number;

    main_unit_id: number;
    sub_unit_id: number | null;

    price: string;          // comes as string from backend
    cost: string;
    damage_price: string;

    price_editable: 0 | 1;

    stock: number;
    stock_count: number;
    total_sold: number;

    main_unit_stock: number;
    sub_unit_stock: number;

    stock_visible: 0 | 1;
    stock_visible_ecom: 0 | 1;

    pos_visible: 0 | 1;
    ecom_visible: 0 | 1;

    status: 0 | 1;

    variations: TFoodVariant[];

    created_at: string | null;
    updated_at: string | null;
}



export interface TCartProduct {
    id: number;
    productId: number;
    title: string,
    categoryId: number;
    img: string;
    name: string;
    price: number;
    discount: number;
    quantity: number;
}


export type TOrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "outForDelivery"
    | "delivered"
    | "cancelled";

export type TPaymentStatus =
    | "unpaid"
    | "paid"
    | "failed"
    | "refunded";

export type TPaymentMethod =
    | "cashOnDelivery"
    | "bkash"
    | "nagad"


export interface TOrderPriceSummary {
    subtotal: number;
    discountTotal: number;
    deliveryFee: number;
    total: number;
}


// export interface Product {
//     id: number;
//     name: string;
//     image: string | null;
// }

// export interface Variation {
//     id: number;
//     variation: string;
//     price: string; // "180.00"
// }

export interface OrderItem {
    id: number;
    order_activies_id: number;
    product_id: number;
    variation_id: number;
    qty: number;
    rate: string;     // Decimal string
    sub_total: string; // Decimal string
    product: Product;
    variation: Variation;
}


export type TCustomerType = "Online" | "Dine-In" | "Self Pickup";
// export interface TOrder {
//     id: number;
//     customer_id: number;
//     order_id: number;
//     estimate_number: string;
//     order_status: string; // e.g., "First Order"
//     estimate_date: string; // "YYYY-MM-DD"
//     delivery_date: string; // "YYYY-MM-DD"
//     final_receivable: string;
//     note: string | null;
//     items: OrderItem[];
//     delivery_charge: string;
//     convert_status: number;
//     status: number;
//     is_web?: number;
//     customer_type: TCustomerType
// }

export type CheckoutStatus = "success" | "error";

export type TOrderResponse = {
    orderId: string;
    message: string;
    status: CheckoutStatus;
}

export type TAddress = {
    id: number;
    name: string;
    delivery_charge: string;
    created_at: string | null;
    updated_at: string | null;
}





export type TCartIconposition = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
}


export interface ITable {
    id: number;
    table_no: string;
    capacity: number | null;
    status: 'available' | 'occupied' | 'reserved'; // Added common status types
    created_at: string; // ISO Date string
    updated_at: string; // ISO Date string
}

export type TSelectedTable = {
    table_id: number;
    customer_type: "Online" | "Take Way" | "Dine-In",
    label: string;
}

export interface TOrder {
    id: number;
    customer_id: number;
    customer_type: TCustomerType;
    brand_id: number;
    waiter_id: number;
    table_id: number | null;
    estimate_date: string;
    delivery_date: string;
    estimate_by: string | null;
    token_no: string;
    estimate_number: string;
    total: string;
    receivable: string;
    discount: string;
    actual_discount: string;
    delivery_charge: string;
    final_receivable: string;
    delivery_by: string | null;
    note: string | null;
    convert_status: number;
    is_approved: number;
    is_due_print: number;
    update_count: number;
    order_status: string;
    created_by: string | null;
    is_web: number;
    is_online_app: number;
    status: number;
    created_at: string;
    updated_at: string;
    customer: Customer;
    items: OrderItem[];
    waiter: TUser
}


export interface InvoiceData extends TOrder {
    billingBy: string;
}

export interface OrderItem {
    id: number;
    estimate_id: number;
    product_name: string;
    product_id: number;
    variation_id: number;
    rate: string;
    main_unit_qty: number;
    sub_unit_qty: number;
    ordered_qty: number;
    returned: number;
    returned_sub_unit: number;
    returned_qty: number;
    returned_value: string;
    damage: number;
    damaged_value: number;
    discount_return: number;
    qty: number;
    discount_qty: number;
    sub_total: string;
    ordered_sub_total: string;
    order_status: string;
    is_edit: number;
    created_by: string | null;
    is_prepared: number;
    created_at: string;
    updated_at: string;
    product: Product;
    variation: Variation;
}

export interface Product {
    id: number;
    name: string;
    code: string;
    category_id: number;
    brand_id: number;
    cost: string;
    price: string;
    damage_price: string;
    details: string | null;
    image: string;
    stock: number;
    main_unit_stock: number;
    sub_unit_stock: number;
    total_sold: number;
    price_editable: number;
    ecom_visible: number;
    pos_visible: number;
    stock_count: number;
    stock_visible: number;
    stock_visible_ecom: number;
    description: string | null;
    status: number;
    main_unit_id: number;
    sub_unit_id: number | null;
    created_at: string | null;
    updated_at: string;
}


export interface Customer {
    id: number;
    name: string;
    phone: string;
    shop_name: string | null;
    shop_name_bangla: string | null;
    address_id: number;
    sr_id: number | null;
    business_cat_id: number | null;
    opening_receivable: string;
    opening_payable: string;
    wallet_balance: string;
    total_receivable: string;
    total_payable: string;
    note: string | null;
    created_at: string;
    updated_at: string;
}

export interface TCustomer extends Customer {
    address: TAddress;
}


export interface Variation {
    id: number;
    product_id: number;
    variation: string;
    cost: string;
    price: string;
    image: string | null;
    stock: number;
    main_unit_stock: number;
    sub_unit_stock: number;
    total_sold: number;
    created_at: string | null;
    updated_at: string | null;
}

export type TUser = {
    id: number;
    brand_id: string;
    fname: string;
    lname: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};
export interface KitchenOrder {
    id: number;
    orderFor: TCustomerType;
    tableId?: number | null;
    items: TKitchenOrderItem[];
    waiter: TUser
}


export type TKitchenOrderItem = {
    id: number;
    title: string;
    variation: string;
    img: string;
    price: number;
    discount: number;
    quantity: number;
    status: "pending" | "success";
}



export interface IOrderResult extends Pagination {
    data: TOrder[]
}


