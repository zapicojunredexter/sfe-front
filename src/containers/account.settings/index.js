import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import StoreService from '../../services/store.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';

class Container extends React.PureComponent<> {
    state = {

    };
    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            username: user ? user.username : '',
            password: user ? user.password : '',
            description: user? user.description : '',
            name: user ? user.name : '',
            operatingHours: user ? user.operatingHours : '',
            address: user ? user.address : '',
            deliveryFee: user ? user.deliveryFee : '',
        };
    }

    handleChange = (key, value) => {
        this.setState({[key]: value});
    }

    updateOperatingHours = (key, newData) => {
        this.setState({
            operatingHours: {
                ...this.state.operatingHours,
                [key]: {
                    ...this.state.operatingHours[key],
                    ...newData,
                },
            }
        });
    }

    updateAccountDetails = () => {
        const store = {
            name: this.state.name,
            description: this.state.description,
            address: this.state.address,
            deliveryFee:Number(this.state.deliveryFee),
            operatingHours: this.state.operatingHours
        };
        const { user } = this.props;
        if(user){
            StoreService.update(user.id, store)()
                .then(() => {
                    alert('successfully updated');
                })
                .catch(err => {
                    alert(err.message);
                })
        }
    }

    updateStoreDetails = () => {

    }
    render() {
        const { user } = this.props;
        console.log('hehe', this.state.operatingHours);
        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar/>
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body" >
                                <h4 className="mb-2 mb-sm-0 pt-1" style={{marginBottom: '2em !important'}}>
                                    <span>Login Information</span>
                                </h4>
                                <div className="md-form">
                                    <i className="fas fa-envelope prefix"></i>
                                    <input type="text" id="form1" class="form-control" onChange={ev => this.handleChange('username', ev.target.value)} value={this.state.username} disabled/>
                                    <label className="active">Email Address</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-lock prefix"></i>
                                    <input type="password" id="inputValidationEx2" onChange={ev => this.handleChange('password', ev.target.value)} value={this.state.password} class="form-control" disabled/>
                                    <label className="active">Password</label>
                                </div>
                                <div className="text-right" style={{marginBottom: "2em"}}>
                                    <button className="btn btn-warning btn-md" ><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                                </div>

                                <hr/>

                                <h4 style={{marginTop: '2em'}}>Store Information</h4>

                                <div className="md-form">
                                    <i className="fas fa-store prefix"></i>
                                    <input type="text" id="form1" className="form-control" value="I dont Know Store" disabled/>
                                    <label className="active">Store Name</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-info prefix"></i>
                                    <textarea onChange={ev => this.handleChange('description', ev.target.value)} value={this.state.description} id="form10" className="md-textarea form-control" rows="2"></textarea>
                                    <label className="active">Description</label>
                                </div>

                                <div className="md-form">
                                    <i className="fas fa-clock prefix"></i>
                                    <p style={{marginLeft: '3em', fontSize: '13px', color: 'gray'}}>Store Hours</p>
                                    <div>
                                        <ul style={{listStyleType: 'none'}}>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Monday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Monday.from}
                                                        onChange={ev => this.updateOperatingHours('Monday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Monday.to}
                                                        onChange={ev => this.updateOperatingHours('Monday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Monday.closed}
                                                        onClick={() => this.updateOperatingHours('Monday',
                                                            {closed: !this.state.operatingHours.Monday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Tuesday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Tuesday.from}
                                                        onChange={ev => this.updateOperatingHours('Tuesday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Tuesday.to}
                                                        onChange={ev => this.updateOperatingHours('Tuesday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Tuesday.closed}
                                                        onClick={() => this.updateOperatingHours('Tuesday',
                                                            {closed: !this.state.operatingHours.Tuesday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Wednesday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Wednesday.from}
                                                        onChange={ev => this.updateOperatingHours('Wednesday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Wednesday.to}
                                                        onChange={ev => this.updateOperatingHours('Wednesday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Wednesday.closed}
                                                        onClick={() => this.updateOperatingHours('Wednesday',
                                                            {closed: !this.state.operatingHours.Wednesday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Thursday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Thursday.from}
                                                        onChange={ev => this.updateOperatingHours('Thursday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Thursday.to}
                                                        onChange={ev => this.updateOperatingHours('Thursday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Thursday.closed}
                                                        onClick={() => this.updateOperatingHours('Thursday',
                                                            {closed: !this.state.operatingHours.Thursday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Friday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Friday.from}
                                                        onChange={ev => this.updateOperatingHours('Friday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Friday.to}
                                                        onChange={ev => this.updateOperatingHours('Friday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Friday.closed}
                                                        onClick={() => this.updateOperatingHours('Friday',
                                                            {closed: !this.state.operatingHours.Friday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Saturday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Saturday.from}
                                                        onChange={ev => this.updateOperatingHours('Saturday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Saturday.to}
                                                        onChange={ev => this.updateOperatingHours('Saturday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Saturday.closed}
                                                        onClick={() => this.updateOperatingHours('Saturday',
                                                            {closed: !this.state.operatingHours.Saturday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li style={{display: 'flex', justifyContent: 'space-between'}}>
                                                Sunday
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Sunday.from}
                                                        onChange={ev => this.updateOperatingHours('Sunday', { from: ev.target.value })}
                                                        // onChange={ev => console.log('bagoo',ev.target.value)}
                                                    />
                                                    {`   -   `}
                                                    <input
                                                        type="time"
                                                        value={this.state.operatingHours.Sunday.to}
                                                        onChange={ev => this.updateOperatingHours('Sunday', { to: ev.target.value })}
                                                    />
                                                    {` Closed `}
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.operatingHours.Sunday.closed}
                                                        onClick={() => this.updateOperatingHours('Sunday',
                                                            {closed: !this.state.operatingHours.Sunday.closed})
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-map-marker-alt prefix"></i>
                                    <input type="text" onChange={ev => this.handleChange('address', ev.target.value)} value={this.state.address} className="form-control"/>
                                    <label className="active">Store Address</label>
                                
                                </div>
                                <div className="md-form" style={{marginTop: 10}}>
                                    <i class="fas fa-money-bill-alt prefix"></i>
                                    <input type="number" onChange={ev => this.handleChange('deliveryFee', ev.target.value)} value={this.state.deliveryFee} className="form-control" />
                                    <label className="active">Delivery Fee</label>
                                
                                </div>
                                <div className="text-right">
                                    <button onClick={this.updateAccountDetails} className="btn btn-warning btn-md" ><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
