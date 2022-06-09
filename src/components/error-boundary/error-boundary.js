import { Component } from "react";
import ErrorMessage from "../error-message";


class ErrorBoundary extends Component {
    state = {
        erro: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true});
    }

    render(){
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;