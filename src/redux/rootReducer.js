import { combineReducers } from 'redux'

import usersReducer from './reducer/users.reducer'
import dataReducer from './reducer/data.reducer'
import uiReducer from './reducer/Ui.reducer'

const rootReducer = combineReducers({
  user: usersReducer,
  data: dataReducer,
  UI: uiReducer,
})

export default rootReducer
