interface GroupResApiType {
  id?: number,
  image?: string,
  group_name?: string,
  description?: string,
  groupSize?: number,
  groupTime?: string,
  carts:{
    total_quantity?: number
  },
  remainingHours?: number,
  isJoined ?: boolean

}

export {type GroupResApiType}