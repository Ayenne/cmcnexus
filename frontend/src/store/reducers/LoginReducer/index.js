import {LOGIN, LOGOUT, LOGIN_ERROR, SET_CURRENT_USER} from '../../actions/actionTypes';

const init = {
	token: null,
	user: null,
	is_authenticated: false,
	error: null
}

export default function login(state = init, action) {
	switch(action.type) {
		case LOGIN: {
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				is_authenticated: true,
				error: null,
			}
		}
		case LOGOUT: {
			localStorage.clear();
			return init
		}
		case LOGIN_ERROR: {
			return {
				...state,
				token: null,
				is_authenticated: false,
				error: action.payload,
			}
		}
		case SET_CURRENT_USER: {
			console.log('in reducer', state.is_authenticated)
			if (state.is_authenticated) {
				return {...state, user: action.payload}
			}
			return state
		}
		default:
			return state
	}
}