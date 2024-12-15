import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { getCookie, setCookie } from '../utils/cookiesUtils'
import { loginCookiesKey, prevQuery } from '../constant'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashBordFilter from '../components/DashBordFilter'
import axios from 'axios'
import FeaturesBarLineChart from '../components/FeaturesBarLineChart'
import { toast } from 'react-toastify'

function DashBordPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [searchParamsQuery, setSearchParams] = useState('')

  useEffect(() => {
    setSearchParams(searchParams.toString())
    const loginCookies = getCookie(loginCookiesKey)
    if (!loginCookies) {
      if (searchParams.toString()) {
        setCookie(prevQuery, `${searchParams.toString()}`, 365)
      }
      navigate('/')
    }
    function getChartData(query) {
      setIsLoading(true)
      axios
        .get(
          `https://moonshot-visualization-backend.onrender.com/filter/filter-data?${query}`,
        )
        .then((response) => {
          setData(response.data)
        })
        .catch((e) => {
          console.log(e)
          toast.error('error in fetching data')
        })
      setIsLoading(false)
    }
    const currentParems = searchParams.toString()
    if (currentParems === '') {
      const queryCookie = getCookie(prevQuery)

      if (queryCookie) {
        setSearchParams(queryCookie)
        getChartData(queryCookie)
        navigate(`/dashbord?${queryCookie}`)
      }
    } else {
      setSearchParams(currentParems)
      getChartData(currentParems)
    }
  }, [searchParams])
  return (
    <div>
      <Loader isActive={isLoading} />
      <DashBordFilter searchParamsQuery={searchParamsQuery} />
      {data && (
        <FeaturesBarLineChart
          totalFeatureData={data}
          searchParamsQuery={searchParamsQuery}
        />
      )}
    </div>
  )
}

export default DashBordPage
