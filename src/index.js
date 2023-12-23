import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import Navigations from "./components/Navigations"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Navigations />
                <ToastContainer autoClose={1500} />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)