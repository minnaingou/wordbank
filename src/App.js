import { Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Dictionary from "./containers/Dictionary/Dictionary";
import WordInput from "./containers/Dictionary/WordInput/WordInput";
import Favourite from "./containers/Favourite/Favourite";
import MoreOptions from "./containers/MoreOptions/MoreOptions";
import Practice from "./containers/Practice/Practice";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Dictionary} />
          <Route path="/new-word" component={WordInput} />
          <Route path="/saved" component={Favourite} />
          <Route path="/practice" component={Practice} />
          <Route path="/more" component={MoreOptions} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
