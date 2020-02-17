import { FETCH_SURVEYS } from '../actions/types'

export default function(state = [], actions) {
  switch (actions.type) {
    case FETCH_SURVEYS:
      return actions.payload
    default:
      return state
  }
}
