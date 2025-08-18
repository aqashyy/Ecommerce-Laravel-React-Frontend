import { useContext, useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from './common/http'
import { toast } from 'react-toastify'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);
    const navigate = useNavigate();
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }
    const { register, handleSubmit, reset, setError, clearErrors, watch, formState: { errors }, } = useForm({
        defaultValues: async () => {
              fetch(`${apiUrl}/get-profile`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${userToken()}`
                }
              }).then(res => res.json())
                .then(result => {
                  if (result.status == 200) {
                    reset({
                      name: result.data.name,
                      email: result.data.email,
                      address: result.data.address,
                      state: result.data.state,
                      city: result.data.city,
                      zip: result.data.zip,
                      mobile: result.data.mobile,
                    })
                  }
                })
            }
    });

    const processOrder = (data) => {
        if (paymentMethod == 'cod') {
            saveOrder(data, 'unpaid');
        }else if( paymentMethod == 'razorpay') {
            // create razorpay order
            fetch(`${apiUrl}/payments/order`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${userToken()}`
                },
                body: JSON.stringify({amount:grandTotal()})
              }).then(res => res.json())
              .then(result => {

                if(result.status == 200) {
                    console.log(result);
                    openRazorpay(result, data);
                } else {
                    toast.error('Unable to proccess payment!')
                }
                console.log(result);

              }).catch(error => {
                console.log(error);
              });

            // openRazorpay();
        }
    }

    const openRazorpay = (orderData, formData) => {
        const options = {
          key: orderData.key, // from Razorpay Dashboard
          amount: orderData.amount, // Amount in paisa (₹500)
          currency: orderData.currency,
          name: "Pure Wear",
          description: "Order Payment",
          order_id: orderData.order_id, // generated from backend
          handler: function (response) {
            // Step 3: Verify payment on backend
            fetch(`${apiUrl}/payments/verify`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${userToken()}`
                },
                body: JSON.stringify(response)
            })
                .then(res => res.json())
                .then(result => {
                if (result.success) {
                    // Save order in DB as paid
                    saveOrder(formData, 'paid');
                } else {
                    toast.error("Payment verification failed!");
                }
                });
          }, 
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.mobile
          },
          notes: {
            address: formData.address
          },
          theme: {
            color: "#3399cc"
          }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      };

    const saveOrder = (formData, paymentStatus) => {
        const newFormData = {
            ...formData,
            cart: cartData,
            grand_total: grandTotal(),
            subtotal: subTotal(),
            shipping: shipping(),
            payment_status: paymentStatus,
            status: 'pending'
        };

        fetch(`${apiUrl}/save-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            },
            body: JSON.stringify(newFormData)
        }).then(res => res.json())
            .then((result) => {
                if (result.status == 200) {
                    localStorage.removeItem('cart');
                    navigate(`/order/confirmation/${result.id}`);
                } else {
                    toast.error('Something went wrong...');
                }
            })
    }
    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
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
                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register('name', {
                                                required: "The name field is required!"
                                            })
                                            }
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder='Name'
                                        />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="email"
                                            {
                                            ...register('email', {
                                                required: "The email field is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })
                                            }
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder='Email' />
                                        {
                                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        {
                                        ...register('address', {
                                            required: "The address is required!"
                                        })
                                        }
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        rows={3}
                                        placeholder='Address'></textarea>
                                    {
                                        errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register('city', {
                                                required: "The city is required!"
                                            })
                                            }
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            placeholder='City' />
                                        {
                                            errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register('state', {
                                                required: "The state is required!"
                                            })
                                            }
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`} placeholder='State' />
                                        {
                                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register('zip', {
                                                required: "The zip is required!"
                                            })
                                            }
                                            className={`form-control ${errors.zip ? 'is-invalid' : ''}`} placeholder='Zip' />
                                        {
                                            errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register('mobile', {
                                                required: "The mobile is required!"
                                            })
                                            }
                                            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} placeholder='Mobile' />
                                        {
                                            errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                            <table className="table">
                                <tbody>
                                    {
                                        cartData && cartData.map(item => {
                                            return (
                                                <tr key={`chkt-${item.id}`}>
                                                    <td width={100}>
                                                        <img src={item.image_url} width={80} alt="" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{item.title}</h4>
                                                        <div className='d-flex align-items-center'>
                                                            <span>${item.price}</span>
                                                            <div className='ps-3'>
                                                                {
                                                                    item.size && <button className="btn btn-size">{item.size}</button>
                                                                }
                                                            </div>
                                                            <div className="ps-5">
                                                                X {item.qty}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <div>Subtotal</div>
                                        <div>${subTotal()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>Shipping</div>
                                        <div>${shipping()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div><strong>Grand Total</strong></div>
                                        <div>${grandTotal()}</div>
                                    </div>

                                </div>
                            </div>
                            <h3 className='border-bottom pb-3 pt-5'><strong>Payment Method</strong></h3>
                            <div className='pt-2'>
                                <input type="radio" className="form-radio"
                                    onChange={handlePaymentMethod}
                                    checked={paymentMethod == 'razorpay'}
                                    value={'razorpay'} />
                                <label className="form-label ps-2">Razorpay</label>

                                <input type="radio" className="form-radio ms-3"
                                    onChange={handlePaymentMethod}
                                    checked={paymentMethod == 'cod'}
                                    value={'cod'} />
                                <label className="form-label ps-2">COD</label>
                            </div>
                            <div className="d-flex pt-3 py-3">
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Checkout
