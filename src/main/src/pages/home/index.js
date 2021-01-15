import './index.less';
import React from 'react';
import { echarts_shijie } from '~/echarts/echarts_shijie';
import Button from '@material-ui/core/Button';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    echarts_shijie();
  }

  handleGoto(path) {
    window.location.href = `${window.location.origin}${path}`;
  };

  render() {
    return (
      <div className="mainhome_container">
        <div id="echarts_shijie"></div>
        <Button className="mainhome_button_issues" variant="contained" color="primary" onClick={() => { this.handleGoto('/issues') }}>
          问题墙
        </Button>
        <Button className="mainhome_button" variant="contained" color="primary" onClick={() => { this.handleGoto('/pms/r') }}>
          开始探索
        </Button>
      </div>
    );
  }
};