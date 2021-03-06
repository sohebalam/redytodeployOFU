import { createMuiTheme } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"

import { blue, yellow } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f51174",
    },
  },

  typography: {
    fontFamily: ["Arial"].join(","),
  },
})
export default theme
