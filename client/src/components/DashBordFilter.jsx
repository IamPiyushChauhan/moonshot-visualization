import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { prevQuery } from '../constant'
import { setCookie } from '../utils/cookiesUtils'

function DashBordFilter({ searchParamsQuery }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    date1: '',
    date2: '',
    gender: '',
    age: '',
  })

  useEffect(() => {
    //IF Found in params then store in setFormData
    const date1 =
      searchParamsQuery.match(/date1=(\d{4}-\d{2}-\d{2})/)?.[1] || ''
    const date2 =
      searchParamsQuery.match(/date2=(\d{4}-\d{2}-\d{2})/)?.[1] || ''
    const age =
      searchParamsQuery.match(/(?:^|&)Age=([\d-]+)/)?.[1] ||
      (new URLSearchParams(searchParamsQuery).get('Age') === '>25' && '>25') ||
      ''
    const gender =
      searchParamsQuery.match(/(?:^|&)Gender=([A-Za-z]+)/)?.[1] || ''

    setFormData({ date1, date2, age, gender })
  }, [searchParamsQuery])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (formData.date1 === '' || formData.date2 === '') {
      alert('Enter Both Date Fields')
    } else if (new Date(formData.date1) > new Date(formData.date2)) {
      alert('date1 should be less then Date 2')
    } else {
      const queryObj = Object.entries({
        date1: formData.date1,
        date2: formData.date2,
        Age: formData.age,
        Gender: formData.gender,
      }).reduce((acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = value
        }
        return acc
      }, {})
      // Navigate to the constructed URL navigate(`/dashbord?${query}`);
      let query = new URLSearchParams(queryObj).toString()
      console.log(query)
      setCookie(prevQuery, `${query}`, 365)
      navigate(`/dashbord?${query}`)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '1em' }}>
            <label htmlFor="date1">Date 1:</label>
            <input
              type="date"
              id="date1"
              name="date1"
              value={formData.date1}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date2">Date 2:</label>
            <input
              type="date"
              id="date2"
              name="date2"
              value={formData.date2}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '1em' }}>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="">Select Age</option>
              <option value="15-25">{'15-25'}</option>
              <option value=">25"> {'>25'}</option>
            </select>
          </div>
        </div>
      </div>
      <button style={{ width: '20vw' }} onClick={handleSubmit}>
        Filter
      </button>
    </div>
  )
}

export default DashBordFilter
