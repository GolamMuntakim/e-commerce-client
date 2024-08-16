import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/allproduct`)
        setProducts(data)
    }
    console.log(products)
    // delete
    const handleDelete = async(id)=>{
        try{
            const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteproduct/${id}`)
            console.log(data)
            toast.success("Deleted Succesfully")
            getData()
        }catch(err){
            toast.error(err?.message)
        }
    }
    return (
        <div>
            <div className='grid grid-cols-4 gap-4'>
                {
                    products.map((product,idx) =>
                        <div key={idx} className="h-[100px] bg-base-100  shadow-xl">
                            <figure >
                          
                                <img
                                    src={product?.image}
                                    alt="Shoes"
                                    className=' h-[300px]' />
                                 
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button onClick={()=>handleDelete(product._id)} className="btn text-4xl"><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;