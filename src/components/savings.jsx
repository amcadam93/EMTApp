import React, {Component} from 'react';

class Savings extends Component {

    state = {
        count: 0,
        users: '',
        index: ''
    };

    componentDidMount() {

        this.callDatabase()
            .then(res => this.setState({ users: res.users.map(
                member =>
                <ul key={member.age}>
                    <li>Member Name: {member.fName} {member.lName}, {member.age} years old.</li>
                    </ul>)
            }))
            .catch(err => console.log(err));

        this.callIndex()
            .then(res => this.setState({ index: res.express }))
            .catch(err => console.log(err));
    }

    callDatabase = async() => {
        const response = await fetch('/users');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    callIndex = async() => {
        const response = await fetch('/index');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleIncrement = () => {
        this.setState({count: this.state.count + 1});
        console.log('Increment Clicked.', this);
    };

    render(){
        return(
            <div className="App">
                <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
                <button onClick={this.handleIncrement} className={"btn btn-secondary btn-sm m-2"}>Increment</button>
                <button onClick={this.callIndex} className={"btn btn-secondary btn-sm m-2"}> Say Hello! </button>
                <button onClick={this.callDatabase} className={"btn btn-secondary btn-sm m-2"}> Say Database! </button>
                <p>This is where index response goes: {this.state.index}</p>
                <p>This is where DB response goes: </p>
                {this.state.users}
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.state.count === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { count } = this.state;
        return this.state.count === 0 ? 'Zero' : count;
    }
}

export default Savings;