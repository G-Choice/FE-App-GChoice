const formattedPrice = (props: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3, 
  }).format(props);
};

export { formattedPrice };
