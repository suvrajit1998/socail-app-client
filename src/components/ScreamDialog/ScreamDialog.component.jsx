import React, { Fragment, useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { MyButton } from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import LikeScream from '../LikeScream/LikeScream.component'
import Comments from '../Comments/Comments.component'
import CommentSubmit from '../CommentSubmit/CommentSubmit.component'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CirculerProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/Data.actions'

const styles = {
  invisibleSeparetor: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  DialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinerDiv: {
    textAlign: 'center',
    margin: '50px 0',
  },
  visibleSeparetor: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
}

const ScreamDialog = ({
  classes,
  scream: { body, createdAt, likeCount, commentCount, userImage, comments },
  UI: { loading },
  screamId,
  userHandle,
  getScream,
  clearErrors,
  openDialog,
}) => {
  const [state, setstate] = useState({
    open: false,
    oldPath: '',
    newPath: '',
  })

  useEffect(() => {
    if (openDialog) {
      handleOpen()
    }
  }, [])

  const handleOpen = () => {
    let oldPath = window.location.pathname

    const newPath = `/users/${userHandle}/scream/${screamId}`

    if (oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath)

    setstate({
      open: true,
      oldPath,
      newPath,
    })
    getScream(screamId)
  }

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath)

    setstate({
      open: false,
    })
    clearErrors()
  }

  const dialogMarkUp = loading ? (
    <div className={classes.spinerDiv}>
      <CirculerProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={1}>
      <Grid item sm={5}>
        <img src={userImage} alt="profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          color="primary"
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparetor} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h: mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparetor} />
        <Typography variant="body1">{body}</Typography>
        <LikeScream screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span> {commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparetor} />
      <CommentSubmit screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  )

  return (
    <Fragment>
      <MyButton
        tip="Expand Scream"
        onClick={handleOpen}
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.DialogContent}>
          {dialogMarkUp}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

const mapStateToProps = ({ data, UI }) => ({
  scream: data.scream,
  UI,
})

export default connect(mapStateToProps, { getScream, clearErrors })(
  withStyles(styles)(ScreamDialog)
)
