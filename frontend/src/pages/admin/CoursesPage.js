import { Container, Grid } from "@material-ui/core"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import CourseForm from "../../components/CourseForm"
import CoursesList from "../../components/CoursesList"

const CoursesPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.isAdmin) {
    } else {
      history.push("/")
    }
  }, [history])
  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <Container component="main" maxWidth="xs">
            <CourseForm />
          </Container>
        </Grid>
        <Grid item sm={6}>
          <CoursesList />
        </Grid>
      </Grid>
    </>
  )
}

export default CoursesPage
