import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName])
    setFilterCategoryList(arrayOfCategory)

    const urlFromat = arrayOfCategory.map(el => `category=${el}`).join("&&")
    navigate("/product-category?" + urlFromat)
  }, [selectCategory])

  const handleOnchangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    const sortedData = [...data]
    
    if (value === "asc") {
      sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice)
    }
    if (value === "dsc") {
      sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice)
    }
    
    setData(sortedData)
  }

  return (
    <div className='container mx-auto p-4'>
      {/** Mobile Version Toggle Button */}
      <button className="lg:hidden bg-blue-500 text-white p-2 text-sm -mb-4 -mt-2 hover:bg-blue-600 rounded-full" onClick={() => setShowFilters(prev => !prev)}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className='lg:grid grid-cols-[250px,1fr] -ml-4'>
        {/** Left Side (Filters) */}
        <div className={`bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll ${showFilters ? '' : 'hidden lg:block'}`}>
          {/* Sort By */}
          <div>
            <h3 className='text-lg uppercase font-bold text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center text-lg gap-3'>
                <input type="radio" name="sortBy" value={"asc"} checked={sortBy === "asc"} onChange={handleOnchangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3 text-lg'>
                <input type="radio" name="sortBy" value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnchangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div>
            <h3 className='text-lg uppercase font-bold text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-lg flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName) => (
                <div className='flex items-center gap-3' key={categoryName.value}>
                  <input type="checkbox" name="category" checked={selectCategory[categoryName.value]} value={categoryName.value} id={categoryName.value} onChange={handleSelectCategory} />
                  <label htmlFor={categoryName.value}>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/** Right Side (Products) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Result: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
            {data.length !== 0 && <VerticalCard data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
