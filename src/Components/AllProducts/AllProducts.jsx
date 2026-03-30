import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { WishListContext } from '../../Context/WishListConteaxt'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContext'
import Aos from 'aos'

export default function AllProducts(props) {
    const { wishlist , addTowishList ,removeProduct , getLoggedUserWislist} = useContext(WishListContext)
    const { setNumOfCartItems} = useContext(cartContext)


async function getAllProducts() {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    return  res.data.data
}

    const {data} = useQuery("getAllProducts" , getAllProducts) 
    const filteredProducts = data?.filter((product) => product.category.name === props.type);

        //////////////  Add To Cart //////////////
        async function addToCart (productId) {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{
              productId
              
              
            }, {
              headers : {
                token : localStorage.getItem(`userToken`)
              }
            } )
            toast.success(data.message)
            setNumOfCartItems(data.numOfCartItems);
            console.log(data);
            
          }

          async function addProductToWishList(id) {

            
        
            if (wishlist.includes(id)) {
              removeProduct(id);
              toast.success(
                <div className="text-center">
                  Your product has been successfully remove from WishList &#129300;
                </div>,
                {
                  duration: 1000,
                  icon: (
                    <div className="fa-2x text-danger">
                      <i className="fa-solid fa-heart-crack"></i>
                    </div>
                  ),
                  position: "top-center",
                }
              );
            }
            else {
              await addTowishList(id)
              toast.success(
                <div className="text-center">
                  Your product has been successfully Added To WishList &#129303;
                </div>,
                {
                  duration: 1000,
                  icon: (
                    <div className="fa-2x text-danger">
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  ),
                  position: "top-center",
                }
              );
            }
          }
    
          useEffect(()=> {
            getLoggedUserWislist()
            Aos.init({
                offset: 100,
                easing: 'ease-in-sine',
                delay: 0,
              });
        }, [])


  return     <>
  <div className='all-Products'>
    <div className='TrendingProduct'>
      <div className='container '>
        <div className='row gy-3'>
        {filteredProducts?.map((product , index)=> {
            return <div key={index} 
            data-aos={index % 2 == 0 ? `fade-up` : `fade-down`}
            data-aos-duration="1000"
            className="col-md-6  col-lg-3">
                <div className="TrendingItem ">
                <div className="TrendingIcon ">
                <i onClick={()=> {addProductToWishList(product.id)}}  className={`fa-solid fa-heart ${wishlist.includes(product.id) ? " main-color" : "text-main"} `} ></i>
                </div>
                <div className="itemImg text-center">
                        <img src={product.imageCover} loading='lazy'  height={200} alt={product.title} />
                </div>
                
                    <div className="Iteminfo p-2   ">
                        <div className="itemInfo  d-flex  justify-content-between  " >
                            <h4 className='h6 '>{product.title.split(' ').splice(0, 2).join(' ')}</h4> 
                            <i className="fa-solid fa-star text-warning "><span className='text-muted'>{product.ratingsAverage}</span></i> 
                        </div>
                          <span className='main-color'>{product.category.name}</span>
                        <div className="TrendingIcon2  d-flex  justify-content-between">
                        <p>EGY {product.price}</p>
                        <i onClick={()=> addToCart(product.id) } className="fa-solid fa-cart-plus main-color"></i>
                        </div> 
                    </div>
                </div>
            </div>
        })}
        </div>
      </div>
    </div>
  </div>
</>
}
