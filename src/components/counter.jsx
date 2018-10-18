import React, {Component} from 'react';

class Counter extends Component {

    state = {
        count: 0,
        response: '',
        index: ''
    };

    componentDidMount() {
        this.callDatabase()
            .then(res => this.setState({ response: res.response }))
            .catch(err => console.log(err));

        this.callIndex()
            .then(res => this.setState({ index: res.express }))
            .catch(err => console.log(err));
    }

    callDatabase = async() => {
        const response = await fetch('/ping');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    callIndex = async() => {
        const response = await fetch('/index');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleIncrement = () => {
        this.setState({count: this.state.count + 1})
        console.log('Increment Clicked.', this);
    };

    render(){
        return(
            <div className="App">
                <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
                <button onClick={this.handleIncrement} className={"btn btn-secondary btn-sm"}>Increment</button>
                <p>This is where index response goes: {this.state.index}</p>
                <p>This is where DB response goes: </p>
                <ul>{this.state.response.map}</ul>
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

export default Counter;