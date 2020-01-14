import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import Chart from "react-apexcharts";
import 'react-table/react-table.css';


class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    
        this.state = {
            option1: {
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
              },
              series1: [
                {
                  name: "Total Orders",
                  data: [30, 125, 300, 600]
                }
              ],

          option2: {
            chart: {
              id: "products",
              toolbar:{
                show: false
              }
            },
            xaxis: {
              categories: ['Chicken(pieces)', 'Pizza(Boxes)','Kwek-Kwek(servings)', 'Burger(pieces)']
            },
            yaxis: {
                title: {
                  text: 'Stock Quantity'
                }
            },
          },
          series2: [
            {
              name: "Stock Quantity",
              data: [30, 125, 70, 60]
            }
          ],
        
          option3: {
            chart: {
              id: "sales",
              toolbar:{
                show: false
              }
            },
            xaxis: {
              categories: ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            yaxis: {
                title: {
                    text: '₱ (sales)'
                }
            },
          },
          series3: [
            {
              name: "This Week Total Sales",
              data: [2000, 1250, 1500, 3211, 5231, 1312, 2231]
            }
          ],
          option4: {
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
          },
          series4: [
            {
              name: "This Week Total Sales",
              data: [22000, 17250, 15200, 22211, 15231, 11312, 12231, 12312, 21121,12311,11211,13212]
            }
          ]

        };
      }
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"VendorDashboard"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                    <div className="card mb-4 wow fadeIn">

                        <div className="card-body">
                            <h6 style={{marginBottom: '1em'}}>Total Orders</h6>
                            <Chart
                                options={this.state.option1}
                                series={this.state.series1}
                                type="bar"
                                height="300"
                                style={{marginBottom: '4em'}}
                            />

                        </div>

                    </div>

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h6 style={{marginBottom: '1em'}}>Total Product Sold</h6>
                                <select class="browser-default custom-select" style={{ float: 'right', marginBottom: '1em'}}>
                                    <option selected>Today</option>
                                    <option value="1">This Week</option>
                                    <option value="2">This Month</option>
                                    <option value="3">Last Month</option>
                                </select>
                                <Chart
                                    options={this.state.option2}
                                    series={this.state.series2}
                                    type="bar"
                                    height="300"
                                    style={{marginBottom: '4em'}}
                                />

                            </div>

                        </div>

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                            <h6 style={{marginBottom: '1em'}}>Total Sales</h6>
                               <b >Today's Sale = &#8369; 2050</b>
                               <hr/>
                                <div style={{marginTop: '1em'}}>
                                    <p>This week's sales</p>
                                    <Chart
                                        options={this.state.option3}
                                        series={this.state.series3}
                                        type="bar"
                                        height="300"
                                        style={{marginBottom: '4em'}}
                                    />
                                </div>
                                <hr/>
                                <div style={{marginTop: '1em'}}>
                                    <p>This year's sales</p>
                                    <Chart
                                        options={this.state.option4}
                                        series={this.state.series4}
                                        type="bar"
                                        height="300"
                                        style={{marginBottom: '4em'}}
                                    />
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
