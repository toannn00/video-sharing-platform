import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import "./App.css";
import PostVideo from "./routes/PostVideo";
import Guard from "./routes/Guard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="post"
            element={
              <Guard>
                <PostVideo />
              </Guard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
