interface ProductsResApiType {
  id?: string,
  product_name: string,
  images?: string,
  description?: string,
  price?: number,
  status?: number,
  brand?: string,
  quantity_sold?: number,
  quantity_inventory?: number,
  category_id: 1,
  shop_id: string,
  rating?: number,
  coupon?: any,
  sold?: number,
  stock?: number,
  avgRating?: number
}

export {type ProductsResApiType}