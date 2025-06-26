import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { register, handleSubmit, setError, watch, formState: { errors }, } = useForm();
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Description here...'
  }),
    [placeholder]
  );

  const saveProduct = async (data) => {
    const formData = { ...data, "description": content }
    // console.log(formData);
    // return ;
    setDisable(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(result => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate('/admin/products');
        } else if (result.status == 400) {

          const FormErrors = result.errors;

          Object.keys(FormErrors).forEach((field) => {
            setError(field, { message: FormErrors[field][0] });
          });
        } else {
          toast.error("Something went wrong...");
        }
      });

  }

  // fetching categories
  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {


        if (result.status == 200) {
          setCategories(result.data);
        } else {
          console.log("something went wrong...");
        }
      });
  }
  // fetching brands
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setBrands(result.data);
        } else {
          console.log("something went wrong...");
        }
      });
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pd-3">
            <h3>Products / Create</h3>
            <Link to="/admin/products" className='btn btn-primary mb-2'>Back</Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Title</label>
                        <input
                          type="text"
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          placeholder='Enter Product title'
                          {
                          ...register('title', {
                            required: "The title field is required"
                          })
                          }
                        />
                        {
                          errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Category</label>
                        <select
                          className={`form-control ${errors.category_id ? 'is-invalid' : ''}`}
                          {
                          ...register('category_id', {
                            required: "Please select a category"
                          })

                          }
                        >
                          <option value="">Select an option</option>
                          {
                            categories.map((category) => {
                              return (
                                <option key={`category-${category.id}`} value={category.id} >{category.name}</option>
                              )
                            })
                          }
                        </select>
                        {
                          errors.category_id && <p className='invalid-feedback'>{errors.category_id?.message}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Brand</label>
                        <select
                          className={`form-control ${errors.brand_id ? 'is-invalid' : ''}`}
                          {
                          ...register('brand_id', {
                            required: "Please select a brand"
                          })

                          }
                        >
                          <option value="">Select an option</option>
                          {
                            brands.map((brand) => {
                              return (
                                <option key={`brand-${brand.id}`} value={brand.id} >{brand.name}</option>
                              )
                            })
                          }
                        </select>
                        {
                          errors.brand_id && <p className='invalid-feedback'>{errors.brand_id?.message}</p>
                        }
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Short Description</label>
                        <textarea
                          rows={3}
                          className="form-control"
                          placeholder='Short description'
                          {
                          ...register('short_description')
                          } ></textarea>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Description</label>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        />
                      </div>
                    </div>
                    {/* Pricing Row section */}
                    <h3 className='py-3 mt-3 border-bottom'>Pricing</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder='Price'
                          {
                          ...register('price')
                          } />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">Discounted Price</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder='Discounted Price'
                          {
                          ...register('compare_price')
                          } />
                      </div>
                    </div>
                    {/* Inventory Row section */}
                    <h3 className='py-3 border-bottom mt-3'>Inventory</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">SKU</label>
                        <input
                          type="text"
                          className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                          placeholder='SKU'
                          {
                          ...register('sku', {
                            required: "The SKU field is required"
                          })
                          } />
                        {
                          errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
                        }
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">Barcode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder='Barcode'
                            {
                            ...register('barcode')
                            } />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">Qty</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder='Qty'
                            {
                            ...register('qty')
                            } />
                        </div>
                      </div>
                      <div className="col-md-6">
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
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Featured</label>
                      <select
                        className={`form-control ${errors.is_featured ? 'is-invalid' : ''}`}
                        {
                        ...register('is_featured', {
                          required: "Please select a state"
                        })

                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {
                        errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                      }
                    </div>
                    {/* Image gallery section */}
                    <h3 className='py-3 border-bottom mt-3'>Gallery</h3>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder='Qty'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' disabled={disable} className='btn btn-primary mt-3 mb-3'>Create</button>
            </form>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
