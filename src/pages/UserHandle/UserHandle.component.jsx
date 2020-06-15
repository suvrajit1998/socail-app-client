import React, { useEffect, useState } from 'react'

import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import Scream from '../../components/Scream/scream.components'
import StaticProfile from '../../components/StaticProfile/StaticProfile.component'
import ScreamSkeleton from '../../util/ScreamSkeleton'
import ProfileSkeleton from '../../util/ProfileSkeleton'

import { connect } from 'react-redux'
import { getUserData } from '../../redux/actions/Data.actions'

const UserHandle = ({ getUserData, match, data }) => {
  const { screams, loading } = data
  const [profile, setprofile] = useState(null)
  const [screamIdParam, setscreamIdParam] = useState(null)
  useEffect(() => {
    const handle = match.params.handle
    const screamId = match.params.screamId

    if (screamId) setscreamIdParam(screamId)

    getUserData(handle)
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setprofile(res.data.user)
      })
      .catch((ex) => console.log(ex))
  }, [setprofile, setscreamIdParam, match, getUserData])

  const ScreamMarkUp = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No Screams From this User</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam)
        return <Scream scream={scream} key={scream.screamId} />
      else return <Scream scream={scream} key={scream.screamId} openDialog />
    })
  )

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {ScreamMarkUp}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ data }) => ({
  data,
})

export default connect(mapStateToProps, { getUserData })(UserHandle)
