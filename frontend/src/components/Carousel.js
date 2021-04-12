import { Grid } from "@material-ui/core"
import SimpleImageSlider from "react-simple-image-slider"
import one from "../images/1.jpg"
import two from "../images/2.jpg"
import three from "../images/3.jpg"
import four from "../images/4.jpg"

const images = [
  { url: one },
  { url: two },
  { url: three },
  { url: four },
  //   { url: "../images/5.jpg" },
  //   { url: "../images/6.jpg" },
  //   { url: "../images/7.jpg" },
]

const Carousel = () => {
  return (
    <>
      <Grid container>
        <SimpleImageSlider
          width={1232}
          height={300}
          images={images}
          showNavs="true"
          showBullets="true"
        />
      </Grid>
    </>
  )
}
export default Carousel
