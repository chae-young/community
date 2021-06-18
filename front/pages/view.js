import React from 'react';
import Layout from "../components/Layout";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

const View = ()=>{
  const { postList } = useSelector((state) => state.post)

    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <img src={} alt={}/>
                </Grid>
                <Grid item xs={6}>
                    <h2>{title}</h2>
                    <Rating name="read-only" value={value} readOnly />
                </Grid>
                <Grid item xs={12}>
                    <p>{}</p>
                </Grid>
            </Grid>   
        </Layout>
    )
}
export default View;