import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Navbar } from "./Components/CommonComp/Navbar"
import { Footer } from "./Components/CommonComp/Footer"

import { Home } from "./Pages/Home/Home"
import { Explore } from "./Pages/Explore/Explore"
import { Form } from "./Pages/Form/Form"
import { Plans } from "./Pages/Plans/Plans"
import { useEffect } from "react"

// Custom ScrollToTop
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
        <BrowserRouter>
        {/* Custom ScrollToTop */}
          <ScrollToTop />
          <Navbar />
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/explore" element={<Explore />} />
           <Route path="/form" element={<Form />} />
           <Route path="/plans" element={<Plans />} />
         </Routes>
         <Footer />
        </BrowserRouter>
  
  );
}

export default App;