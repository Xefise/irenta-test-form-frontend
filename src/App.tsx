import {Route, Routes,} from "react-router-dom";

import {AnimatePresence} from "framer-motion";
import IndexPage from "./pages/IndexPage";

function App() {

  return (
    <AnimatePresence mode={"wait"}>
      <main className="page">
        <Routes>
          <Route path="/" element={<IndexPage/>}/>
        </Routes>
      </main>
    </AnimatePresence>
  )
}

export default App
