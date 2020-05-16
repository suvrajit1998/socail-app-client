import React from 'react'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { connect } from 'react-redux'

import DeleteScream from '../deleteScream/DeleteScream.component'
import ScreamDialog from '../ScreamDialog/ScreamDialog.component'
import LikeScream from '../LikeScream/LikeScream.component'
import CommentDialog from '../ScreamDialog/CommentDialog.components'

import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// Icons
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}

class Scream extends React.Component {
  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        screamId,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props

    // console.log(screamId)

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null
    dayjs.extend(relativeTime)
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1"> {body} </Typography>
          <LikeScream screamId={screamId} />
          <span>{likeCount} Likes</span>
          <CommentDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
          <span> {commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
