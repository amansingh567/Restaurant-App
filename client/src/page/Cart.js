import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import CartAddedItem from "../components/CartAddedItem";
import PaymentSummary from "../components/PaymentSummary";

import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';


const Cart = () => {
  const user = useSelector((state) => state.user);
  const cartProduct = useSelector((state) => state.cartProduct);

  const cartTotal = cartProduct.cartProductItem.reduce(
    (acc, curr) => acc + curr.total,
    0
  );
  const deliveryCharge = cartTotal > 500 ? 0 : 50;
  const Total = cartTotal + deliveryCharge;

/********** */

const handlePayment = async(e)=>{
  const stripeURL = process.env.REACT_APP_BACKEND_URL+'/create-checkout-session'
  e.preventDefault()
    if(user.email){
    // console.log("fetc")
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const res = await fetch(stripeURL,{
        method : "POST",
        headers : {
          'content-type' : "application/json",
        },
        body : JSON.stringify(cartProduct.cartProductItem)
    })

    if(res.statusCode === 500) return ;

    const data = await res.json()
    toast("Redirect to payment gateway")
    stripePromise.redirectToCheckout({sessionId : data})
    }
  else{
    toast("your are not login!!")
  }
}
/***** */

 

  return (
    <div className="p-4">
      <h1 className="capitalize text-lg md:text-2xl  font-semibold before:rounded-lg relative before:absolute before:-bottom-2 before:content before:left-0 before:w-32 before:h-1 before:bg-red-500 transition-all ease-in-out duration-100">
        Your Shopping Cart
      </h1>

      {cartProduct.cartProductItem[0] ? (
        <>
          <p className="mt-3 ">Product</p>
          <div className="flex flex-col md:flex-row w-full mt-1 ">
            <div className="w-full ">
              {cartProduct.cartProductItem.map((el) => {
                return (
                  <CartAddedItem
                    id={el.id}
                    img={el.imgURL}
                    title={el.title}
                    qty={el.qty}
                    price={el.price}
                    total={el.total}
                  />
                );
              })}
            </div>
            <div className="w-full min-w-210 mt-5 md:mt-0 md:min-w-350 max-w-lg  relative">
              <PaymentSummary
                cartTotal={cartTotal}
                deliveryCharge={deliveryCharge}
                Total={Total}
                handlePayment = {handlePayment}
              />
             
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}

      <></>
    </div>
  );
};

export default Cart;
