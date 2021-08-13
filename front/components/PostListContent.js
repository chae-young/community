import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import { ListPoster, StyledRating, Ratebox, ListContent } from "../styles/style"

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    padding: props.d,
    [theme.breakpoints.down("xs")]: {
      padding: props.m,
    },
  }),
}))

const PostListContent = ({ post, ...rest }) => {
  const { xs, sm, padding } = rest
  const props = padding
  const classes = useStyles(props)

  return (
    <Grid item xs={xs} sm={sm} className={classes.root}>
      <Link href={`/post/${post.id}`}>
        <a>
          <ListPoster heightVal="25em">
            <img
              src={
                post.Images[0].src.includes("http")
                  ? post.Images[0].src
                  : `http://localhost:3063/${post.Images[0].src}`
              }
              width="100%"
              alt={post.title}
            />
          </ListPoster>
          <ListContent>
            <p>{post.title}</p>
            <Ratebox>
              <StyledRating precision={0.1} value={post.rating} readOnly />
              <span>{post.rating.substring(0, 3)}</span>
            </Ratebox>
          </ListContent>
        </a>
      </Link>
    </Grid>
  )
}

PostListContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.string,
    Images: PropTypes.array,
  }).isRequired,
}

export default PostListContent
