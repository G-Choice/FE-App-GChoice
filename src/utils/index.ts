const formattedPrice = (props: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props);
};

export {formattedPrice}