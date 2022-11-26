import { Shipment } from '../shipment/entity/shipment.entity';
import { CartEyewear } from './entity/cartEyewear.entity';
import { Payment } from './entity/payment.entity';
import { Customer } from 'src/auth/entity/customer.entity';
import { EOrderStatus } from 'src/common/constants';

export interface IGetOrderRes {
  cart: CartEyewear[];
  id: number;
  createdAt: Date;
  totalPrice: number;
  status: EOrderStatus;
  customer: Customer;
  payment: Payment;
  shipment: Shipment;
}
