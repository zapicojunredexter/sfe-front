import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ReviewsService from '../../services/reviews.service';


class Container extends React.PureComponent<> {
    listener = null;

    state = {
        reviews: [],
    };
    componentDidMount(){
        this.closeListener();
        this.listener = ReviewsService.createStoreReviewsListener(this.props.userId, (data) => {
            this.setState({reviews: data});
        });
    }
    componentWillUnmount(){
        this.closeListener();
    }

    closeListener = () => {
        if(this.listener){
            this.listener();
        }
    }

    render() {

        const data = [{
            id: 1,
            customer_name: 'Lisa',
            rating: [
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                ' When night gets dark let me be your fire'
                ]
         },
         {
            id: 2,
            customer_name: 'Jennie',
            rating:  [
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                " I said I wanted you to stay but you're always leaving"
                ]
         },
         {
            id: 3,
            customer_name: 'Chaeyoung',
            rating:  [
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                " So dance as if it's your laaaaast"
                ]
         },
         {
            id: 4,
            customer_name: 'Jisoo',
            rating: [
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                <i class="fas fa-star" style={{color: '#FF8800'}}></i>,
                ' Im Jisoo Im okay!'
                ]
         }];
        const columns = [
            {
                Header: 'Customer Name',
                accessor: (data) => data.reviewer.name,
                id: 'revieweeName',
                filterable: true,
                width: 200
                
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
                Cell: ({original}) => (
                    <>
                        {new Array(original.rating || 0).fill(null).map(() => <i class="fas fa-star" style={{color: '#FF8800'}}></i>)}
                        {original.review}
                    </>
                ),
            }
        ];

        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"Reviews"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Users</span>
                                </h4>

                                <ReactTable style={{marginTop: "2em"}}
                                    data = {this.state.reviews}
                                    columns = {columns}
                                    defaultPageSize = {10}
                                    pageSizeOptions = {[10,30,50]}
                                    minRows = {1}
                                />

                            </div>

                        </div>
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
