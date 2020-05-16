import React, { Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

import { MyButton } from '../../util/MyButton'

import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/users.actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = {
  form: {
    textAlign: 'center',
  },
  logo: {
    maxWidth: 50,
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    position: 'relative',
    float: 'right',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
}

class EditDetails extends React.Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  }

  mapUSerDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  componentDidMount() {
    const { credentials } = this.props
    this.mapUSerDetailsToState(credentials)
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.mapUSerDetailsToState(this.props.credentials)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                type="text"
                name="bio"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                type="text"
                name="website"
                label="Website"
                placeholder="Your personal/professinal website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                type="text"
                name="location"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  credentials: user.credentials,
})

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
)
