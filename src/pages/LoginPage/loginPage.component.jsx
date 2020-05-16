import React from 'react'

//Redux
import { connect } from 'react-redux'

import { loginUser } from '../../redux/actions/users.actions'

import { Link } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import AppIcon from '../../assets/logo.png'

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
    marginTop: 20,
    position: 'relative',
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

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.logo} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              dont't have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

const mapStateToProps = ({ user, UI }) => ({
  user,
  UI,
})

const mapDispatchProps = {
  loginUser,
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(withStyles(styles)(LoginPage))
