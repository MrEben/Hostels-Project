import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ItemPage from "./pages/ItemPage";
import CheckoutPage from "./pages/CheckoutPge";
import Search from "./pages/SearchResults";
import { AppProvider } from "./components/context";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/search" element={<Search />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
          </Routes>

          <Footer />
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
