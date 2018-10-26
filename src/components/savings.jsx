import React, {Component} from 'react';

class Savings extends Component {

    state = {
        users: '',
        index: '',
        machine:''
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

    calckWh = () => {
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

    render(){
        return(
            <div className="Savings">
                <button onClick={this.modOut} className={"btn btn-secondary btn-sm m-2"}> Add last name! </button>
                <button onClick={this.calckWh} className={"btn btn-secondary btn-sm m-2"}> Machine Information </button>
                <p>This is where DB response goes: </p>
                {this.state.users}
                {this.state.machine}
            </div>
        );
    }
}

export default Savings;