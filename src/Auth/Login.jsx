import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const {signIn, signInWithGoogle, user, loading} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[navigate, user])
    const handleGoogleSignin = async()=>{
        try{
            const result = await signInWithGoogle()
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
                email: result?.user?.email,
            },{withCredentials:true})
            toast.success('Log in succesfully')
            navigate("/")
        }catch(err){
            toast.error(err?.message)
        }
    }
    const handleSignIn = async e=>{
        e.preventDefault()
        setError('')
        const form = e.target 
        const email = form.email.value 
        const pass = form.password.value 
        try{
            const result = await signIn(email, pass)
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
                email: result?.user?.email,
            },{withCredentials:true})
            navigate('/')
            toast.success('Log in successfully')
        }catch(err){
            if(err.code === 'auth/invalid-credential'){
                toast.error('Incorrect password')
                window.location.reload()
            }else if(err.code === 'auth/user-not-found'){
                setError('user not found')
            }else{
                setError(err.message)
            }
            toast.error(err?.message)
        }
    }
    if(user || loading) return <div className='min-h-screen w-full  flex items-center justify-center'><span className='loading loading-infinity loading-lg'></span></div>
    return (
        <div>
              <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <div className="flex justify-center w-full ">
   <button onClick={handleGoogleSignin}  className="btn flex gap-4 items-center  border-2 border-solid justify-center p-4"><FcGoogle />Sign In With Google</button>
   </div>
      <form className="card-body" onSubmit={handleSignIn}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Don't Have any account?</a>
            <span>
                <Link to="/register">Register Now</Link>
                </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default Login;