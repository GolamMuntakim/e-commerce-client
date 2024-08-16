import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [count, setCount] = useState(0)
    const [pages,setPages] = useState(8)
    const pagenumber = Math.ceil(count/pages)
    const pageButton = [...Array(pagenumber).keys()].map(item=>item+1)
    console.log(pagenumber)
    
    useEffect(() => {
        getData()
    }, [search,filter,currentPage,pages])
    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/allproduct?page=${currentPage}&size=${pages}&search=${search}&filter=${filter.trim()}`)
        setProducts(data)
    }
    useEffect(()=>{
        getCount()
    },[search,filter])

    const getCount = async () =>{
        const {data} = await axios(`${import.meta.env.VITE_API_URL}/product-count?search=${search}&filter=${filter}`)
        setCount(data.count)
    }
    // console.log(products)
    // delete
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteproduct/${id}`)
            console.log(data)
            toast.success("Deleted Succesfully")
            getData()
        } catch (err) {
            toast.error(err?.message)
        }
    }
    const handlePagination =(v)=>{
        // console.log(v)
        setCurrentPage(v)
    }
    // search
    const handleSearch = e =>{
        e.preventDefault()
        const text = e.target.search.value.trim();
        setSearch(text);
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSearch}  className="join p-8">
                    <div className="join-item">
                        <input type='text' name='search' className="input input-bordered" placeholder="Search" />
                    </div>
                    <select
                     name='category'
                     id='category'
                     value={filter}
                     onChange={e=> setFilter(e.target.value.trim())}
                     className="select select-bordered join-item">
                        <option disabled selected>Catogry</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                    <div className="indicator">
                        <button type="submit" className="btn join-item">Search</button>
                    </div>
                </form>
                
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8'>
                {
                    products.map((product, idx) =>
                        <div key={idx} className=" bg-base-100  shadow-xl">
                            <figure >

                                <img
                                    src={product?.image}
                                    alt="Shoes"
                                    className=' h-[250px] w-full ' />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product?.name}</h2>
                                <div className='flex justify-between'>
                                    <p>{product?.category}</p>
                                    <p>{product?.brand}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>{product?.price}</p>
                                    <p className='flex items-center gap-2'><FaStar />{product?.rating}</p>
                                </div>
                                <p>{new Date(product?.date).toLocaleDateString()}</p>

                                <div className="card-actions justify-end">
                                    <button onClick={() => handleDelete(product._id)} className="btn text-4xl"><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* pagination */}
            <div className='flex justify-center w-[550px] md:w-[400px] lg:w-[1260px] mt-12'>
        <button
        disabled={currentPage===1}
        onClick={()=>handlePagination(currentPage-1)}
         className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

        {pageButton.map(btnNum => (
          <button
            key={btnNum}
            onClick={()=>handlePagination(btnNum)}
            className={`${currentPage === btnNum? 'bg-black text-white' : ''} hidden  px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button 
         disabled={currentPage===5}
        onClick={()=>handlePagination(currentPage+1)}
        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
        </div>
    );
};

export default Home;