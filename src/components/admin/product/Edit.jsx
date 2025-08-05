import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Edit = ({ placeholder }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const params = useParams();
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [fileSuccessMsg, setfileSuccessMsg] = useState("");
  const [progressBarStatus, setProgressBarStatus] = useState({ status: false, type: '', percentage: 0 });
  const [productImages, setProductImages] = useState([]);

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Description here...'
  }),
    [placeholder]
  );
  const { register, handleSubmit, setError, reset, clearErrors, watch, formState: { errors }, } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      }).then(res => res.json())
        .then(result => {
          if(result.status == 200)
          {
            setProductImages(result.data.product_images);
            setSizesChecked(result.productSizes);
            reset({
              title: result.data.title,
              category_id	: result.data.category_id,
              brand_id	: result.data.brand_id,
              short_description	: result.data.short_description,
              qty	: result.data.qty,
              description		: result.data.description,
              price	: result.data.price,
              sku	: result.data.sku,
              barcode	: result.data.barcode,
              compare_price	: result.data.compare_price,
              is_featured : result.data.is_featured,
              status : result.data.status,
            })
          } else {
            toast.error(result.message);
            navigate('/admin/products');
          }
        })
    }
  });

  const saveProduct = async (data) => {
    const formData = { ...data, "description": content,}
    // console.log(formData);
    // return ;
    setDisable(true);
    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: 'PUT',
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
  // Handling when select product image
    const handleFile = async (e) => {
      // return ;
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      formData.append("product_id", params.id);
      // Disable create button
      setDisable(true);
      // set progress bar
      setProgressBarStatus({ status: true, type: 'success', percentage: 10 });
      // POST IMAGE TO API
      const res = await fetch(`${apiUrl}/save-product-image`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: formData
      }).then(res => res.json())
        .then(result => {
          // undisable create button
          setDisable(false);
          // set progress bar
          setProgressBarStatus({ status: true, type: 'success', percentage: 75 });
          // RESPONSE STATUS CHECKING
          if (result.status == 200) {
            // set input value as empty
            e.target.value = ''
            // clear exist field error
            clearErrors('image');
            // set progress bar
            setProgressBarStatus({ status: true, type: 'success', percentage: 100 });
            // set success message
            setfileSuccessMsg('Image Uploaded');
            // set timeout for hide progress bar and msg
            setTimeout(() => {
              setProgressBarStatus({ status: false, type: '', percentage: 0 });
              setfileSuccessMsg('');
            }, 4000);
            // uploaded images urls push to galleryImages from response
            setProductImages([
              ...productImages,
              { id: result.data.id, image_url: result.data.image_url }
            ]);
            // console.log(galleryImages);
  
          } else if (result.status == 400) {
            // set input value as empty
            e.target.value = ''
            // set progress bar
            setProgressBarStatus(prev => ({ ...prev, type: 'danger', percentage: 100 }));
            // set timeout for hide bar
            setTimeout(() => {
              setProgressBarStatus({ status: false, type: '', percentage: 0 });
            }, 3000)
            // set error
            const FormErrors = result.errors;
  
            Object.keys(FormErrors).forEach((field) => {
              setError(field, { message: FormErrors[field][0] });
            });
          } else {
            // set input value as empty
            e.target.value = ''
            // set progress bar
            setProgressBarStatus(prev => ({ ...prev, type: 'danger', percentage: 100 }));
            // set timeout for hide bar
            setTimeout(() => {
              setProgressBarStatus({ status: false, type: '', percentage: 0 });
            }, 3000);

            toast.error("Something went wrong...");
          }
        });
  
    }
    // set image as product default image
    const setImageAsDefault = async (imageName) => {
        const res = await fetch(`${apiUrl}/set-default-product-image?product_id=${params.id}&image=${imageName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
            }).then(res => res.json())
            .then(result => {
                if(result.status == 200){
                    // updating new default product image with exist product image state 
                    setProductImages(
                        productImages.map(img => ({
                            ...img,
                            is_default_img: img.image === imageName
                        }))
                    );
                    toast.success(result.message);
                    
                } else {
                console.log("something went wrong...");
                }
            });
    }
    // Action when click image delete icon 
    const deleteImg = async (imgId) => {
    // confirmation for delete
    if (confirm("Are you sure want to delete.?")) {
        // disable buttons
        setDisable(true);
        await fetch(`${apiUrl}/product-image/${imgId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`
        },
        }).then((res) => res.json())
        .then(result => {
            // unset that image from productImages state
            setProductImages(
                productImages.filter((img) => img.id != imgId)
            )
            toast.success(result.message);
            setDisable(false);
        });

    }
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
    // fetch sizes
    const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setSizes(result.data);
        } else {
          console.log("something went wrong...");
        }
      });
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pd-3">
            <h3>Products / Edit</h3>
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
                        <label htmlFor="" className="form-label">Compare Price</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder='Compare Price'
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
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {
                        errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                      }
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Sizes</label>
                      {
                        sizes && sizes.map(size => {
                            return (
                                    <div className="form-check-inline ps-2" key={`psize-${size.id}`}>
                                        <input
                                        {
                                            ...register('sizes')
                                        }
                                        checked={sizesChecked.includes(size.id)}
                                        onChange={ (e) => {
                                            if(e.target.checked) {
                                                setSizesChecked([...sizesChecked,size.id]);
                                            } else {
                                                setSizesChecked(sizesChecked.filter(sid => size.id != sid));
                                            }
                                        }}
                                         className="form-check-input" type="checkbox" value={size.id} id={`size-${size.id}`} />
                                        <label className="form-check-label ps-2" htmlFor={`size-${size.id}`}>
                                            {size.name}
                                        </label>
                                    </div>
                            )
                        })
                      }
                      
                    </div>
                    {/* Image gallery section */}
                    <h3 className='py-3 border-bottom mt-3'>Gallery</h3>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Image</label>
                      <input
                        type="file"
                        className={`form-control ${errors.image ? 'is-invalid' : (fileSuccessMsg ? 'is-valid' : '')}`}
                        placeholder='Qty'
                        onChange={handleFile}
                      />
                      {
                        progressBarStatus.status == true &&
                        <ProgressBar className='mt-2' animated variant={progressBarStatus.type} now={progressBarStatus.percentage} />
                      }

                      {
                        errors.image && <p className='invalid-feedback'>{errors.image?.message}</p> ||
                        fileSuccessMsg && <p className='text-success'>{fileSuccessMsg}</p>
                      }
                    </div>
                    <div className="row">
                      {
                        productImages && productImages.map((productImg, index) => {

                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                
                                {
                                    productImg.is_default_img && 
                                    <div className="default-badge">
                                        <i className="fa fa-crown me-1"></i>Default
                                    </div>
                                }
                                <img src={productImg.image_url} alt="" className='w-100 rounded' />
                                <button
                                  type='button'
                                  className={disable ? 'spinner-border-custom spinner-border' : 'remove-image'}
                                  disabled={disable || productImg.is_default_img}
                                  onClick={() => deleteImg(productImg.id)}
                                >{disable ? '' : String.fromCharCode(215)}</button>
                                <button 
                                className="btn mt-2 set-default-btn w-100"
                                disabled={productImg.is_default_img}
                                type='button'
                                onClick={() => setImageAsDefault(productImg.image)}>
                                    <i className="fas fa-star me-2"></i>
                                    {
                                        productImg.is_default_img == true ? 'Current Default' : 'Set as Default'
                                    }
                                </button>
                              </div>
                            </div>
                          )

                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' disabled={disable} className='btn btn-primary mt-3 mb-3'>Update</button>
            </form>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
