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
import info from "../components/data.json";

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
      <Swiper className="mySwiper" loop={true} autoplay={{ delay: 3000 }}>
        {info?.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-container"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="container">
                <h1 className="text">
                  <p>{info?.price[index]}</p>
                  <span>{info?.text[index]}</span>
                </h1>
                <h1 className="text">
                  <p>{info?.price2[index]}</p>
                  <span>{info?.text2[index]}</span>
                </h1>
                <h1 className="text">
                  <p>{info?.price3[index]}</p>
                  <span>{info?.text3[index]}</span>
                </h1>
                <h1 className="text">
                  <p>{info?.price4[index]}</p>
                  <span>
                    <a>{info?.text4[index]}</a>
                  </span>
                </h1>
                <h1 className="text">
                  <p>{info?.price5[index]}</p>
                  <span>
                    <a>{info?.text5[index]}</a>
                  </span>
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="homeProducts">
        <h1> Latest Products
          <Link to="/search" className="findmore"> More </Link>
        </h1>
        <main className="productSwiper">
          <Swiper
            className="mySwiper"
            slidesPerView={4}
            loop={true}
            grabCursor={true}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1100: {
                slidesPerView: 4,
              },
              1250: {
                slidesPerView: 5,
              },
            }}
          >
            {isLoading ? (
              <Skeleton width="80vw" />
            ) : (
              <>
                {data?.products.map((product) => (
                  <SwiperSlide key={product._id}>
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
        <div className="featuredProducts">
          <p>Featured</p>
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
    </div>
  );
};

export default Home;
