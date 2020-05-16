import React, { useState, Fragment } from 'react'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import Favorite from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/users.actions'

const Notifications = ({ notifications, markNotificationsRead }) => {
  const [anchorEl, setanchorEl] = useState(null)

  dayjs.extend(relativeTime)

  const handleOpen = (e) => {
    setanchorEl(e.target)
  }

  const handleClose = () => {
    setanchorEl(null)
  }

  const onMenuOpend = () => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId)

    markNotificationsRead(unreadNotificationsIds)
  }

  let notificationIcon

  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />)
  } else notificationIcon = <NotificationsIcon />

  let notificationsMarkUp =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const varb = not.type === 'like' ? 'liked' : 'commented on'
        const time = dayjs(not.createdAt).fromNow()
        const iconColor = not.read ? 'primary' : 'secondary'
        const icon =
          not.type === 'like' ? (
            <Favorite color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )
        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              variant="body1"
              color="inherit"
              to={`/user/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {varb} your scream {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no Notifications yet</MenuItem>
    )

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        onEntered={onMenuOpend}
      >
        {notificationsMarkUp}
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = ({ user }) => ({
  notifications: user.notifications,
})

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
)
