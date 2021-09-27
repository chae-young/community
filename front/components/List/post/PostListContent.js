import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import { Grid } from "@material-ui/core"

import styled from "styled-components"
import { ListPoster, ListContent } from "../../../styles/style"
import PostCategoryTag from "./PostCategoryTag"
import PostRating from "../../Post/rating"

const GridContent = styled(Grid)`
  padding: ${(props) => (props.padding ? props.padding.d : 0)};
  @media ${({ theme }) => theme.device.mobile} {
    padding: ${(props) => (props.padding ? props.padding.m : 0)};
  }
`
const PostListContent = ({ post, ...rest }) => {
  const { xs, sm, padding } = rest

  return (
    <GridContent item xs={xs} sm={sm} padding={padding}>
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
    </GridContent>
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
