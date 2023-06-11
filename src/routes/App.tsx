import housetableLogo from "../assets/images/housetable.svg";
import { Layout } from "antd";
import { Outlet, NavLink } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header id="Header">
          <nav id="menu">
            {/* <NavLink to="/houses">List</NavLink> */}
            <NavLink to="/">Home page</NavLink>
          </nav>
          <img className="logo" src={housetableLogo} alt="" />
        </Header>
        <Content id="Content">
          <Outlet />
        </Content>
        <Footer id="Footer"></Footer>
      </Layout>
    </div>
  );
}

export default App;
