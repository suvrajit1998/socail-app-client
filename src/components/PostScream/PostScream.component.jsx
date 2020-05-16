import React, { Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CirculerProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

//icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

//Redux
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/Data.actions'

import { MyButton } from '../../util/MyButton'

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  submitButon: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  circulerProgress: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    top: '6%',
    left: '91%',
  },
}

class PostScream extends React.Component {
  state = {
    open: false,
    body: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} })
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.props.clearErrors()
    this.setState({ open: false, errors: {} })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.postScream({ body: this.state.body })
  }

  render() {
    const {
      UI: { loading },
      classes,
    } = this.props

    return (
      <Fragment>
        <MyButton tip="Post a Scream" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!!"
                multiline
                rows="3"
                placeholder="Scream At your fellow App"
                error={this.state.errors.body ? true : false}
                helperText={this.state.errors.body}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submitButon}
              >
                submit
                {loading && (
                  <CirculerProgress
                    size={30}
                    className={classes.circulerProgress}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ UI }) => ({
  UI,
})

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
)
