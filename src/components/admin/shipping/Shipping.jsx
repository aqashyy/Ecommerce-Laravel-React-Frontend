import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';

function Shipping() {
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm({
        defaultValues: async () => {
            setLoader(true);
            await fetch(`${apiUrl}/get-shipping`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
            }).then(res => res.json())
                .then(result => {
                    setDisable(false);
                    setLoader(false);
                    if (result.status == 200) {
                        reset({
                            shipping_charge: result.data.shipping_charge
                        });
                        
                    }
                });
        }
    });

    const saveShipping = async (data) => {
        setDisable(true);
        setLoader(true);
        const res = await fetch(`${apiUrl}/save-shipping`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                setLoader(false);
                if (result.status == 200) {
                    toast.success(result.message);
                } else {
                    // console.log("Something went wrong...");
                    toast.error("Something went wrong...");
                }
            });
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pd-3">
                        <h3>Shipping Charge</h3>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        {
                            loader == true && <Loader />
                        }
                        {
                            loader == false && 
                            <form onSubmit={handleSubmit(saveShipping)}>
                                <div className="card shadow">
                                    <div className="card-body p-4">

                                        <div className="mb-3">
                                            <label htmlFor="" className="form-label">Shipping Charge</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.shipping_charge ? 'is-invalid' : ''}`}
                                                placeholder='Enter Shipping Charge'
                                                {
                                                ...register('shipping_charge', {
                                                    required: "The shipping charge field is required"
                                                })
                                                }
                                            />
                                            {
                                                errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                                            }
                                        </div>

                                    </div>
                                </div>
                                <button type='submit' disabled={disable} className='btn btn-primary mt-3'>Save</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shipping
