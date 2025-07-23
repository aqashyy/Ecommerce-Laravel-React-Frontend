import { useEffect, useState } from 'react'
import ProductImg from '../../assets/images/Mens/eight.jpg';
import { apiUrl } from './http';
import { Link } from 'react-router-dom';

function LatestProducts() {
    const [products, setProducts] = useState([]);
    
        const latestProducts = async () => {
            const res = await fetch(`${apiUrl}/get-latest-products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then(res => res.json())
                .then(result => {
    
                    if (result.status == 200) {
                        setProducts(result.data);
                    } else {
                        console.log("something went wrong...");
                    }
                });
        }
    
        useEffect(() => {
            latestProducts();
        }, []);
    return (
        <section className='section-2 py-5'>
            <div className='container'>
                <h2>New Arrivals</h2>
                <div className="row">
                    {
                        products && products.map(product => {
                            return (
                                <div className="col-md-3" key={`latest-p-${product.id}`}>
                                    <div className="product card border-0">
                                        <div className="card-img">
                                            <img src={product.image_url} alt="" className='w-100' />
                                        </div>
                                        <div className="card-body p-0">
                                            <Link to={`/product/${product.id}`} className=''>{product.title}</Link>
                                            <div className="price">
                                                ${ product.price } &nbsp;

                                                {
                                                    product.compare_price && <span className='text-decoration-line-through'>${product.compare_price}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestProducts
