import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./utils/constants";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

const App = () => {
  return (
    <div className=" h-screen font-montserrat">
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.sign.in} element={<Login />} />
            <Route path={ROUTES.sign.up} element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
