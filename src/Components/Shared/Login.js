import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';

const Login = () => {
    const { login, forgetpassword,changepassword } = useContext(AuthContext);
    
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, { replace: true })

            })
            .then(error => console.log(error));
    }

    const handleemail = event => {
        const email = event.target.value;
        setUserEmail(email)
    }
    const handleforgetpass = () => {
        if (!userEmail) {
            alert('please, Enter your Email First');
            return;
        }
        forgetpassword(userEmail)
            .then(() => {
                alert('Reset password link has been sent to your email.Please chack spam folder also')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handlechangepass = (event) => {
       
         event.preventDefault();
       
        if (!userEmail) {
            alert('please, Enter your Email First');
            return;
        }
        changepassword(userEmail)
            .then(() => {
                alert('Reset password link has been sent to your email.Please chack spam folder also')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (


        <div className=" flex-shrink-0 w-1/3 rounded-3xl mx-auto shadow-2xl bg-slate-100  text-gray-800 py-20">
            <h1 className="text-5xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Email</span>
                    </label>
                    <input onBlur={handleemail} type="text" name='email' placeholder="email" className="input input-bordered text-white " />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Password</span>
                    </label>
                    <input type="text" name='password' placeholder="password" className="input input-bordered text-white" />
                    <label className="label">
                        <p className=" text-gray-800">Forgot password? <button onClick={handleforgetpass} className="btn btn-link">Please Reset</button> </p>
                    </label>
                    <label className="label">
                        <p className=" text-gray-800">Want to change your password?  <button onClick={handlechangepass} className="btn btn-info">Click Here </button> </p>
                    </label>
                </div>

                <div className="form-control mt-6">
                    <input className="btn bg-base-100" type="submit" value="Login" />
                </div>
               
            </form>
            

            <p className='text-center'>New to Unio Labs? <Link className='text-blue-600 font-bold' to="/signup">Sign Up</Link> </p>


        </div>



    );
};

export default Login;