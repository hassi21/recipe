import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styledComponents from "styled-components";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    detailData.status=="success"?setDetails(detailData):console.log(detailData.status.toUpperCase()+": "+detailData.message);
    
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div className="titleDiv">
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients === undefined
              ? "Nothing"
              : details.extendedIngredients.map((ingrdients) => {
                  return (
                    <li key={ingrdients.id}>{ingrdients.original} Pitoo</li>
                  );
                })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styledComponents.div`
margin-top: 10rem;
margin-bottom:5rem;
display: grid;
grid-template-areas:"image ingredients";
h2{
  margin-bottom:4rem;
  font-weight:600;
  font-size:2rem;
}

.active {
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
}
.titleDiv{
  grid-area:image;
  display:flex;
  justify-content:center;
  flex-direction:column;
  
}
img{
  height:18rem;
  
}

@media only screen and (max-width: 480px) {
  img{
    height:25rem;
  }
  grid-template-areas:
  "image"
  "ingredients";
  .titleDiv{
    margin-bottom:3rem;
    
}
}




`;

const Button = styledComponents.button`

padding:1rem 2rem;
background: white;
color:#313131;
border 2px solid black;
margin: 0 2rem 2rem 0;
font-weight:600;
`;
const Info = styledComponents.div`
grid-area:ingredients;
margin-left:6rem;



@media only screen and (max-width: 480px) {
 margin-left:0rem;
 
}

`;
export default Recipe;
