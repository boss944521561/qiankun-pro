import './index.less';
import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {
  const handleGoto = path => e => {
    props.history.push(path);
  };
  return (
    <div className="noAccess_container">
      <h2 className="title">403</h2>
      <Button className="btn" variant="contained" color="primary" onClick={handleGoto('/')}>
      没权限啊，咋混的
      </Button>
    </div>
  );
};
