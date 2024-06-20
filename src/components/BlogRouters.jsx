import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BlogsList from './BlogsList';
import BlogRouter from './BlogRouter'; // Adjust path as per your setup

function BlogRouters() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BlogsList} />
        <Route path="/BlogRouter/:id" component={BlogRouter} />
        {/* Other routes if needed */}
      </Switch>
    </Router>
  );
}

export default BlogRouters;
