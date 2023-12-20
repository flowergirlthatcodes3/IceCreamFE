import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
function App() {
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    const fetchFlavors = async () => {
      console.log("in fetch flavors")
      const {data} = await axios.get('http://localhost:3333/api/flavors')
      setFlavors(data)
    }
    fetchFlavors()
  }, [])

  const deleteFlavor = async (flavorz) => {
    try {
      await axios.delete(`http://localhost:3333/api/flavors/${flavorz.id}`)
      const newFlavors = flavors.filter((flavor) => {
        return flavor.id !== flavorz.id
      })
      setFlavors(newFlavors)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div>
     
      <h1> Welcome to the IceCream Shop - {flavors.length} !</h1>
      <h2>Choose Your Flavor: </h2>
      {
        flavors.map((flavor) => {
          return (
            <span key={flavor.id}>
              <h3>{flavor.name}</h3>
              <button onClick={() => {deleteFlavor(flavor)}}>Not Feeling This Flavor X</button>
            </span>
          )
        })
      }
    </div>
    )
    }


export default App
