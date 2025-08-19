import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import Body from "./Body"
import Requests from "./Requests"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import Connections from "./Connections"
import SignUp from "./components/SignUp"

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
          <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/profile/view" element={<Profile />}/>
              <Route path="/connections" element={<Connections />}/>
              <Route path="/requests" element={<Requests />}/>
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
