import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, userToken } from './common/http';
import Loader from './common/Loader';

function Confirmation() {

    const [order, setOrder] = useState([]);
    const [loader, setLoader] = useState(false);
    const param = useParams();

    const getOrderDetails = () => {
        setLoader(true);
        fetch(`${apiUrl}/get-order-details/${param.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setOrder(result.data);
                    setLoader(false);
                } else {
                    setLoader(false);
                }
            })
    }
    useEffect(() => {
        getOrderDetails();
    }, [])
    return (
        <Layout>
            <div className="container py-5">
                {
                    loader === true && <Loader />
                }
                {
                    loader === false && order &&
                    <>
                        <div className="row">
                            <h1 className='text-center text-success fw-bold'>Thank You!</h1>
                            <p className='text-center text-muted'>Your order has been successfully placed.</p>
                        </div>
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className='fw-bold'>Order Summary</h3>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Order ID: </strong> #{order.id}</p>
                                        <p><strong>Date: </strong> {order.created_at}</p>
                                        <p><strong>Status: </strong>
                                            {
                                                order.status == 'pending' && <span className='badge bg-warning'>Pending</span>
                                            }
                                            {
                                                order.status == 'shipped' && <span className='badge bg-warning'>Shipped</span>
                                            }
                                            {
                                                order.status == 'delivered' && <span className='badge bg-success'>Delivered</span>
                                            }
                                            {
                                                order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span>
                                            }

                                        </p>
                                        <p><strong>Payment Method: </strong> COD</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Customer: </strong> {order.name}</p>
                                        <p><strong>Address: </strong> {order.address}</p>
                                        <p><strong>Contact: </strong> {order.mobile}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered table-striped">
                                            <thead className='table-light'>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th width="150">Price</th>
                                                    <th width="150">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.order_items && order.order_items.map((item) => {
                                                        return (
                                                            <tr key={`order-items-${item.id}`}>
                                                                <td>{item.name}</td>
                                                                <td>{item.qty}</td>
                                                                <td>${item.unit_price}</td>
                                                                <td>${item.price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Subtotal</td>
                                                    <td>${order.subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Shipping</td>
                                                    <td>${order.shipping}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Grand Total</td>
                                                    <td>${order.grand_total}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div className="text-center">
                                            <Link to={`/account/orders/${order.id}`} className="btn btn-primary">View Order Details</Link>
                                            <button className="btn btn-outline-secondary ms-2">Continue Shopping</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    loader === false && !order &&
                    <div className="row">
                        <h1 className='text-center text-muted fw-bold'>Product Not Found!</h1>
                    </div>
                }

            </div>
        </Layout>
    )
}

export default Confirmation
