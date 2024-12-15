import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from './Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  zoomPlugin,
)

const borderColorMap = {
  A: 'rgba(75, 192, 192, 1)',
  B: 'rgba(255, 99, 132, 1)',
  C: 'rgba(54, 162, 235, 1)',
  D: 'rgba(255, 206, 86, 1)',
  E: 'rgba(153, 102, 255, 1)',
  F: 'rgba(255, 159, 64, 1)',
}
const data = []
const FeaturesBarLineChart = ({ totalFeatureData, searchParamsQuery }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [label, setLabel] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedFeatureBorderColor, setSelectedFeatureBorderColor] = useState(
    'rgba(75, 192, 192, 1)',
  )
  const [selectedFeatureData, setSelectedFeatureData] = useState([])
  const [filters, setFilters] = useState({
    Date1: '',
    Date2: '',
    Age: '',
    Gender: '',
  })

  useEffect(() => {
    if (totalFeatureData) {
      setLabel(Object.keys(totalFeatureData))
      setBarChartData(Object.values(totalFeatureData))
      setSelectedFeatureData([])
      setSelectedFeature(null)

      const Date1 =
        searchParamsQuery.match(/date1=(\d{4}-\d{2}-\d{2})/)?.[1] || ''
      const Date2 =
        searchParamsQuery.match(/date2=(\d{4}-\d{2}-\d{2})/)?.[1] || ''
      const Age =
        searchParamsQuery.match(/(?:^|&)Age=([\d-]+)/)?.[1] ||
        (new URLSearchParams(searchParamsQuery).get('Age') === '>25' &&
          '>25') ||
        'All'
      const Gender =
        searchParamsQuery.match(/(?:^|&)Gender=([A-Za-z]+)/)?.[1] || 'Both'

      setFilters({ Date1, Date2, Age, Gender })
    }
  }, [totalFeatureData])

  const barData = {
    labels: label,
    datasets: [
      {
        label: 'Total Time Spent',
        data: barChartData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Feature-wise Total Time Spent',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Time Spent',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Features',
        },
      },
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        setIsLoading(true)
        const index = elements[0].index
        //Fetch data of clicked feactue
        axios
          .get(
            `https://moonshot-visualization-backend.onrender.com/filter/filter-data/byfeature?${searchParamsQuery}&feature=${label[index]}`,
          )
          .then((responce) => {
            setSelectedFeatureData(responce.data)
          })
          .catch((e) => {
            console.log(e)
            toast.error('error in fetching data')
          })
        setIsLoading(false)
        setSelectedFeature(label[index])
        setSelectedFeatureBorderColor(borderColorMap[label[index]])
      }
    },
  }

  const lineData = selectedFeature
    ? {
        labels: selectedFeatureData.map((item) =>
          new Date(item._id).toLocaleDateString(),
        ),
        datasets: [
          {
            label: `Time Trend for ${selectedFeature}`,
            data: selectedFeatureData.map((item) => item[selectedFeature]),
            fill: false,
            borderColor: selectedFeatureBorderColor,
            tension: 0.1,
          },
        ],
      }
    : null

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        text: selectedFeature
          ? `Time Trend for ${selectedFeature}`
          : 'Select a feature to view the time trend',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  }

  return (
    <div>
      <Loader isActive={isLoading} />
      <h3>
        Date1: {filters.Date1} | Date2: {filters.Date2} | Age: {filters.Age} |
        Gender: {filters.Gender}
      </h3>
      <div className="chart-allign">
        <div className="chart">
          <Bar data={barData} options={barOptions} />
        </div>
        {selectedFeatureData.length > 0 && (
          <div className="chart">
            <Line data={lineData} options={lineOptions} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturesBarLineChart
