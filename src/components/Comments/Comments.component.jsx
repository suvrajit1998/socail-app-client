import React, { Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

import dayjs from 'dayjs'

const styles = {
  visibleSeparetor: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  invisibleSeparetor: {
    border: 'none',
    margin: 4,
  },
  commentsImage: {
    width: '100%',
    maxWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
}

const Comments = ({ comments, classes }) => {
  return (
    <Grid container>
      {comments === undefined ? (
        <p>Loading...</p>
      ) : (
        comments.map((comment, index) => {
          const { createdAt, body, userImage, userHandle } = comment
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comments"
                      className={classes.commentsImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h: mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparetor} />
                      <Typography variant="body1"> {body} </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparetor} />
              )}
            </Fragment>
          )
        })
      )}
    </Grid>
  )
}

export default withStyles(styles)(Comments)
