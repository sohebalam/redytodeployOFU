import { Container, Grid } from "@material-ui/core"
import React from "react"

import CoursesList from "../components/CoursesList"

const CoursesListPage = () => {
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CoursesList />
      </Container>
    </>
  )
}

export default CoursesListPage
