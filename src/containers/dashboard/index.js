import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import Chart from "react-apexcharts";
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);

        this.state = {
        
            series1: [{
                name: 'Weekly Commission',
                data: [5, 2, 1, 1.3, 1, 2, 4 ]
              }],
              options1: {
                chart: {
                  type: 'bar',
                  height: 350,
                  toolbar:{
                    show: false
                  }
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ['transparent']
                },
                xaxis: {
                  categories: ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yaxis: {
                  title: {
                    text: '₱ (sales commission) 2020'
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return "&#8369; " + val + " thousands"
                    }
                  }
                }
              },

          series2: [{
            
            name: 'Monthly Commission',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41,21,40,12]
          }],
          options2: {
            chart: {
              type: 'bar',
              height: 350,
              toolbar:{
                show: false
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'],
            },
            yaxis: {
              title: {
                text: '₱ (sales commission) 2020'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "&#8369; " + val + " thousands"
                }
              }
            }
          }
        
        
        };
      }
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"dashboard"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h5>Overall Commission: &#8369; </h5>
                                <h5 style={{marginTop: '1em'}}>Per Store Total Commission: &#8369;</h5>
                                <select class="browser-default custom-select" style={{marginBottom: '2em'}} >
                                <option selected>Select a store to view commission</option>
                                <option value="1">Store 1</option>
                                <option value="2">Store 2</option>
                                <option value="3">Store 3</option>
                                <option value="4">Store 4</option>
                                </select>

                                <div id="chart">
                                <Chart options={this.state.options1} series={this.state.series1} type="bar" height={350} style={{marginBottom: '2em'}} />
                                
                                <Chart options={this.state.options2} series={this.state.series2} type="bar" height={350} />
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
