import React from 'react'
import LogoBlack from '../../assets/images/logo-white.png';

const Footer = () => {
    return (
        <footer className='py-5 text-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src={LogoBlack} alt="" width={150} />
                        <div className='pt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat illo non quasi, est beatae quidem quo ad sequi veniam provident a explicabo amet commodi repellat numquam. Inventore, esse ab.
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="">Kids</a></li>
                            <li><a href="">Women</a></li>
                            <li><a href="">Mens</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h3>Quikc Links</h3>
                        <ul>
                            <li><a href="">Login</a></li>
                            <li><a href="">Register</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h3>Get In Touch</h3>
                        <ul>
                            <li><a href="#">+91 790XXXXXXX</a></li>
                            <li><a href="#">hey@ashiq.com</a></li>
                        </ul>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 text-center pt-1">
                        <p>&copy; 2025 All Right Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
