import React, { useState } from 'react'
import Layout from '../common/Layout'
import UserSidebar from '../common/UserSidebar'
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from '../common/http';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';

function Profile() {

  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, reset, setError, clearErrors, watch, formState: { errors }, } = useForm({
    defaultValues: async () => {
      setLoader(true);
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
            setLoader(false);
          } else {
            setLoader(false);
          }
        })
    }
  });
  const updateProfile = (data) => {
    setLoader(true);
    fetch(`${apiUrl}/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userToken()}`
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setLoader(false);
          toast.success(result.message);
        } else {
          setLoader(false);
        }
      })
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pd-3">
            <h3>My Account</h3>
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow mb-3">
              {
                loader == true && <Loader />
              }
              {
                loader == false &&
                <div className="p-3">
                  <h3 className='border-bottom pb-3'><strong>Profile Details</strong></h3>
                  <form onSubmit={handleSubmit(updateProfile)}>
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
                      <div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                      </div>
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
