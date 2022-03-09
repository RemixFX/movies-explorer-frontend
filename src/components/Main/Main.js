import Anchor from "../../utils/Anchor";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
  return(
    <main className="content">
      <Header></Header>
      <Promo></Promo>
      <NavTab></NavTab>
      <Anchor name="about_project">
      <AboutProject />
      </Anchor>
      <Anchor name="techs">
        <Techs/>
      </Anchor>
      <Anchor name="about_me">
      <AboutMe />
      </Anchor>
      <Portfolio></Portfolio>
      <Footer></Footer>
  </main>
  )
}

export default Main;
