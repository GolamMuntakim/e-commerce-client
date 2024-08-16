import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import toast from 'react-hot-toast';
import { imageupload } from "../api/utilities";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
    const navigate = useNavigate()
    const {signIn, signInWithGoogle, createUser, updateUserProfile, user , setUser, loading} = useContext(AuthContext)
    const handleGoogleSignin = async()=>{
        try{
            const result = await signInWithGoogle()
            console.log(result.user)
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
                email : result?.user?.email,
            },{withCredentials:true})
            console.log(data)
        toast.success("You have sign in succesfully")
        navigate("/")
        }catch(err){
            console.log(err)
            toast.error(err?.message)
        }
    }
    
    const handleSignUp = async e =>{
        e.preventDefault()
        const form = e.target
        const email = form.email.value 
        const name = form.name.value 
        const image = form.image.files[0] 
        const pass = form.password.value 
        console.log({email,name,pass,image})
        try{
            const image_url = await imageupload(image)
            const result = await createUser(email,pass)
            await updateUserProfile(name,image_url)
            setUser({...result?.user, photoURL:image_url, displayName : name})
            console.log(result.user)
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
                email : result?.user?.email,
            },{
                withCredentials:true
            })
            console.log(data)
            navigate("/")
            toast.success('Congratulation!! You have registered succesfully')
        }catch(err){
            console.log(err)
            toast.error(err?.message)
        }
    }
    if(user || loading) return <div className="min-h-screen w-full flex items-center justify-center"><span className="loading loading-infinity loading-lg"></span></div>
    return (
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
      <form className="card-body" onSubmit={handleSignUp}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Full Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">photo</span>
          </label>
          <input type="file" name="image" id="image" accept="image/*" className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Already Have An account?</a>
            <span><Link to="/login">Log in</Link></span>
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
    );
};

export default Register;