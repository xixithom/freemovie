import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import TodoList from "./components/TodoList";
import UserCard from "./components/UserCard";


function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TodoList /> 
      <Counter /> 
      <UserCard /> 
     <ProductList />
    </div>
  );
}

export default App;