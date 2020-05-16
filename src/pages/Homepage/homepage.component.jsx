import React from 'react'

import Grid from '@material-ui/core/Grid'

import Scream from '../../components/Scream/scream.components'

import Profile from '../../components/Profile/Profile.components'

import ScreamSkeleton from '../../util/ScreamSkeleton'

import { connect } from 'react-redux'
import { getScreams } from '../../redux/actions/Data.actions'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getScreams()
  }
  render() {
    const { screams, loading } = this.props.data
    // console.log(screams[0])
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    )
    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  data,
})

export default connect(mapStateToProps, { getScreams })(HomePage)
