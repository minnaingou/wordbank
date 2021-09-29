import "./App.css";
import Layout from "./components/Layout/Layout";

import BottomNavigator from "./components/UI/BottomNavigation";

function App() {
  return (
    <div className="App">
      <Layout>
        <BottomNavigator />
      </Layout>
    </div>
  );
}

export default App;
