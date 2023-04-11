export interface Order {
  orderId: string;
  createdDate: string;
  createdByUserName: string;
  orderType: string;
  customerName: string;
}

export interface Orders {
  loading: string;
  error: boolean;
  data: [
    {
      orderId: string;
      createdDate: string;
      createdByUserName: string;
      orderType: string;
      customerName: string;
    }
  ];
  order: Order;
}
