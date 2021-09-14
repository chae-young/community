import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import { ListPoster, ListContent } from "../../../styles/style"
import PostCategoryTag from "./PostCategoryTag"
import PostRating from "../../Post/rating"

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
            <img src={post.Images[0].src} width="100%" alt={post.title} />
            <PostCategoryTag category={post.category} />
          </ListPoster>
          <ListContent>
            <p>{post.title}</p>
            <PostRating rate={post.rating} />
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
    category: PropTypes.string,
    rating: PropTypes.string,
    Images: PropTypes.array,
  }).isRequired,
}

export default PostListContent
