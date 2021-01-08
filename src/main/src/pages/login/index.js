import './index.less';
import React from 'react';
import { 
  Button,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
  Avatar
} from '@material-ui/core';
import { People, Visibility, VisibilityOff } from '@material-ui/icons';
import cookie from '~/cookie.js';
import login_bg from '../../../public/static/login_bg.jpg';
import login_yj from '../../../public/static/login_yj.png';

export default () => {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    titleBox: false,
    loading: false,
    showAvatar: true,
    showPassword: false,
    usernameErrorType: false,
    passwordErrorType: false,
    usernameErrorText: '请填写用户名',
    passwordErrorText: '请填写密码',
  });
  
  // 相当于 componentDidMount 和 componentDidUpdate:
  React.useEffect(() => {
    if (values.titleBox) return;
    // 初始化图片加载事件
    const arr = [login_bg, login_yj];
    const callBack = () => {
      setValues({ ...values, titleBox: true });
    };
    handleImgLoad(arr, callBack);
  });

  // 加载图片后再渲染登录框
  const handleImgLoad = (arr, callBack) => {
    const brr = []
    arr.forEach((item, index)=>{
      brr[index] = new Promise((resolve, reject)=>{
          let imgReady = new Image
          imgReady.src = item
          imgReady.onload=()=>{
            resolve(index)
          }
      })
    })
    Promise.all(brr).then((result) => {
      if(result && callBack) callBack()
    }).catch((error) => {
      console.log("加载图片——————", error)
    })
  }

  // 输入
  const handleChange = (prop) => (event) => {
    const obj = { ...values, [prop]: event.target.value };
    if (prop === 'username') {
      obj.usernameErrorType = !event.target.value;
    }
    if (prop === 'password') {
      obj.passwordErrorType = !event.target.value;
      obj.passwordErrorText = '请填写密码';
    }
    setValues(obj);
  };

  // 是否加密展示密码
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // 闭眼 —— 选中密码栏 && 不让看
  const handleFocusPass = () => {
    setValues({ ...values, showAvatar: values.showPassword });
  };

  // 睁眼
  const handleBlurPass = () => {
    setValues({ ...values, showAvatar: true });
  };

  // 快捷键回车
  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
		if(keyCode == 13) {
      handleSubmit();
    }
  };

  // 登录效验
  const handleSubmit = () => {
    if (values.loading) return;
    console.log("登录效验——————",values);
    // UI校验
    if (!values.username){
      setValues({ ...values, usernameErrorType: true });
      return;
    }
    if (!values.password){
      setValues({ ...values, passwordErrorType: true, passwordErrorText: '请填写密码' });
      return;
    }
    // 请求
    setValues({ ...values, showAvatar: true, loading: true });
    setTimeout(() => {
      if (values.password !== '111111'){
        setValues({ ...values, loading: false, passwordErrorType: true, passwordErrorText: '密码错误' });
        return;
      } else {
        cookie.set('t', '111111', 1);
        window.localStorage.setItem("user", JSON.stringify({
          "username":"1",
          "password":"111111"
        }));
        window.location.href = '/';
      }
    }, 1000);
  };

  return (
    <div className="login_container">
      <div className="login_bg"></div>
      <div className="title_box">
        <h1 className="title">前端性能监控系统</h1>
        <h3 className="desc">Performance Monitoring System</h3>
        {values.titleBox && <Paper elevation={3} className="login_paper">
          <Avatar className={values.showAvatar ? "avatar" : "avatar avatar_close"} alt="Mason" src={login_yj} />
          {values.loading && values.showAvatar ? <CircularProgress thickness={2} size={100} className="avatar_loading"/> : null}
          <div className="form_box">
            {/* 账号 */}
            <FormControl className="text_form" error={values.usernameErrorType}>
              <InputLabel>Username</InputLabel>
              <Input
                id="username"
                type="text"
                autoFocus
                color="secondary"
                value={values.username}
                onChange={handleChange('username')}
                onKeyPress={handleKeyPress}
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton disableFocusRipple={true}>
                //       <People />
                //     </IconButton>
                //   </InputAdornment>
                // }
              />
              {values.usernameErrorType && <FormHelperText>{values.usernameErrorText}</FormHelperText>}
            </FormControl>
            {/* 密码 */}
            <FormControl className="text_form" error={values.passwordErrorType}>
              <InputLabel>Password</InputLabel>
              <Input
                id="password"
                color="secondary"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                onFocus={handleFocusPass}
                onBlur={handleBlurPass}
                onKeyPress={handleKeyPress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disableFocusRipple={true}
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {values.passwordErrorType && <FormHelperText>{values.passwordErrorText}</FormHelperText>}
            </FormControl>
            {/* 登录 */}
            <Button variant="contained" color="primary" className="form_button" onClick={handleSubmit} disabled={values.loading}>
              Login
              {/* 按钮loading */}
              {/* {values.loading && <CircularProgress size={24} className="form_button_loading"/>} */}
            </Button>
          </div>
        </Paper>}
      </div>
    </div>
  );
};
