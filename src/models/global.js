
export default {
  namespace: 'global',
  state: {
    path: '/',
  },

  effects: {
    
  },

  reducers: {
    changPath(state, {payload}){
      return {
        ...state,
        path: payload,
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'changPath',
          payload: location.pathname
        })
      })
    },
  },
};
