import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

function Edit() {
    const [disable, setDisable] = useState(false);
    const navigate  = useNavigate();
    const params    = useParams();
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}/categories/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            }).then(res => res.json())
                .then(result => {
                    if (result.status == 200) {
                        reset({
                            name: result.data.name,
                            status: result.data.status
                        })
                    } else {
                        console.log("Something went wrong...");
                        return {};
                    }
                });
            return res;
        }
    });
    
    const saveCategory = async (data) => {
        console.log(data);
        setDisable(true);
        
        const res = await fetch(`${apiUrl}/categories/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/categories');
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
                        <h3>Categories / Edit</h3>
                        <Link to="/admin/categories" className='btn btn-primary mb-2'>Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(saveCategory)}>
                            <div className="card shadow">
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder='Enter category name'
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
                            <button type='submit' disabled={disable} className='btn btn-primary mt-3'>Update</button>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Edit
