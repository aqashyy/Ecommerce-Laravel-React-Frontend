import { useContext } from 'react'
import Layout from './common/Layout'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth';

function Login() {
    const { register, handleSubmit,setError, watch, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const res   =  await fetch(`${apiUrl}/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            if(result.status == 200){
                const userInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                login(userInfo);
                toast.success('Login successful');
                navigate('/account');
            }else{
                toast.error(result.message);
            }
        });
    }
  return (
    <Layout>
            <div className="container py-5 d-flex justify-content-center">
                <div className="card shadow login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body p-4">
                            <h3 className='text-center'>User Login</h3>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Email</label>
                                <input
                                    {
                                    ...register('email', {
                                        required: "The email field is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })
                                    }
                                    type="text"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='Email' />
                                {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Password</label>
                                <input
                                    {
                                    ...register("password", {
                                        required: "Password is required",
                                    })
                                    }
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder='Password' />
                                {
                                    errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                }
                            </div>
                            <button className="btn btn-secondary w-100">Login</button>
                            <div className="d-flex justify-content-center py-3 pb-2">
                                Don't have an account? &nbsp; <Link to={'/account/register'}>Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
  )
}

export default Login
