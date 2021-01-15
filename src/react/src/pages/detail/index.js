import './index.less';
import { echarts_detail } from '~/echarts/echarts_detail';
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    echarts_detail();
  }

  render() {
    return (
      <div className="detail_container">
          <div id="echarts_detail"></div>
      </div>
    );
  }
};