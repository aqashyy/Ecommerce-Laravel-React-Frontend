import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/Mens/six.jpg'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }
    return (
        <Layout>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" aria-current="page"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                        <form action="">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Name' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder='Email' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea className='form-control' rows={3} placeholder='Address' id=""></textarea>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='City' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='State' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Zip' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Mobile' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy product title</h4>
                                        <div className='d-flex align-items-center'>
                                            <span>$10</span>
                                            <div className='ps-3'>
                                                <button className="btn btn-size">S</button>
                                            </div>
                                            <div className="ps-5">
                                                X 1
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy product title</h4>
                                        <div className='d-flex align-items-center'>
                                            <span>$10</span>
                                            <div className='ps-3'>
                                                <button className="btn btn-size">S</button>
                                            </div>
                                            <div className="ps-5">
                                                X 1
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <div>Subtotal</div>
                                    <div>$10</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Shipping</div>
                                    <div>$5</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Grand Total</strong></div>
                                    <div>$15</div>
                                </div>

                            </div>
                        </div>
                        <h3 className='border-bottom pb-3 pt-5'><strong>Payment Method</strong></h3>
                        <div className='pt-2'>
                            <input type="radio" className="form-radio"
                            onClick={handlePaymentMethod}
                            checked={paymentMethod == 'stripe'} 
                            value={'stripe'}/>
                            <label className="form-label ps-2">Stripe</label>

                            <input type="radio" className="form-radio ms-3"
                            onClick={handlePaymentMethod}
                            checked={paymentMethod == 'cod'}
                            value={'cod'} />
                            <label className="form-label ps-2">COD</label>
                        </div>
                        <div className="d-flex pt-3 py-3">
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout
