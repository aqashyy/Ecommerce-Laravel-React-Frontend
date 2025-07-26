import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Loader from '../../common/Loader'
import Nostate from '../../common/Nostate'
import { adminToken, apiUrl } from '../../common/http'

function ShowOrders() {

    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);

    const getOrders = () => {
            setLoader(true);
            fetch(`${apiUrl}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            }).then(res => res.json())
                .then(result => {
                    if (result.status == 200) {
                        setOrders(result.data);
                        setLoader(false);
                    } else {
                        setLoader(false);
                    }
                })
        }
        useEffect(() => {
            getOrders();
        }, [])
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pd-3">
                        <h3>Orders</h3>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">

                        <div className="card shadow">
                            <div className="card-body p-4">
                                {
                                    loader == true && <Loader />
                                }
                                {
                                    loader == false && orders.length == 0 && <Nostate text={"No orders found!"} />
                                }
                                {
                                    orders && orders.length > 0 &&

                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer</th>
                                                <th>Email</th>
                                                <th>Grand Total</th>
                                                <th>Date</th>
                                                <th>Payment</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders && orders.map((order, index) => {
                                                    return (
                                                        <tr key={`order-${order.id}`}>
                                                            <td width={50}>
                                                                <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                                                            </td>
                                                            <td>{order.name}</td>
                                                            <td>{order.email}</td>
                                                            <td><span>$</span>{order.grand_total}</td>
                                                            <td>{order.created_at}</td>
                                                            <td>
                                                                {
                                                                    order.payment_status == 'unpaid'
                                                                        ? <span className='badge bg-danger'>Unpaid</span>
                                                                        : <span className='badge bg-success'>Paid</span>
                                                                }
                                                            </td>
                                                            <td width={100}>
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

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ShowOrders
