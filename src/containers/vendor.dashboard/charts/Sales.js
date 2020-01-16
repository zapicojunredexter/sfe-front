import React from 'react';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";
import 'react-table/react-table.css';


class Container extends React.PureComponent<> {
    render() {
        const yearlyOptions = {
            chart: {
              id: "sales",
              toolbar:{
                show: false
              }
            },
            xaxis: {
              categories: ['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            yaxis: {
                title: {
                    text: '₱ (sales 2019)'
                }
            },
          };

        const weeklyOptions = {
            chart: {
              id: "sales",
              toolbar:{
                show: false
              }
            },
            xaxis: {
              categories: ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            yaxis: {
                title: {
                    text: '₱ (sales)'
                }
            },
          };
        return (

            <div className="card mb-4 wow fadeIn">
                <div className="card-body">
                    <h6 style={{marginBottom: '1em'}}>Total Sales</h6>
                    <b>Today's Sale = &#8369; {this.props.totalDailySales}</b>
                    <hr/>
                    <div style={{marginTop: '1em'}}>
                        <p>This week's sales</p>
                        <Chart
                            options={weeklyOptions}
                            series={this.props.weeklyData}
                            type="bar"
                            height="300"
                            style={{marginBottom: '4em'}}
                        />
                    </div>
                    <hr/>
                    <div style={{marginTop: '1em'}}>
                        <p>This year's sales</p>
                        <Chart
                            options={yearlyOptions}
                            series={this.props.yearlyData}
                            type="bar"
                            height="300"
                            style={{marginBottom: '4em'}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
