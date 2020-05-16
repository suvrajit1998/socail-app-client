import React from 'react'

import { Link } from 'react-router-dom'

import { MyButton } from '../../util/MyButton'

//Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

//Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/Data.actions'

const LikeScream = ({ likeScream, unlikeScream, user, screamId }) => {
  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true
    else return false
  }

  const likingScream = () => {
    likeScream(screamId)
  }

  const unlikingScream = () => {
    unlikeScream(screamId)
  }

  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikingScream}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likingScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  )
  return likeButton
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapActionToProps = {
  likeScream,
  unlikeScream,
}

export default connect(mapStateToProps, mapActionToProps)(LikeScream)
