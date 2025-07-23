import { useEffect, useState } from 'react'
import { apiUrl } from './http';
import { Link } from 'react-router-dom';

function FeaturedProducts() {

    const [products, setProducts] = useState([]);

    const featuredProducts = async () => {
        const res = await fetch(`${apiUrl}/get-featured-products`, {
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
        featuredProducts();
    }, []);

    return (
        <section className='section-2 py-5'>
            <div className='container'>
                <h2>Featured Products</h2>
                <div className="row">
                    {
                        products && products.map(product => {
                            return (
                                <div className="col-md-3" key={`featured-p-${product.id}`}>
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

export default FeaturedProducts
