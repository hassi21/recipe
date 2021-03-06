import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );

      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
            autoplay: true,
            lazyLoad: true,
            breakpoints: {
              480: {
                perPage: 1,
                snap:true,
              },
              768: {
                perPage: 2,
              },
            },
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styledComponents.div`
  margin: 4rem 0rem;
`;
const Card = styledComponents.div`
  height: 12rem;
  border-radius: 2rem;
  
  overflow: hidden;
  position: relative;
   img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,0.3);
    padding:0.5rem;

  }
  @media only screen and (max-width: 480px) {
    margin: 0 2rem;
    height: 18rem;

    
  }
`;
const Gradient = styledComponents.div`
z-index:3;
position:absolute;
width:100%;
height:100%
background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))`;
export default Popular;
