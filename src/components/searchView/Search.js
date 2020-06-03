import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css'; 
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import InputSearch from './inputSearch'
import './search.css';
import moment from 'moment';
import {connect}  from  "react-redux";

class Search extends Component {


  constructor(props) {
    super(props);
    this.inputSearchClickHandlerOrigin = this.inputSearchClickHandlerOrigin.bind(this);
    this.inputSearchClickHandlerDestination = this.inputSearchClickHandlerDestination.bind(this);
    this.onSearchSubmit= this.onSearchSubmit.bind(this);


    this.state = {
      originCity:'',
      destinationCity:'',
      startDate:moment(),
      endDate:moment(),
      date:moment(),
      returnTrip: true,
    }
  }
  onSearchSubmit(){
    console.log("search data" ,this.state);
    this.props.search(this.state);

  }

  inputSearchClickHandlerOrigin (value){
    this.setState({originCity:value})
  }

    inputSearchClickHandlerDestination (value){
      this.setState({destinationCity:value})
    }

  tabSwitch(tab) {
    let returnTrip = (tab === 1) ? false : true;
    this.setState({returnTrip});
  }



  render() {

    return(
      <div className="search__box">

        <ul className="tabs">
          <li className={"tab" + (this.state.returnTrip ? '' : ' active')}
            onClick={()=>this.tabSwitch(1)}>One way</li>

          <li className={"tab" + (this.state.returnTrip ? ' active' : '')}
            onClick={()=>this.tabSwitch(2)}>Return</li>
        </ul>

        <div className="form" onSubmit={()=>this.handleSearch()}>

         <div className="label"> Source City (required):</div>
        <InputSearch id='is1' listName='apts' onClick={this.inputSearchClickHandlerOrigin}/>   
          <br /> <br /> <br />
          <div  className="label">Destination City (required):</div>
        <InputSearch id='is2' listName='apts' onClick={this.inputSearchClickHandlerDestination}/>
            <br />
          
          {this.state.returnTrip ||
            <div>
            <div  className="label">Travel date</div>  
                      <div className="DateRangePicker">
 
             <SingleDatePicker 
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date:moment(date) })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
          /> 
          </div>        
          </div>        
        }
          <br />          

          {this.state.returnTrip &&
          <div>
            <div  className="label">Travel date &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Return date</div>  
          <div className="DateRangePicker">
          <DateRangePicker 
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate:moment(startDate), endDate:moment(endDate) })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          /> 
          </div>          
          </div>
          }

          

          <button className="form__submit" type="submit" onClick={this.onSearchSubmit}>Search</button>
          
        </div>
      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=>({
  search : (form)=> dispatch({type : "SEARCH" ,payload : form})
});



export default connect(null,mapDispatchToProps)(Search);
