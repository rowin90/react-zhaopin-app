import axios from 'axios'
import {getRedirectPath} from '../util'


const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    pwd: '',
    type: ''
};
// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            console.log(action.payload);
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state
    }
}

function authSuccess(obj) {
    const {pwd, ...data} = obj; // 过滤pwd不显示
    return {type: AUTH_SUCCESS, payload: data}
}


function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg}

}


export function loadData(userinfo) {
    // 获取用户信息
    return {type: LOAD_DATA, payload: userinfo}

}

export function update(data) {
    // 更新用户信息
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

// action Creator
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}


export function register({user,pwd,repeatpwd,type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispath => {
        axios.post('/user/register', {user, pwd, type})
            .then(res=> {
                if (res.status === 200 && res.data.code === 0) {
                    dispath(authSuccess({user, pwd, type}))
                } else {
                    dispath(errorMsg(res.data.msg))
                }
            })
    }

}