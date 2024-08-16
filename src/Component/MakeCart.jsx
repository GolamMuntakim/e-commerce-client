import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { imageupload } from "../api/utilities";

const MakeCart = () => {
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date())
    const navigate = useNavigate()
    const handleFormSubmit = async e =>{
        e.preventDefault()
        const form = e.target 
        const name = form.name.value 
        const category = form.category.value
        const rating = form.rating.value
        const image = form.image.files[0]
        const price = form.price.value 
        const date = startDate
        const brand = form.brand.value
        // const productData = {name,category,rating,image,price,date}
        try{
            const image_url = await imageupload(image)
            const productData = {name,category,rating,image:image_url,price,date,brand}
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/product`, productData)
            console.log(data)
            toast.success('Product Added Succesfully')
            navigate('/')
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div>
            <div className=" bg-base-200 min-h-screen">
                <div className="hero-content ">
                    <div className=" bg-base-100 w-[1000px]  shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-2 gap-8">
                            <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Product Name" className="input input-bordered" required />
                                </div>
                            <div className='flex flex-col gap-2 '>
                                    <label className="label" htmlFor='brand'>
                                        <span className="label-text">Brand Name</span>
                                    </label>
                                    <select
                                        name='brand'
                                        id='brand'
                                        className='border p-2 rounded-md'
                                        required
                                    >
                                        <option value='Gucci'>Gucci</option>
                                        <option value='Nike'>Nike</option>
                                        <option value='LV'>LV</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <label className="label" htmlFor='category'>
                                        <span className="label-text">Product Category</span>
                                    </label>
                                    <select
                                        name='category'
                                        id='category'
                                        className='border p-2 rounded-md'
                                        required
                                    >
                                        <option value='Shirt'>Shirt</option>
                                        <option value='Shoes'>Shoes</option>
                                        <option value='Pant'>Pant</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <label className="label" htmlFor='rating'>
                                        <span className="label-text">Product Rating</span>
                                    </label>
                                    <select
                                        name='rating'
                                        id='rating'
                                        className='border p-2 rounded-md'
                                        required
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Image</span>
                                    </label>
                                    <input type="file" name="image" className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="number" name="price" placeholder="price" className="input input-bordered" required />
                                </div>
                                <div className='flex flex-col gap-2 '>
                                <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <DatePicker className="border-2 border-black p-1 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" name="description" placeholder="Description" className="input input-bordered" required />
                                </div>
                              
                            </div>
                           
                            <div className="form-control mt-6 flex justify-center items-center">
                                <button className="btn btn-primary w-[200px]">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeCart;