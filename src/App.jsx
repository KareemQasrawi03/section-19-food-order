import Header from "./components/Header";
import Meals from "./components/MealsRelated";
import CartContextProvider from "./store/cartContext";

function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
