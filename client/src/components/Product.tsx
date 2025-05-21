function Product(props) {
  const { title, name, category, price, images, description } = props;
  const imageUrl = images[0];
  console.log(imageUrl);
  return (
    <div className="product">
      <div>
        <div className="product-image">
          <img src={imageUrl} />
        </div>
      </div>

      <div>
        {/* <p>{name}</p> */}
        <p className="product-name">{title}</p>
        <p>{category}</p>
        <p>{price}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default Product;
