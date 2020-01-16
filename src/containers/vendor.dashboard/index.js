import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import Chart from "react-apexcharts";
import TotalOrdersChart from './charts/TotalOrders';
import TotalProductsSold from './charts/TotalProductsSold';
import Sales from './charts/Sales';
import OrderService from '../../services/orders.service';
import ProductService from '../../services/products.service';
import 'react-table/react-table.css';


class Container extends React.PureComponent<> {
    ordersListener = null;

    productsListener = null;

    state = {
        orders: [],
        products: [],
    };
    componentDidMount(){
        this.closeListeners();
        this.ordersListener = OrderService.createStoreListener(this.props.userId, (data) => {
            this.setState({orders: data});
        });
        this.productsListener = ProductService.createStoreProductsListener(this.props.userId, (data) => {
            this.setState({products: data.filter(dat => dat.deleted === false)});
        });
    }
    componentWillUnmount(){
        this.closeListeners();
    }

    closeListeners = () => {
        if(this.ordersListener){
            this.ordersListener();
        }
        if(this.productsListener) {
            this.productsListener();
        }
    }

    msToDays  = (ms) => {
        return ms / 86400000;
    }
   summarizeTotalOrdersReport = () => {
       const { orders } = this.state;
       const now = new Date();
       const thisMonth = now.getMonth();
       const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
       const lastYear = thisMonth === 0 ? now.getFullYear() - 1: now.getFullYear();
       const ordersWithDate = orders.map(order => {
           const createdDate = order.createdAtMs.toDate();
           return {
               ...order,
               createdAtDate: createdDate,
               daysDiff: this.msToDays(now.getTime() - createdDate.getTime())
           }
       });

       const forToday = ordersWithDate.filter(order => {
            const createdDate = order.createdAtDate;
            return (
                createdDate &&
                createdDate.getFullYear() === now.getFullYear() &&
                createdDate.getMonth() === now.getMonth() &&
                createdDate.getDate() === now.getDate()
            )
        });

        const forThisWeek = ordersWithDate.filter(order => {
            const daysDiff = order.daysDiff;
            return (
                daysDiff <= 7
            )
        });

        const forThisMonth = ordersWithDate.filter(order => {
            const createdDate = order.createdAtDate;
            return (
                createdDate &&
                createdDate.getFullYear() === now.getFullYear() &&
                createdDate.getMonth() === now.getMonth()
            )
        });

        const forLastMonth = ordersWithDate.filter(order => {
            const createdDate = order.createdAtDate;
            return (
                createdDate &&
                createdDate.getFullYear() === lastYear &&
                createdDate.getMonth() === lastMonth
            )
        });
       const todayCount = forToday.length;
       const thisWeekCount = forThisWeek.length;
       const thisMonthCount = forThisMonth.length;
       const lastMonthCount = forLastMonth.length;
       return [todayCount, thisWeekCount, thisMonthCount, lastMonthCount];
   }

   summarizeProducts = () => {

        const { orders, products } = this.state;
        return products.map(product => `${product.name}(${product.serving})`);
   }

   summarizeTotalProductsSoldReport = () => {
        const { orders, products } = this.state;
        return products.map(product => product.stockQty);
        return [30, 125, 70, 60];
   }
    
    summarizeWeeklyReport = () => {
        const { orders, products } = this.state;
        const now = new Date();
        const ordersWithDate = orders.map(order => {
            const createdDate = order.createdAtMs.toDate();
            return {
                ...order,
                createdAtDate: createdDate,
                daysDiff: this.msToDays(now.getTime() - createdDate.getTime())
            }
        });
        const forThisWeek = ordersWithDate.filter(order => {
            const daysDiff = order.daysDiff;
            return (
                daysDiff <= 7
            )
        });
        const weekArray = new Array(7).fill(null).map((it, index) => {
            const day = index;
            const matchedDay = forThisWeek.filter(ftw => ftw.createdAtDate.getDay() === day);
            return matchedDay.length;
        });
        return [
            {
              name: "This Week Total Sales",
              data: [2000, 1250, 1500, 3211, 5231, 1312, 2231],
              data: weekArray,
            }
        ];
    }

    summarizeYearlyReport = () => {
        const { orders, products } = this.state;
        const now = new Date();
        const ordersWithDate = orders.map(order => {
            const createdDate = order.createdAtMs.toDate();
            return {
                ...order,
                createdAtDate: createdDate,
                daysDiff: this.msToDays(now.getTime() - createdDate.getTime())
            }
        });
        const monthArray = new Array(12).fill(null).map((it, index) => {
            const month = index;
            const matchMonth = ordersWithDate.filter(order => {
                const createdDate = order.createdAtDate;
                return (
                    createdDate &&
                    createdDate.getFullYear() === now.getFullYear() &&
                    createdDate.getMonth() === month
                );
            });
            return matchMonth.length;
        });
        return [
            {
              name: "This Week Total Sales",
              data: [22000, 17250, 15200, 22211, 15231, 11312, 12231, 12312, 21121,12311,11211,13212],
              data: monthArray
            }
        ]
    }

    summarizeDailySales = () => {

        const { orders, products } = this.state;
        const now = new Date();
        const ordersWithDate = orders.map(order => {
            const createdDate = order.createdAtMs.toDate();
            return {
                ...order,
                createdAtDate: createdDate,
                daysDiff: this.msToDays(now.getTime() - createdDate.getTime())
            }
        });
        
        const forToday = ordersWithDate.filter(order => {
            const createdDate = order.createdAtDate;
            return (
                createdDate &&
                createdDate.getFullYear() === now.getFullYear() &&
                createdDate.getMonth() === now.getMonth() &&
                createdDate.getDate() === now.getDate()
            )
        });

        const totalSales = forToday.reduce((acc, cur) => acc + cur.payment.total,0);
        return totalSales;
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
                    <TotalOrdersChart
                        qty={this.summarizeTotalOrdersReport()}
                    />

                    <TotalProductsSold
                        products={this.summarizeProducts()}
                        qty={this.summarizeTotalProductsSoldReport()}
                    />

                    <Sales
                        weeklyData={this.summarizeWeeklyReport()}
                        yearlyData={this.summarizeYearlyReport()}
                        totalDailySales={this.summarizeDailySales()}
                    />
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    userId: state.userStore.user && state.userStore.user.id,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
