import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/Data.actions'

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  visibleSeparetor: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
}

class CommentSubmit extends React.Component {
  state = {
    body: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
    }
  }

  handlChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitComment(this.props.screamId, { body: this.state.body })
  }

  render() {
    const { classes, authenticated } = this.props

    const commentMarkUp = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on Scream"
            error={this.state.errors.comment ? true : false}
            helperText={this.state.errors.comment}
            value={this.state.body}
            onChange={this.handlChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            submit
          </Button>
        </form>
        <hr className={classes.visibleSeparetor} />
      </Grid>
    ) : null
    return commentMarkUp
  }
}

const mapStateToProps = ({ UI, user }) => ({
  UI,
  authenticated: user.authenticated,
})

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentSubmit)
)
