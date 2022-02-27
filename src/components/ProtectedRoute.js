import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children}) => {
  return  loggedIn
  ? children
  : <Redirect to="./signin" />
};

// const ProtectedRoute = ({ component: Component, ...props }) => {
//   return (
//     <Route>
//       {() =>
//         props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
//       }
//     </Route>
//   );
// };

export default ProtectedRoute;

