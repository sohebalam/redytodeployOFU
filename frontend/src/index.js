import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import store from "./redux/store"
import { MuiThemeProvider } from "@material-ui/core"
import theme from "./theme"
import { Container } from "@material-ui/core"
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Container>
        <App />
      </Container>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
