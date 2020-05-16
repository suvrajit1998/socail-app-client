import React, { Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

//icons
import DeleteOutLine from '@material-ui/icons/DeleteOutline'

import { MyButton } from '../../util/MyButton'

import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/Data.actions'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10% ',
  },
}

class DeleteScream extends React.Component {
  state = {
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.setState({ open: false })
  }
  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <MyButton
          tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutLine color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
