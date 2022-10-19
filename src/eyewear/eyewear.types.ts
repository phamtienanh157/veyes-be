export interface IListEyewearRes {
  id: number;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
  code: string;
  thumbnail: string;
}

export interface IColor {
  id: number;
  name: string;
  code: string;
}

export interface IListBrandRes {
  id: number;
  name: string;
}

export interface IListTypeRes {
  id: number;
  name: string;
}