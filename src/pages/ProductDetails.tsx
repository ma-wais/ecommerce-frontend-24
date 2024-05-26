import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";


const ProductDetails: React.FC = ({  }) => {
  
  const dispatch = useDispatch();
    const { id } = useParams(); 
    const { data, isLoading, isError } = useProductDetailsQuery(id!); // Fetch product details using id
    const {_id, price, name, photo, stock} = data?.product || {};
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (isError) {
            // const err = error as CustomError;
            toast.error("Cannot fetch product details");
        }
    })
    const decrementHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };
    const incrementHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setQuantity((prev) => (prev < stock! ? prev + 1 : prev));
    }


    const addToCartHandler = (cartItem: CartItem,e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (cartItem.stock < 1) return toast.error("Out of Stock");
      dispatch(addToCart(cartItem));
      toast.success("Added to cart");
    };

  return (
    <>
       {isLoading ? (
        <Skeleton width="80vw" />
      ) : (
    <section className="productDetails">
      <img
        src={`${server}/${data?.product.photo}`}
        alt="cheetah hoodie"
      />
      <form action="" className="Form">
        <h2>{data?.product.name}</h2>
        <p className="Price">Rs.{data?.product.price}</p>
        <p><b>Stock:</b> {data?.product.stock}</p>
        <div>
          <button onClick={(e) => decrementHandler(e)}>-</button>
          <p>{quantity}</p>
          <button onClick={(e) => incrementHandler(e)}>+</button>
        </div>
          <small>SHIPS ON JANUARY 5, 2024</small>
          <button 
            onClick={(e) => addToCartHandler({ productId: _id!, price: price!, name: name!, photo: photo!, stock: stock!, quantity: quantity },e)}
           className="Button Primary" type="submit">Add To Cart</button>
           
        <p className="Description"><b>Description:</b> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </form>
    </section>
      )
    }
    </>
  )
}

export default ProductDetails;