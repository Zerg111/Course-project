import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import NavBar from "./components/navBar"
import Main from "./components/main"
import Login from "./components/login"
import SingleUser from "./components/singleUser"
import NotFoundPage from "./components/notFoundPage"

function App() {
    return (
        <div className="container-xl">
            <NavBar />
            <main>
                <Switch>
                    <Route path="/" component={Main} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/users/:userId?" component={SingleUser} />
                    <Route path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </main>
        </div>
    )
}

export default App
