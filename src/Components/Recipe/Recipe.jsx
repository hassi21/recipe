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
    console.log(detailData);
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
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
display: flex;
.active {
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
}
h2 {
  margin-bottom: 2rem;
}
li {
  font-size: 1.6rem;
  line-height: 2.5rem;
}
ul {
  margin-top: 2rem;
}
img{
  height:18rem;
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
margin-left:6rem;`;
export default Recipe;
