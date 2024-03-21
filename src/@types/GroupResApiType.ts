interface GroupResApiType {
  id?: number,
  image?: string,
  group_name?: string,
  description?: string,
  expected_quantity?: number,
  current_quantity?: number,
  groupTime?: string,
  carts:{
    total_quantity?: number
  },
  remainingHours?: number,
  isJoined ?: boolean,
  status: string
  products:[
  ],
  receiving_station:{
    name: string,
    address: string
  }

}

export {type GroupResApiType}