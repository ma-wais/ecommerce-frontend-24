import { FaCartPlus, FaInfo } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useNavigate } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
  category: string
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
  category
}: ProductsProps) => {

  const navigate = useNavigate();
  const handleBuyClick = () => {
    handler({ productId, price, name, photo, stock, quantity: 1 });
  };
  return (
  <div className="wrapper">
    <div className="container">
      <div className="top" onClick={() => navigate(`/product/${productId}`)}><img src={`${server}/${photo}`} alt={name} /></div>
      <div className="bottom">
        <div className="left">
          <div className="details">
            <h5 onClick={() => navigate(`/product/${productId}`)}>{name}</h5>
            <p>Rs.{price}</p>
          </div>
          <div className="buy" onClick={handleBuyClick} >
            <FaCartPlus />
          </div>
        </div>
      </div>
    </div>
    <div className="inside">
      <div className="icon"><FaInfo /></div>
      <div className="contents">
        <table>
          <tbody> 
            <tr>
              <th>Name</th>
              <th>{name}</th>
            </tr>
            <tr>
              <th>Price</th>
              <th>{price}</th>
            </tr>
            <tr>
              <th>Stock</th>
            <th>{stock}</th>
            </tr>
            <tr>
              <th>Category</th>
              <td>{`: ${category}`}</td>
            </tr>
            {/* <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr> */}
            {/* <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default ProductCard;
