import React from 'react'
import ProductImg from '../../assets/images/Mens/eleven.jpg';

function FeaturedProducts() {
  return (
    <section className='section-2 py-5'>
                <div className='container'>
                    <h2>Featured Products</h2>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className="card-body p-0">
                                    <a href="" className=''>Red check shirt for men</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className="card-body p-0">
                                    <a href="" className=''>Red check shirt for men</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className="card-body p-0">
                                    <a href="" className=''>Red check shirt for men</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className="card-body p-0">
                                    <a href="" className=''>Red check shirt for men</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default FeaturedProducts
