import React from 'react';
import chart from 'chart';
import api from '../constants/api-endpoint';
import appConsts from '../constants/action-constants.js';
import request from 'request-service';
import _ from 'lodash';
const labels = ['ASP', 'RCN', 'LPAR'];

export default class TEMPMODULENAMEWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.goto = this.goto.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
    this.getWidgetData = this.getWidgetData.bind(this);
  }

  componentDidMount() {
    this.getWidgetData();
  }

  goto(type = '', subtype = '') {
    //console.log(`type: ${type} subtype: ${subtype}`);
  }

  handleClickCallback(e) {
    let subtype = '';
    let type = '';
    if (e.legend) {
      subtype = e.element.text;
    } else if (e._view) {
      let element = e._view;
      subtype = element.datasetLabel || '';
      type = element.label;
    }

    this.goto(type, subtype);
  }

  getWidgetData() {
    let url = `${api.widget}`;
    this.setState({
      isLoading: true
    });

    request
      .fetch(url)
      .then(resp => {
        let _healthy = [];
        let _weak = [];
        let _poor = [];
        let _exception = [];

        let _healthyTotal = 0;
        let _weakTotal = 0;
        let _poorTotal = 0;
        let _exceptionTotal = 0;

        let asp = 0;
        let rcn = 0;
        let lpar = 0;

        let metaArray = [
          {data: resp.asp, title: appConsts.type.asp},
          {data: resp.rcn, title: appConsts.type.rcn},
          {data: resp.lpar, title: appConsts.type.lpar}
        ];

        _.forEach(metaArray, info => {
          let item = info.data;
          let title = info.title;

          let _healthyCount = 0;
          let _weakCount = 0;
          let _poorCount = 0;
          let _exceptionCount = 0;
          let total = 0;
          if (item) {
            if (item.healthy && _.isArray(item.healthy)) {
              _healthyCount = item.healthy.length;
            }
            _healthy.push(_healthyCount);

            if (item.weak && _.isArray(item.weak)) {
              _weakCount = item.weak.length;
            }
            _weak.push(_weakCount);

            if (item.poor && _.isArray(item.poor)) {
              _poorCount = item.poor.length;
            }
            _poor.push(_poorCount);

            if (item.exception && _.isArray(item.exception)) {
              _exceptionCount = item.exception.length;
            }
            _exception.push(_exceptionCount);

            _healthyTotal = _healthyTotal + _healthyCount;
            _weakTotal = _weakTotal + _weakCount;
            _poorTotal = _poorTotal + _poorCount;
            _exceptionTotal = _exceptionTotal + _exceptionCount;
            total = _healthyCount + _weakCount + _poorCount + _exceptionCount;

            switch (title) {
              case appConsts.type.asp:
                asp = total;
                break;
              case appConsts.type.rcn:
                rcn = total;
                break;
              case appConsts.type.lpar:
                lpar = total;
                break;
            }
          }
        });
        let data = [];
        if (_healthyTotal) {
          data.push({
            label: appConsts.lable.healthy,
            data: _healthy,
            backgroundColor: appConsts.color.healthy
          });
        }

        if (_weakTotal) {
          data.push({
            label: appConsts.lable.weak,
            data: _weak,
            backgroundColor: appConsts.color.weak
          });
        }

        if (_poorTotal) {
          data.push({
            label: appConsts.lable.poor,
            data: _poor,
            backgroundColor: appConsts.color.poor
          });
        }
        if (_exceptionTotal) {
          data.push({
            label: appConsts.lable.exception,
            data: _exception,
            backgroundColor: appConsts.color.exception
          });
        }
        this.setState({data, isLoading: false, asp, rcn, lpar});
      })
      .catch(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      <div className="widgetPanels openTickets openTicketWidget">
        <div className="panelContent">
          {this.state.isLoading && <div className="loader" />}
          <h6 className="panelHeading">MODULETITLE</h6>

          <div className="count">
            <span />
          </div>
          <div className="panelComponents">
            <ul className="componentList">
              <li
                onClick={() => {
                  this.goto(appConsts.type.asp);
                }}
              >
                <p className="componentName">{appConsts.type.asp}</p>
                <p className="componentInfo">
                  <a href="javascript:void(0)">{this.state.asp || 0}</a>
                </p>
              </li>
              <li
                onClick={() => {
                  this.goto(appConsts.type.rcn);
                }}
              >
                <p className="componentName">{appConsts.type.rcn}</p>
                <p className="componentInfo">
                  <a href="javascript:void(0)">{this.state.rcn || 0}</a>
                </p>
              </li>
              <li
                onClick={() => {
                  this.goto(appConsts.type.lpar);
                }}
              >
                <p className="componentName">{appConsts.type.lpar}</p>
                <p className="componentInfo">
                  <a href="javascript:void(0)">{this.state.lpar || 0}</a>
                </p>
              </li>
            </ul>
          </div>
          <div className="panelDetails">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active">
                <chart.StackedBarChart
                  dataset={this.state.data}
                  showLegends={true}
                  labels={labels}
                  clickCallback={this.handleClickCallback}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TEMPMODULENAMEWidget.propTypes = {
  //data: PropTypes.object.isRequired
};
