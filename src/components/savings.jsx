import React, {Component} from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryPie,
} from "victory";

class Savings extends Component {

    state = {
        users: '',
        index: '',
        machine:'',
        userKwh:'',
        userSavings:''
    };

    componentDidMount() {

        this.callIndex()
            .then(res => this.setState({ index: res.express }))
            .catch(err => console.log(err));

        this.callPersons()
            .then(res => this.setState({ users: res.users.map(
                member =>
                    <ul>{member.fName}</ul>
                )}))
            .catch(err => console.log(err));

        this.callMachineData()
            .then(res => this.setState({ machine: res.machine.map(
                machine =>
                    <ul>{machine.machineID}</ul>
                )}))
            .catch(err => console.log(err));
    }

    callIndex = async() => {
        const response = await fetch('/index');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    callPersons = async() => {
        const response = await fetch('/users');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    callMachineData = async() => {
        const response = await fetch('/machine');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    calcKWh = () => {
        var kwh, dollarAmnt, savings;

        this.callMachineData()
            .then(res => this.setState({ machine: res.machine.map(
                machine =>
                    <ul>
                        <ul>The kWH for {machine.amps} amps * {machine.volts} volts * {machine.hours} hours is: {'\n'}
                            {kwh = (machine.amps * machine.volts * machine.hours).toFixed(2)} kWh</ul>
                        <ul>Which, at the average price of {machine.price_per_kwh} cents, costs:
                            ${dollarAmnt = ((kwh * machine.price_per_kwh)/60).toFixed(2)}</ul>
                        <ul>where a 20% reduction in power results in: {'\n'}
                            ${savings = (dollarAmnt*.2).toFixed(2)} saved.</ul>
                    </ul>
                )}))
    };

    modOut = () => {
        this.callPersons()
            .then(res => this.setState({ users: res.users.map(
                    member =>
                        <ul>{member.fName.concat(' ' + member.lName)}</ul>
                )}))
            .catch(err => console.log(err));
    };

    handleChange = (event) => {
        this.setState({userKwh: event.target.value})
    }

    handleSubmit = (event) => {
        var dollarAmnt, savings;

        this.callMachineData()
            .then(res => this.setState({ machine: res.machine.map(
                    machine =>
                        <ul>
                            <ul>Average price of {machine.price_per_kwh} cents, costs:
                                ${dollarAmnt = ((this.state.userKwh * machine.price_per_kwh)/60).toFixed(2)}</ul>
                            <ul>where a 20% reduction in power results in: {'\n'}
                                ${savings = (dollarAmnt*.2).toFixed(2)} saved.</ul>
                        </ul>
                )}));
        event.preventDefault();
    };

    render(){
        return(
            <div className="container-fluid bg-dark">
                <div className="navbar navbar-expand-sm flex-column">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button type="button" onClick={this.modOut} className={"btn btn-primary border"}> Add last Name </button>
                        </li>
                        <li className="nav-item">
                            <button type="button" onClick={this.calcKWh} className={"btn btn-primary border"}> Machine Information </button>
                        </li>
                    </ul>
                </div>
                <div className="row text-primary justify-content-center d-flex">
                    <div className="col-md-8 text-center">{this.state.users}</div>
                </div>
                <div className="row text-danger justify-content-center d-flex">
                    <div className="col-md-8 text-center">{this.state.machine}</div>
                </div>
                <div class="d-flex justify-content-center">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="userKwh" class="form-control" placeholder="kwh"
                                   value={this.state.userKwh} id="kwh" onChange={this.handleChange}/>
                        </label>
                        <button class="btn btn-primary" type="submit"> Submit </button>
                    </form>
                </div>
                <div>
                    <VictoryChart>
                        <VictoryBar/>
                    </VictoryChart>
                    <VictoryChart>
                        <VictoryLine/>
                    </VictoryChart>
                    <VictoryChart>
                        <VictoryPie/>
                    </VictoryChart>
                </div>
            </div>
        );
    }
}

export default Savings;
