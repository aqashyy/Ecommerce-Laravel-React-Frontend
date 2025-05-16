import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
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


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [validThumbsSwiper, setValidThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);
    useEffect(() => {
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
                                <li className="breadcrumb-item active" aria-current="page"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Dummy product title</li>
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

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg1}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg2}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg3}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
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

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg1}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg2}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg3}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h3>Dummy product title</h3>
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
                            $20 <span className='text-decoration-line-through'>$80</span>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                            Quibusdam ea vitae eaque amet consectetur minima dignissimos, <br />
                            officiis consequatur voluptatibus, esse tempora accusamus
                        </div>
                        <div className="pt-3">
                            <strong>Select Size</strong>
                            <div className="sizes">
                                <button className="btn btn-size ms-1">S</button>
                                <button className="btn btn-size ms-1">M</button>
                                <button className="btn btn-size ms-1">L</button>
                                <button className="btn btn-size ms-1">XL</button>
                            </div>
                        </div>
                        <div className="add-to-cart my-3">
                            <button className="btn btn-primary text-uppercase">Add To Cart</button>
                        </div>
                        <hr />
                        <div>
                            <strong>SKU:</strong> HUMJMKJS
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
