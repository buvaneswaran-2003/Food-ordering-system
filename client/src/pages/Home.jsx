import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import PopularRestaurants from '../components/PopularRestaurants'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:3001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data);
          }
        )
      }

  return (
    <div className="HomePage">

      <div className="home-categories-container">

        <div className="home-category-card" onClick={()=>navigate('/category/Breakfast')}>
          <img src="https://img.freepik.com/free-photo/homemade-fried-eggs-salad-bacon-plate-front-coffee-cup_23-2148067053.jpg?" alt="" />
          <h5>Breakfast</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Pizza')}>
          <img src="https://img.freepik.com/free-photo/pizza-with-cheese-brown-wooden-surface-bright-surface_140725-14195.jpg?" alt="" />
          <h5>Pizza</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Noodles')}>
          <img src="https://img.freepik.com/free-photo/delicious-asian-noodles-concept_23-2148773773.jpg?" alt="" />
          <h5>Noodles</h5>
        </div>
        <div className="home-category-card" onClick={()=>navigate('/category/Beverages')}>
          <img src="https://img.freepik.com/free-photo/cocktail-glasses_144627-34955.jpg?" alt="" />
          <h5>Beverages</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Burger')}>
          <img src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?" alt="" />
          <h5>Burger</h5>
        </div>
        <div className="home-category-card" onClick={()=>navigate('/category/Lunch')}>
          <img src="https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg?" alt="" />
          <h5>Lunch</h5>
        </div>
        <div className="home-category-card" onClick={()=>navigate('/category/Dinners')}>
          <img src="https://img.freepik.com/free-photo/drinks-glasses-new-year-eve-celebration_23-2150901946.jpg?" alt="" />
          <h5>Dinner</h5>
        </div>
        <div className="home-category-card" onClick={()=>navigate('/category/Biriyani')}>
          <img src="https://img.freepik.com/premium-photo/bowl-rice-with-chicken-rice_1028566-43041.jpg?" alt="" />
          <h5>Biriyani</h5>
        </div>

      </div>


      <PopularRestaurants />

      


      <div className="restaurants-container">
        <div className="restaurants-body">
            <h3>Restaurants you may Like..</h3>
            <div className="restaurants">

                {restaurants.map((restaurant) =>(

                  <div className='restaurant-item' key={restaurant._id}>
                      <div className="restaurant" onClick={()=> navigate(`/restaurant/${restaurant._id}`)}>
                          <img src={restaurant.mainImg} alt="" />
                          <div className="restaurant-data">
                              <h6>{restaurant.title}</h6>
                              <p>{restaurant.address}</p>
                          </div>
                      </div>
                  </div>
                ))}

 
            </div>
        </div>
    </div>





      <Footer />
    </div>
  )
}

export default Home