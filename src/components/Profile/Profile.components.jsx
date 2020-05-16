import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/users.actions'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import withStyles from '@material-ui/core/styles/withStyles'

import EditDetails from '../EditDetails/EditDetails.component'
import ProfileSkeleton from '../../util/ProfileSkeleton'

import { MyButton } from '../../util/MyButton'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalenderToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyBoardReturn from '@material-ui/icons/KeyboardReturn'

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
})

const Profile = ({
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
  uploadImage,
  logoutUser,
}) => {
  const handleImageChange = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    uploadImage(formData)
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleLogout = () => {
    logoutUser()
  }

  let profileMarkUp = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              {' '}
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2"> {bio} </Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span> {location} </span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalenderToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyBoardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No Profile found, Please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  )
  return profileMarkUp
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = {
  logoutUser,
  uploadImage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile))
