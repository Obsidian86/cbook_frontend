import React, {Component} from 'react';
import { todayDate } from '../../helper/date'; 
import { connect } from 'react-redux'; 
import { isRegExp } from 'util';
 
class NewTransactionsFields extends Component {  
    
    componentDidMount(){  
        if( this.props.updatingTransaction !== ""){
            if(this.props.updatingTransaction.cleared === "no") { this.props.changeSelVal("setCleared", false); }
            if( this.props.updatingTransaction.amount.split("")[0] === "-"){ this.props.changeSelVal("setDeposit", false) }
        } 
    }

    render(){  
        let upTran = this.props.updatingTransaction; 
        let clearedFields;
        let depositFields;
        let amountField; 

        if(upTran === ""){ 
            amountField = () =>( <input type='number' id='amount' name='amount' className="field" step=".01" defaultValue="" /> );
            clearedFields = () =>(
                <span>
                    <p className="f_choice setCleared field choice" onClick={(event) => this.props.setChoice(event)}>Cleared</p>
                    <p className="f_choice setCleared setFalse field" onClick={(event) => this.props.setChoice(event)}>Not cleared</p>
                </span>
            );
            depositFields = () =>( 
                <span>
                    <p className="f_choice setDeposit choice" onClick={(event) => this.props.setChoice(event)}>Deposit</p>
                    <p className="f_choice setDeposit setFalse" onClick={(event) => this.props.setChoice(event)}>withdrawl</p>
                </span>
            );
        } else{
            upTran.amount = upTran.amount.toString();
            clearedFields = () =>(
                <span>
                    <p className={`f_choice setCleared field ${ upTran.cleared === "yes"  ? "choice" : ""}`} onClick={(event) => this.props.setChoice(event)}>Cleared</p>
                    <p className={`f_choice setCleared setFalse field ${ upTran.cleared === "no"  ? "choice" : ""}`} onClick={(event) => this.props.setChoice(event)}>Not cleared</p>
                </span>
            );            
            
            let sign = upTran.amount.split("")[0];
            
            let amount = sign === "-" ? upTran.amount.split("-")[1] : upTran.amount;
            depositFields = () =>(
                <span>
                    <p className={`f_choice setDeposit ${ sign !== "-"  ? "choice" : ""}`} onClick={(event) => this.props.setChoice(event)}>Deposit</p>
                    <p className={`f_choice setDeposit setFalse ${ sign === "-"  ? "choice" : ""}`} onClick={(event) => this.props.setChoice(event)}>withdrawl</p>
                </span>
            );
            amountField = () =>(
                <input type='number' id='amount' name='amount' className="field" step=".01" defaultValue= {amount}/>
            ); 
        }
        return(
                <div> 
                    <label htmlFor='payee'>Payee</label>
                    <input type='text' id='payee' name='payee' className="field" defaultValue= { upTran !== ""  ? upTran.payee : ""  }/> 
    
                    { depositFields() }
    
                    <label htmlFor='date'>Amount</label>
                    { amountField() }
    
                    <label htmlFor='date'>Date</label>
                    <input type='text' id='date' name='date' defaultValue={ upTran !== ""  ? upTran.date : todayDate() } />
        
                    { clearedFields() }
                </div>
            );
    }

    };
 
const mapStateToProps = (state) => ({ 
        updatingTransaction: state.updatingTransaction
    }); 

export default connect(mapStateToProps)(NewTransactionsFields);