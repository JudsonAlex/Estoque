
import Rotas from "./Rotas"
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const App =() => {

  return (
    <div className="App">
      <Rotas />
      <ToastContainer />
    </div>
  );
}

export default App;
