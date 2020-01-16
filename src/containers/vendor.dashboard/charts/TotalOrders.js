import React from 'react';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";
import 'react-table/react-table.css';


class Container extends React.PureComponent<> {
    render() {
        const options = {
                chart: {
                  id: "orders",
                  toolbar:{
                    show: false
                  }
                },
                xaxis: {
                  categories: ['Today', 'This Week','This Month', 'Last Month']
                },
                yaxis: {
                    title: {
                      text: 'No. of Orders'
                    }
                },
        };

        const series = [
          {
            name: "Total Orders",
            data: this.props.qty
          }
        ];
        return (

            <div className="card mb-4 wow fadeIn">
                <div className="card-body">
                    <h6 style={{marginBottom: '1em'}}>Total Orders</h6>
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
