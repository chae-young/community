import React from "react"
import Grid from "@material-ui/core/Grid"
import Rating from "@material-ui/lab/Rating"
import Layout from "../components/Layout"

const View = () => {
  const [value, setValue] = React.useState(4.66)

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img />
        </Grid>
        <Grid item xs={6}>
          <Rating value={value} precision={0.1} readOnly />
        </Grid>
        <Grid item xs={12}>
          <p>{}</p>
        </Grid>
      </Grid>
    </Layout>
  )
}
export default View
