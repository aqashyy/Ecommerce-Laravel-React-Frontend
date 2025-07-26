import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http';
import Loader from '../../common/Loader';
import { useForm } from 'react-hook-form';

function OrderDetail() {

    const [order, setOrder] = useState([]);
    const [loader, setLoader] = useState(false);
    const param = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const getOrderDetail = () => {
        setLoader(true);
        fetch(`${apiUrl}/orders/${param.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setOrder(result.data);
                    setLoader(false);
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                } else {
                    setLoader(false);
                }
            })
    }
    const updateOrder = (data) => {
        setLoader(true);
        fetch(`${apiUrl}/orders/${param.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setOrder(result.data);
                    setLoader(false);
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                } else {
                    setLoader(false);
                }
            });
    }
    useEffect(() => {
        getOrderDetail();
    }, []);
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pd-3">
                        <h3>Order Detail</h3>
                        <Link to="/admin/orders" className='btn btn-primary mb-2'>Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="card shadow">
                                    <div className="card-body p-4">
                                        {
                                            loader == true && <Loader />
                                        }
                                        {
                                            loader == false && order &&
                                            <>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h3>Order ID: #{order.id}</h3>
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
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="text-secondary">Date</div>
                                                        <h4 className='pt-2'>{order.created_at}</h4>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="text-secondary">Payment Status</div>
                                                        {
                                                            order.payment_status == 'unpaid'

                                                                ? <span className='badge bg-danger'>Unpaid</span>
                                                                : <span className='badge bg-success'>Paid</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="py-2">
                                                            <strong>{order.name}</strong>
                                                            <div>{order.email}</div>
                                                            <div>{order.mobile}</div>
                                                            <div>{order.address} {order.city} {order.state} {order.zip}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="text-secondary pt-2">Payment Method</div>
                                                        <p>COD</p>
                                                    </div>
                                                </div>
                                                <div className="row pt-2">
                                                    <h3 className="pb-2 "><strong>Items</strong></h3>
                                                    <div className="row justify-content-end">
                                                        <div className="col-lg-12">
                                                            {
                                                                order.order_items && order.order_items.map((item) => {
                                                                    return (
                                                                        <div key={`items-${item.id}`} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                            <div className="d-flex">
                                                                                <img width="70" className="me-3" src={item.product.image_url} alt="" />
                                                                                <div className="d-flex flex-column">
                                                                                    <div className="mb-2"><span>{item.name}</span></div>
                                                                                    <div><button className="btn btn-size">{item.size}</button></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex">
                                                                                <div>X {item.qty}</div>
                                                                                <div className="ps-3">${item.price}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <div className="col-lg-12">
                                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                <div>Subtotal</div>
                                                                <div>${order.subtotal}</div>
                                                            </div>
                                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                <div>Shipping</div>
                                                                <div>${order.shipping}</div>
                                                            </div>
                                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                <div><strong>Grand Total</strong></div>
                                                                <div>${order.grand_total}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card shadow">
                                    <div className="card-body p-4">
                                        <div className="mb-2">
                                            <form onSubmit={handleSubmit(updateOrder)}>
                                                <label htmlFor="order-status" className="form-label">Status</label>
                                                <select
                                                    {
                                                    ...register('status')
                                                    }
                                                    className='form-select' id="order-status">
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <label htmlFor="payment-status" className="pt-2 form-label">Payment Status</label>
                                                <select
                                                    {
                                                    ...register('payment_status')
                                                    }
                                                    className='form-select' id="payment-status">
                                                    <option value="paid">Paid</option>
                                                    <option value="unpaid">Unpaid</option>
                                                </select>
                                                <div className="mt-3 text-center">
                                                    <button type='submit' className='btn btn-primary'>Update</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OrderDetail
