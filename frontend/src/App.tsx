import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

const App = () => {
  return (
    <div className=" h-screen font-montserrat">
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-grow mt-36">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
