import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";


const ProductDetails: React.FC = ({  }) => {
  
    const { id } = useParams(); 
    const { data, isLoading, isError } = useProductDetailsQuery(id!); // Fetch product details using id
    const dispatch = useDispatch();
    const {_id, price, name, photo, stock} = data?.product || {};
    console.log(data);
    useEffect(() => {
        if (isError) {
            // const err = error as CustomError;
            toast.error("Cannot fetch product details");
        }
    })

    const addToCartHandler = (cartItem: CartItem,e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (cartItem.stock < 1) return toast.error("Out of Stock");
      dispatch(addToCart(cartItem));
      toast.success("Added to cart");
    };
    // const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if (data?.product) {
    //         handler({
    //             productId: _id!,
    //             price: price!,
    //             name: name!,
    //             photo: photo!,
    //             stock: stock!,
    //             quantity: 1,
    //         });
    //     }
    // };
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

        <div className="Price">Rs.{data?.product.price}</div>
         <p style={{padding:"20px 0"}}>Availability:  
            <b style={{color:data?.product.stock! > 0 ? "rgb(17, 229, 27)" : "red"}}>
                {data?.product.stock! > 0 ? " In Stock" : "Out of Stock"}
            </b>
            </p>
         <small>SHIPS ON JANUARY 5, 2024</small>
          <button 
            onClick={(e) => addToCartHandler({ productId: _id!, price: price!, name: name!, photo: photo!, stock: stock!, quantity: 1 },e)}
           className="Button Primary" type="submit">Add To Cart</button>
        <p className="Description">Description: <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </form>
    </section>
      )
    }
    </>
  )
}

export default ProductDetails;