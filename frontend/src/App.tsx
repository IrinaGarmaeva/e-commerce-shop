import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/pages/Home/Home";

const App = () => {
  return (
    <div className=" h-screen font-montserrat">
      <div className="max-container flex flex-col justify-center padding outline">
        <Header />
        <main>
          <Routes>
            <Route path="" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
