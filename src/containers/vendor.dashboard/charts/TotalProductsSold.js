import React from 'react';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";
import 'react-table/react-table.css';


class Container extends React.PureComponent<> {
    render() {
        const options = {
            chart: {
              id: "products",
              toolbar:{
                show: false
              }
            },
            xaxis: {
              categories: this.props.products,
            },
            yaxis: {
                title: {
                  text: 'Stock Quantity'
                }
            },
          };

        const series = [
            {
              name: "Stock Quantity",
              data: this.props.qty,
            }
          ];
        return (

            <div className="card mb-4 wow fadeIn">
                <div className="card-body">
                    <h6 style={{marginBottom: '1em'}}>Total Product Sold</h6>
                    <select class="browser-default custom-select" style={{ float: 'right', marginBottom: '1em'}}>
                        <option>Today</option>
                        <option value="1">This Week</option>
                        <option value="2">This Month</option>
                        <option value="3">Last Month</option>
                    </select>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height="300"
                        style={{marginBottom: '4em'}}
                    />
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
