import Header from "./components/Header"
import EmployeeList from "./components/EmployeeList"

function App() {
  return (
    <div>
      <Header />
      <EmployeeList count={10} />
    </div>
  );
}

export default App;
