import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
