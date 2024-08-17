import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Thumbs } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { signIn, signInWithGoogle, user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [thumbsSwiper, setThumbsSwiper] = useState(null) || {}
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithGoogle()
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, { withCredentials: true })
      toast.success('Log in succesfully')
      navigate("/")
    } catch (err) {
      toast.error(err?.message)
    }
  }
  const handleSignIn = async e => {
    e.preventDefault()
    setError('')
    const form = e.target
    const email = form.email.value
    const pass = form.password.value
    try {
      const result = await signIn(email, pass)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      }, { withCredentials: true })
      navigate('/')
      toast.success('Log in successfully')
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        toast.error('Incorrect password')
        window.location.reload()
      } else if (err.code === 'auth/user-not-found') {
        setError('user not found')
      } else {
        setError(err.message)
      }
      toast.error(err?.message)
    }
  }
  if (user || loading) return <div className='min-h-screen w-full  flex items-center justify-center'><span className='loading loading-infinity loading-lg'></span></div>
  return (
    <div>
      <Helmet>
        <title>
          Login
        </title>
      </Helmet>
      <div>
        <div className="hero bg-base-200 min-h-screen">
       
          <div className="hero-content flex-col justify-center items-center lg:flex-row-reverse">
            <div className="text-center lg:text-left ">
            <div className="lobster-regular text-center font-bold  text-2xl lg:hidden flex">Welcome to Zig<span className='text-red-700'>ZZ</span>ag</div>
              <div className='lg:flex hidden'>
               <div>
               <div className="lobster-regular text-center font-bold  text-2xl">Welcome to Zig<span className='text-red-700'>ZZ</span>ag</div>
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                  spaceBetween={10}
                  loop={true}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Autoplay, FreeMode, Thumbs]}
                  className="mySwiper2 h-[300px] w-[400px] "
                >
                  <SwiperSlide>
                    <img className='h-[300px] w-[500px] mt-16' src="image/1.avif" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[300px] w-[500px] mt-16' src="image/11.webp" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[300px] w-[500px] mt-16' src="image/21.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[300px] w-[500px] mt-16' src="image/31.png" alt="" />
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  // onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper w-[400px] h-[200px] "
                >
                  <SwiperSlide>
                    <img className='h-[50px] w-[200px] mt-16' src="image/1.avif" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[50px] w-[200px] mt-16' src="image/11.webp" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[50px] w-[200px] mt-16' src="image/21.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className='h-[50px] w-[200px] mt-16' src="image/31.png" alt="" />
                  </SwiperSlide>
                </Swiper>
               </div>
              </div>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="flex justify-center w-full mt-4">
                <button onClick={handleGoogleSignin} className="btn flex gap-4 items-center  border-2 border-solid justify-center p-4"><FcGoogle />Sign In With Google</button>
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
                  <label className="label gap-4">
                    <a href="#" className="label-text-alt link link-hover">Don't Have any account?</a>
                    <span className="text-red-600 font-bold">
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