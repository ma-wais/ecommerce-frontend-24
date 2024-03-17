import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import info from "../components/data.json"

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home">
      <Swiper className="mySwiper" loop={true}>
        {info?.images.map((i) => (
          <SwiperSlide key={i}
          >
            <img src={i} alt="" style={{width: "100%", height: "100vh" }} />
            </SwiperSlide>
        ))}
      </Swiper>
      {/* <section></section> */}

      <div style={{ padding: "0 100px"}}>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <Swiper className="mySwiper" slidesPerView={4} loop={true} grabCursor={true} 
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          710: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
          1240: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 5,
          }
        }}>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          <>
            {data?.products.map((product) => (
              <SwiperSlide key={product._id}

              >
                <ProductCard
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                  photo={product.photo}
                  category={product.category}
                />
                
        </SwiperSlide>
      ))}
    </>
  )}
      </Swiper>

      </main>
      </div>
      <div className="featuredProducts">
        <p>
          Featured
        </p>
      <main>
       
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          <>
            {data?.products.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                  photo={product.photo}
                  category={product.category}
                />
                
      ))}
    </>
  )}

      </main>
      </div>
    </div>
  );
};

export default Home;
