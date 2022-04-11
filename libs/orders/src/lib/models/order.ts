/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from './order-item';
import { User } from '@shopsite/users';
//get user from another library
// export class Order {
//   id!: string;
//   orderItems?: OrderItem[];
//   shippingAddress1?: string;
//   shippingAddress2?: string;
//   city?: string;
//   zip?: string;
//   country?: string;
//   phone?: string;
//   status?: number;
//   totalPrice?: string;
//   user?: User;
//   dateOrdered?: string;
// }

export class Order {
    id?: any;
    orderItems!: OrderItem[];
    shippingAddress1!: string;
    shippingAddress2!: string;
    city!: string;
    zip!: string;
    country!: string;
    phone!: string;
    status!: string;
    totalPrice?: number;
    user?: any;  //to avoid conflict between admin and user shipping detaills
    dateOrdered!: string;
  }
