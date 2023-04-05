import {Route, Routes,} from "react-router-dom";

import {AnimatePresence} from "framer-motion";
import IndexPage from "./pages/IndexPage";
import BeautyFormPage from "./pages/BeautyFormPage";

function App() {

  return (
    <AnimatePresence mode={"wait"}>
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="/beauty" element={<BeautyFormPage/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default App
