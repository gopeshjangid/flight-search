import React, { Component } from 'react';
import moment from 'moment';
import FlightDetails from './Flight-details';
import FlightData from '../../Data/flights-json'
import './flights.css';
import {connect}  from  "react-redux";
class FlightsResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights:[] ,
      searchData:'',
      returnFlight:''
    };
    this.checkFlightAvailability=this.checkFlightAvailability.bind(this);
  }

 
componentDidUpdate(prevProps ,prevState){

  if(prevProps.searchParams !=this.props.searchParams){
    this.setState({searchData:this.props.searchParams});
  }
}

componentDidMount(){
    this.setState({flights:this.props.data});
}

  checkFlightAvailability(flight) {
    let result=this.state.searchData;
     if((result.originCity===flight.from_code) &&(result.destinationCity===flight.to_code)){ 
       if(result.returnTrip){
        if((moment(result.startDate._d).format("D M YYYY") === moment(flight.arrive_date).format("D M YYYY"))){
          flight.returnTrip = true;
          flight.endDate=result.endDate;
          console.log(flight)
           return flight
        }
      } else{
        if((moment(result.date._d).format("D M YYYY") === moment(flight.depart_date).format("D M YYYY"))){
          
          flight.returnTrip=false;
           return flight
        }
        }
      } 
debugger;
  }

  render() {

      var flightsAvailable;  
      if(this.state.searchData===''){
        flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails FlightData={flight}></FlightDetails>
      });
      }
      else{
       flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails FlightData={this.checkFlightAvailability(flight)}></FlightDetails>
      });
     }
console.log("available" ,flightsAvailable)
       let flightDetails = this.state.searchData;
    if (flightDetails) {
      flightDetails = {
        depart_day: moment(flightDetails.startDate).format("Do MMM YYYY"),
        return_day: moment(flightDetails.endDate).format("Do MMM YYYY"),
        date:      moment(flightDetails.date).format("Do MMM YYYY")
      };    
    }

    return (
        <section className="flights">
       <div className="flight__container">
      
        <h2>Search Result:</h2>
                {this.state.searchData &&
                <h2>
                  <span>{this.state.searchData.originCity}&raquo; </span> 
                  <span> {this.state.searchData.destinationCity} </span> 
                  
                  {
                  this.state.searchData.returnTrip &&
                  <span> &raquo; {this.state.searchData.originCity} </span> 
                  }
              </h2>}
              {this.state.searchData &&
                <h3>
                  <span>Date:{flightDetails.date}</span> <br/>                  
                  {
                  this.state.searchData.returnTrip &&<span>
                  <span>Depart:{flightDetails.depart_day} </span> 
                   <span>Return:{flightDetails.return_day} </span> </span>
                  }
              </h3>}
          {flightsAvailable}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state)=>({
   data : state.data,
   searchParams : state.searchParams
});

export default connect(mapStateToProps,null)(FlightsResult);
