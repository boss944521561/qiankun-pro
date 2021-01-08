import './index.less';
import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  const handleGoto = path => e => {
    props.history.push(path);
  };
  return (
    <div className="main_notFound_container">
      <h2 className="title">404</h2>
      <Button className="btn" variant="contained" color="primary" onClick={handleGoto('/pms/r')}>
      没这页面，去别处看看
      </Button>
    </div>
  );
};
