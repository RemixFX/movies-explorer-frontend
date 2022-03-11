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
      <AboutProject />
      <Techs/>
      <AboutMe />
      <Portfolio></Portfolio>
      <Footer></Footer>
  </main>
  )
}

export default Main;
