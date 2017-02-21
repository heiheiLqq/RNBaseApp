import * as types from '../constants/ActionTypes';



export function logIn2(navigator){
  return (dispatch) => {
      navigator.push({
          name: 'main_tabs_view',
      });
      var testUser={a:'lalalallala'};

      dispatch({'type': types.SYSTEM_LOGIN_OK, user: testUser});
    //dispatch(requestPosts(item));
  //   let inner_get = fetch('http://www.baidu.com')
  //       .then((res)=>{
  //         //console.log("logIn ok",res);
  //           console.log('login ok============')
  //        var testUser={a:'lalalallala'};
  //         navigator.push({
  //           name: 'main_tabs_view',
  //         });
  //         dispatch({'type': types.SYSTEM_LOGIN_OK, user: testUser});
  //       }).catch((e)=>{
  //         console.log("logIn error",e);
  //         AlertIOS.alert(e.message);
  //         dispatch({'type': types.SYSTEM_LOGIN_ERROR, error: e});
  //       });
  }
}


 function navigatorto_loginview(navigator) {

var _self=this;

  console.log("getMoviesFromApiAsync",getMoviesFromApiAsync());



  return {
          type:  types.SYSTEM_LOGIN,
          msg: 'pending',
        };

  // navigator.push({
  //   name: 'main_tabs_view',
  // });
  //
  // return {
  //   type: types.SYSTEM_LOGIN
  // }

  // fetch('http://192.168.13.111/YchLrestServer/api/login/auth/4s/web', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({"username":"sssaaa","password":"gchjsb"})
  // }).then((response) => response.json())
  //   .then((responseJson) => {
  //
  //     console.log("response",responseJson);
  //     // navigator.push({
  //     //   name: 'main_tabs_view',
  //     // });
  //
  //     dispatch({
  //       type:  types.SYSTEM_LOGIN,
  //       msg: 'pending',
  //     });
  //
  //     // return {
  //     //   type: types.SYSTEM_LOGIN
  //     // }
  //
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   }).done();


  //return;

}

function getMoviesFromApiAsync() {
  return fetch('http://192.168.13.111/YchLrestServer/api/login/auth/4s/web', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"username":"sssaaa","password":"gchjsb"})
  })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
}



