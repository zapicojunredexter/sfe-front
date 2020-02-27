import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import Chart from "react-apexcharts";
import StoresService from '../../services/store.service';
import OrderService from '../../services/orders.service';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);

        this.state = {
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
          },
          data1: [5, 2, 1, 1.3, 1, 2, 4 ],
          data2: [35, 41, 36, 26, 45, 48, 52, 53, 41,21,40,12],
          stores: [],
          selectedStore: null,
          orders: [],
        };
    }

    componentDidMount(){
        // this.handleGraphs();
        this.fetchData();
    }

    fetchData = async () => {
        const stores = await StoresService.get();
        const orders = await OrderService.get();
        this.setState({stores, orders});
    }

    handleGraphs = async () => {
        const orders = await OrderService.get();
        const data1 = this.generateGraph1();
        const data2 = this.generateGraph2();
        this.setState({
            data1,
            data2,
        })
    }

    generateGraph1 = () => {
        const { selectedStore, orders } = this.state;
        const filteredOrders = orders.filter(order => order.store && order.store.id === selectedStore);
        const dataWithDate = filteredOrders.map(order => ({...order, createdAtMs: order.createdAtMs.toDate()}))
        
        // const dataWithDate = [
        //     {
        //         createdAtMs: new Date(),
        //     },
        //     {
        //         createdAtMs: new Date(),
        //     },
        //     {
        //         createdAtMs: new Date(),
        //     },
        // ];
        const daysArray = new Array(7).fill(null).map((item,index) => ({day: index}));
        const daysArrayWithCount = daysArray.map(({day}) => {
            const count = dataWithDate.filter(data => data.createdAtMs && data.createdAtMs.getDay() === day).length;
            return {
                day,
                count,
            };
        });
        const justCount = daysArrayWithCount.map(data => data.count);
        return justCount;
    }

    generateGraph2 = () => {
        const { selectedStore, orders } = this.state;
        const filteredOrders = orders.filter(order => order.store && order.store.id === selectedStore);
        const dataWithDate = filteredOrders.map(order => ({...order, createdAtMs: order.createdAtMs.toDate()}))
        // const dataWithDate = [
        //     {
        //         createdAtMs: new Date(),
        //     },
        //     {
        //         createdAtMs: new Date(),
        //     },
        //     {
        //         createdAtMs: new Date(),
        //     },
        // ];
        const now = new Date();
        const monthArray = new Array(12).fill(null).map((item,index) => ({month: index}));
        const monthArrayWithCount = monthArray.map(({month}) => {
            const count = dataWithDate.filter(data => data.createdAtMs && data.createdAtMs.getFullYear() === now.getFullYear() && data.createdAtMs.getMonth() === month).length;
            return {
                month,
                count,
            };
        });
        const justCount = monthArrayWithCount.map(data => data.count);
        return justCount;
    }

    render() {
        const { stores, selectedStore} = this.state;
        const data1 = this.generateGraph1();
        const data2 = this.generateGraph2();
        console.log({data1, data2, stores, selectedStore});
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
                                <select onChange={(ev) => this.setState({selectedStore: ev.target.value || null})} class="browser-default custom-select" style={{marginBottom: '2em'}} >
                                <option selected value=''>Select a store to view commission</option>
                                    {stores.map(store => <option value={store.id}>{store.name}</option>)}
                                </select>

                                <div id="chart">
                                <Chart
                                    options={this.state.options1}
                                    series={[{
                                        name: 'Weekly Commission',
                                        data: data1,
                                    }]}
                                    type="bar"
                                    height={350}
                                    style={{marginBottom: '2em'}} />
                                
                                <Chart
                                    options={this.state.options2}
                                    series={[{
                                        name: 'Monthly Commission',
                                        data: data2,
                                    }]}
                                    type="bar"
                                    height={350} />
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
