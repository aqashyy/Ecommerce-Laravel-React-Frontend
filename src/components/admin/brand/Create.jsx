import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

function Create() {
    const { register, handleSubmit, setError, watch, formState: { errors }, } = useForm();
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    // Function for save or create Brand
    const saveBrand = async (data) => {
            console.log(data);
            setDisable(true);
            const res =  await fetch(`${apiUrl}/brands`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/brands');
                } else if(result.status == 400) {
                    const FormErrors = result.errors;

                    Object.keys(FormErrors).forEach((field) => {
                    setError(field, { message: FormErrors[field][0] });
                    });
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
                        <h3>Categories / Create</h3>
                        <Link to="/admin/brands" className='btn btn-primary mb-2'>Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(saveBrand)}>
                            <div className="card shadow">
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder='Enter brand name'
                                            {
                                            ...register('name', {
                                                required: "The name field is required"
                                            })
                                            }
                                        />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Status</label>
                                        <select
                                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                            {
                                            ...register('status', {
                                                required: "Please select a status state"
                                            })

                                            }
                                        >
                                            <option value="">Select an option</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {
                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                    </div>

                                </div>
                            </div>
                            <button type='submit' disabled={disable} className='btn btn-primary mt-3'>Create</button>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default Create
