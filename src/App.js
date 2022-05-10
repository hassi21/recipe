import Home from "./Components/Home/Home";
import Cluster from "./Components/Cluster/Cluster";
import Category from "./Components/category/category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./Components/search/search";
import styledComponents from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>delicious</Logo>
        </Nav>
        <Search />
        <Category />
        <Cluster />
      </BrowserRouter>
    </div>
  );
}

const Logo = styledComponents(Link)`
text-decoration:none;
font-size:1.5rem;
font-weight:400;
font-family:'Lobster Two',cursive`;
const Nav = styledComponents.div`
padding: 4rem 0rem;
display:flex;
justify-content:left;
align-items:center;
svg{
  font-size:2rem;
}
`;
export default App;
