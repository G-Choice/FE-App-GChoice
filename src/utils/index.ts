// const formattedPrice = (props: number) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(props);
// };

// export {formattedPrice}
// const formattedPrice = (props: number) => {
//   return new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   }).format(props);
// };

// export { formattedPrice };
const formattedPrice = (props: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3, 
  }).format(props);
};

export { formattedPrice };
