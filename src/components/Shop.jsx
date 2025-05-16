import React from 'react'
import Layout from './common/Layout'
import ProductImg from '../assets/images/Mens/eight.jpg';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (
    <Layout>
      <div className="container py-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Home</li>
            <li className="breadcrumb-item active" aria-current="page">Shop</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h3>Categories</h3>
                <ul>
                  <li className="mb-2"><input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Mens</label>
                  </li>
                  <li className="mb-2"><input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Womens</label>
                  </li>
                  <li className="mb-2"><input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Kids</label>
                  </li>
                </ul>
              </div>
              <div className="card-body p-4">
                <h3>Brands</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Levis</label>
                  </li>
                  <li className="mb-2"><input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Address</label>
                  </li>
                  <li className="mb-2"><input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">Alensoly</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                    <img src={ProductImg} alt="" className='w-100' />
                    </Link>
                  </div>
                  <div className="card-body p-0">
                    <Link to="/product" className=''>Red check shirt for men</Link>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body p-0">
                    <a href="" className=''>Red check shirt for men</a>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body p-0">
                    <a href="" className=''>Red check shirt for men</a>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body p-0">
                    <a href="" className=''>Red check shirt for men</a>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body p-0">
                    <a href="" className=''>Red check shirt for men</a>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body p-0">
                    <a href="" className=''>Red check shirt for men</a>
                    <div className="price">
                      $50 <span className='text-decoration-line-through'>$80</span>
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

export default Shop
