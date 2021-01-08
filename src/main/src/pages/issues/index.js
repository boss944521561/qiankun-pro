import './index.less';
import React from 'react';
import { Paper } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import noteData from './components/data';

export default () => {
  return (
    <div className="issues_container">
      <h2 className="issues_header">技术问题墙</h2>
      <Paper elevation={3} className="issues_paper">
        {noteData.length ? noteData.map((v, i) => {
          return (
            <div key={i} className="issues_item">
              <p className="issues_tit">{i + 1}. {v.title}</p>
              <span className="issues_des">{v.desc}</span>
              <div className="issues_author">
                {v.author.length ? v.author.map((v1, i1) => {
                  return (
                    <div className="issues_author_item" key={i1}>
                      <p className="issues_author_item_tit">
                        <span className="issues_author_item_time">{v1.time}</span>
                        <span className="issues_author_item_name">{v1.name || '不愿透露姓名的王某'}</span>
                        {v1.type ? <CheckCircleIcon className="issues_author_item_icon"/> : null}
                      </p>
                      <p className="issues_author_item_des">{v1.desc}</p>
                    </div>
                  )
                }) : null}
              </div>
            </div>
          )
        }) : null}
      </Paper>
    </div>
  );
};