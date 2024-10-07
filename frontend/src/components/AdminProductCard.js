import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';


const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded w-60'>
            <div className='' >

                <div className='w-48 h-48 ml-2 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto ml-auto  object-scale-down h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2 mt-8 ml-2 '>{data.productName}</h1>
                <div>
                    <p className='font-semibold ml-2'>
                        {
                            displayCurrency(data.sellingPrice)
                        }
                    </p>
                    <div className='w-fit ml-44 p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEdit />
                    </div>
                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}

export default AdminProductCard