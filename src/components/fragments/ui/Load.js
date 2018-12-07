import React, {Component} from 'react';
 
class Load extends Component{

    constructor(props){
        super();
        this.state = ({ 
            message: ""
        });
    }

    timer = setInterval(()=>{
        let newMessage = this.state.message + ".";
        if(newMessage.length > this.props.message.length + 6){
            newMessage = this.props.message
        }
        this.setState({ message: newMessage}); 
    }, 700);

    componentDidMount(){
        this.setState({
            message: this.props.message
        });   
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
    

    render(){
        const messageStyles = {
            "width": "100%",
            "color": "black",
            "padding": "10px 0",
            "backgroundColor": "#c3c3c3", 
            "textAlign": "center"
        }
        return(
            <h3 style={messageStyles}>{this.state.message}</h3>
        );
    }
}

export default Load;