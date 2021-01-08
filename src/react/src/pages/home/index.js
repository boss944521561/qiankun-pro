import './index.less';
import mockData from '~/mock';
import { echarts_duidie } from './components/echarts';
import React from 'react';
import { Paper } from '@material-ui/core';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    echarts_duidie(mockData);
  }

  render() {
    return (
      <div className="home_container">
        <div className="home_title">数据概览</div>
        <div className="home_page_column_box">
          <div className="home_page_column">
            <div className="home_page_column_tit">17,206</div>
            <div className="home_page_column_des">Page View</div>
          </div>
          <div className="home_page_column">
            <div className="home_page_column_tit">30</div>
            <div className="home_page_column_des">Page View</div>
          </div>
          <div className="home_page_column">
            <div className="home_page_column_tit">2,007,206</div>
            <div className="home_page_column_des">Page View</div>
          </div>
          <div className="home_page_column">
            <div className="home_page_column_tit">4,851</div>
            <div className="home_page_column_des">Page View</div>
          </div>
        </div>

        <Paper elevation={3} className="login_paper">
          <div id="echarts_duidie"></div>
        </Paper>
      </div>
    );
  }
};