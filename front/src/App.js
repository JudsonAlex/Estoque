
import Rotas from "./Rotas"
import "./app.css";
import { Toaster } from "react-hot-toast";



const App =() => {

  return (
    <div className="App">
      <Rotas />
      <Toaster />
    </div>
  );
}

export default App;
