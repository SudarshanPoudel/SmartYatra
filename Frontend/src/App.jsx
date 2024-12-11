import { Route, Routes } from "react-router-dom"
import { Navbar } from "./Components/CommonComp/Navbar"
import { Footer } from "./Components/CommonComp/Footer"

import { Home } from "./Pages/Home/Home"
import { Explore } from "./Pages/Explore/Explore"
import { Form } from "./Pages/Form/Form"
import { Plans } from "./Pages/Plans/Plans"




function App() {
  return (
    <>
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/explore" element={<Explore />} />
           <Route path="/form" element={<Form />} />
           <Route path="/plans" element={<Plans />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;