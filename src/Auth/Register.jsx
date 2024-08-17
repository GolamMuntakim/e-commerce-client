import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import toast from 'react-hot-toast';
import { imageupload } from "../api/utilities";
import { FcGoogle } from "react-icons/fc";
import './style.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Helmet } from "react-helmet-async";


const Register = () => {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle, createUser, updateUserProfile, user, setUser, loading } = useContext(AuthContext)
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithGoogle()
      console.log(result.user)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, { withCredentials: true })
      console.log(data)
      toast.success("You have sign in succesfully")
      navigate("/")
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleSignUp = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const name = form.name.value
    const image = form.image.files[0]
    const pass = form.password.value
    console.log({ email, name, pass, image })
    try {
      const image_url = await imageupload(image)
      const result = await createUser(email, pass)
      await updateUserProfile(name, image_url)
      setUser({ ...result?.user, photoURL: image_url, displayName: name })
      console.log(result.user)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, {
        withCredentials: true
      })
      console.log(data)
      navigate("/")
      toast.success('Congratulation!! You have registered succesfully')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  if (user || loading) return <div className="min-h-screen w-full flex items-center justify-center"><span className="loading loading-infinity loading-lg"></span></div>
  return (
    <div>
      <Helmet>
        <title>
          Registered
        </title>
      </Helmet>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
          <div className="lobster-regular text-center font-bold  text-2xl lg:hidden flex">Welcome to Zig<span className='text-red-700'>ZZ</span>ag</div>
           <div className="lg:flex hidden">
        
          <div>
          <div className="lobster-regular text-center font-bold  text-2xl">Welcome to Zig<span className='text-red-700'>ZZ</span>ag</div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-[800px] h-[600px] object-cover rounded-lg"
            >
              <SwiperSlide><img className="w-full h-[500px]" src="image/b1.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img className="w-full h-[500px]" src="image/b2.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img className="w-full h-[500px]" src="image/b3.webp" alt="" /></SwiperSlide>
            </Swiper>
          </div>
           </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="flex justify-center w-full mt-4">
              <button onClick={handleGoogleSignin} className="btn flex gap-4 items-center  border-2 border-solid justify-center p-4"><FcGoogle />Sign In With Google</button>
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
                  <span className="text-red-600 font-bold"><Link to="/login">Log in</Link></span>
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