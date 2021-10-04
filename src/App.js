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
          <Route
            path="/add-favourite"
            render={(props) => <WordInput {...props} mode="add" />}
          />
          <Route
            path="/edit-favourite"
            render={(props) => <WordInput {...props} mode="edit" />}
          />
          <Route path="/saved" component={Favourite} />
          <Route path="/practice" component={Practice} />
          <Route path="/more" component={MoreOptions} />
          {/* <Route component={Error404} /> */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
