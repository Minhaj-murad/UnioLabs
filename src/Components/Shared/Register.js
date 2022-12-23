import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [success, setSuccess] = useState(false);
    const { createUser, emailverification } = useContext(AuthContext);
    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || '/'
    const handlesignup = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone = form.phone.value;
        const address = form.address.value;
        console.log(email, password, name, phone, address);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset();
                toast.success('User Created Successfully')
                verifyEmail();
                
                // navigate(from, { replace: true })
            })
            .catch(err => console.error(err));
    }


    const verifyEmail = () => {
        emailverification()
            .then(() => {
                alert('Please Check Your Email and Verify.Please Check Spam also')
            })
    }

    return (


        <div className=" flex-shrink-0 w-1/3 rounded-3xl mx-auto shadow-2xl bg-slate-100  text-gray-800 py-20">
            <h1 className="text-5xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handlesignup} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Your Name" className="input input-bordered text-white" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Email</span>
                    </label>
                    <input type="text" name='email' placeholder="email" className="input input-bordered text-white " />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Phone Number</span>
                    </label>
                    <input type="text" name='phone' placeholder="Your Phone Number" className="input input-bordered text-white" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Address</span>
                    </label>
                    <input type="text" name='address' placeholder="Your Address" className="input input-bordered text-white" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-800">Password</span>
                    </label>
                    <input type="text" name='password' placeholder="password" className="input input-bordered text-white" />

                </div>
             
                <div className="form-control mt-6">
                    <input className="btn bg-base-100" type="submit" value="Register" />
                </div>
            </form>
            {success && <p className='text-2xl font-semibold text-blue-600'>Succesfully Registered in</p>}
            <p className='text-center'>Already Have an account? <Link className='text-blue-600 font-bold' to="/login">Log in</Link> </p>

            <ToastContainer />
        </div>



    );
};

export default Register;