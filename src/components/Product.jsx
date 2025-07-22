import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImg1 from '../assets/images/Mens/five.jpg';
import ProductImg2 from '../assets/images/Mens/six.jpg';
import ProductImg3 from '../assets/images/Mens/seven.jpg';
import { Tabs, Tab } from 'react-bootstrap'
import { apiUrl } from './common/http'


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [validThumbsSwiper, setValidThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);
    const param = useParams();
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);

    // fetch product details 
    const fetchProduct = async () => {
        const res = await fetch(`${apiUrl}/get-product/${param.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then(res => res.json())
          .then(result => {
    
            if (result.status == 200) {
              setProduct(result.data);
              setProductImages(result.data.product_images);
              setProductSizes(result.data.product_sizes);
            } else {
              console.log("something went wrong...");
            }
          });
      }
    useEffect(() => {
        fetchProduct();

        if (thumbsSwiper && !thumbsSwiper.destroyed) {
            setValidThumbsSwiper(thumbsSwiper);
        }
    }, [thumbsSwiper]);
    return (
        <Layout>
            <div className="container py-5 product-detail">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" aria-current="page"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    // loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {
                                        productImages && productImages.map(prod_img => {
                                            return (
                                                <SwiperSlide>
                                                    <div className='content'>
                                                        <img
                                                            src={prod_img.image_url}
                                                            alt=""
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className="col-10">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={{ swiper: validThumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {
                                        productImages && productImages.map(prod_img => {
                                            return (
                                                <SwiperSlide >
                                                    <div className='content'>
                                                        <img
                                                            src={prod_img.image_url}
                                                            alt=""
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h3>{product.title}</h3>
                        <div className='d-flex'>
                            <Rating
                            size={20}
                            readonly
                            initialValue={rating}
                            /* Available Props */
                            />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>
                        <div className="price">
                            ${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>
                        </div>
                        <div>{product.short_description}</div>
                        <div className="pt-3">
                            <strong>Select Size</strong>
                            <div className="sizes">
                                {
                                    productSizes && productSizes.map(prod_size => {
                                        return (
                                            <button className="btn btn-size ms-1">{prod_size.size.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="add-to-cart my-3">
                            <button className="btn btn-primary text-uppercase">Add To Cart</button>
                        </div>
                        <hr />
                        <div>
                            <strong>SKU:</strong> {product.sku}
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey='desc'
                            id='uncontrolled-tab-example'
                            className='mb-3'
                        >
                            <Tab
                            title='Description'
                            eventKey='desc'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur odit iste maiores commodi maxime ipsam quod. Iusto veniam, id libero culpa debitis dicta cumque assumenda deserunt est quisquam eos dolorem!
                            </Tab>
                            <Tab
                            title='Reviews (0)'
                            eventKey='reviews'>
                                Reviews here
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
