import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const context = useContext(Context)
    const navigate = useNavigate();
    const searchInput = useLocation();
    const URLsearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLsearch.getAll("q");
    const [search, setSearch] = useState(searchQuery);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include"
        });
        const data = await fetchData.json();
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }
        if (data.error) {
            toast.error(data.message);
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/search");
        }
    };

    return (
        <header className='h-16 shadow-lg bg-white fixed w-full z-40'>
            <div className="h-full mx-auto container flex items-center justify-between">
                {/* Logo and Search */}
                <div className="flex items-center">
                    <Link to={"/"}>
                        <Logo w={70} h={50} />
                    </Link>
                    <div className='ml-96 hidden lg:flex items-center justify-center border h-10  rounded-full pl-2 focus-within:shadow'>
                        <input
                            className='outline-none w-96'
                            type="text"
                            placeholder='Search product here...'
                            onChange={handleSearch}
                            value={search}
                        />
                        <div className='text-lg min-w-[50px] h-10 bg-red-600 flex items-center justify-center rounded-r-full cursor-pointer'>
                            <GrSearch />
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className='lg:hidden '>
                    <div className='flex items-center h-7 pl-2 border rounded-full focus-within:shadow '>
                        <input
                            className='w-20 outline-none text-sm'
                            type="text "
                            placeholder='Search...'
                            onChange={handleSearch}
                            value={search}
                        />
                        <div className='text-sm min-w-[20px] bg-red-500 h-7  flex items-center justify-center rounded-r-full cursor-pointer'>
                            <GrSearch />
                        </div>
                    </div>
                </div>

                {/* User and Cart Section */}
                <div className='mx-3 flex items-center gap-4 cursor-pointer'>
                    <div className='relative flex justify-center'>
                        {user?._id && (
                            <div className="text-3xl cursor-pointer relative flex justify-center" onClick={() => { setMenuDisplay(prev => !prev); }}>
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaRegCircleUser />
                                )}
                            </div>
                        )}

                        {menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                                <nav>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => { setMenuDisplay(prev => !prev); }}>Admin Panel</Link>
                                    )}
                                    <Link to={'/order'} className='whitespace-nowrap md:block hover:bg-slate-100 p-2' onClick={() => { setMenuDisplay(prev => !prev); }}>Order</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                    {user?._id && (
                        <Link to={"/cart"} className="text-2xl relative">
                            <span><FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-xs'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )}

                    <div>
                        {user?._id ? (
                            <button onClick={handleLogout} className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Logout</button>
                        ) : (
                            <Link to={"/login"} className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
