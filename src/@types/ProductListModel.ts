interface ProductListModel {
  id?: string,
  image?: string,
  title?: string,
  description?: string,
  price?: number,
  rating?: number,
  coupon?: any,
  sold?: number,
  stock?: number,
  status?: number
}

export type {ProductListModel}