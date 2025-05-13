import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  console.log(AllSubCategory)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
  <section className="sticky top-24 lg:top-20 bg-gray-50">
  {/**code sau khi chĩnh sữa css */}
  <div className="container mx-auto flex">
    
    {/* Sidebar */}
    <div className="w-[110px] lg:w-[180px] min-h-[88vh] max-h-[88vh] overflow-y-scroll bg-white shadow-md py-2 scrollbarCustom">
      {DisplaySubCatory.map((s, index) => {
        const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
        return (
          <Link
            key={s._id}
            to={link}
            className={`block px-2 py-3 text-center lg:flex lg:items-center lg:gap-4 hover:bg-green-100 ${
              subCategoryId === s._id ? 'bg-green-100' : ''
            }`}
          >
            <img
              src={s.image}
              alt={s.name}
              className="w-14 h-14 object-contain mx-auto lg:mx-0"
            />
            <p className="text-xs lg:text-sm mt-1 lg:mt-0">{s.name}</p>
          </Link>
        );
      })}
    </div>

    {/* Product Section */}
    <div className="flex-1">
      <div className="bg-white shadow-md p-4 sticky top-20 z-10">
        <h3 className="font-semibold text-lg">{subCategoryName}</h3>
      </div>

      <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + "productSubCategory" + index}
            />
          ))}
        </div>

        {loading && <Loading />}
      </div>
    </div>
  </div>
</section>

  )
}

export default ProductListPage