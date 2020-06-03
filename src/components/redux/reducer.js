import FlightData from '../../Data/flights-json';

const initialState = {
        data : FlightData,
        msg  :"",
        searchParams : {},
        searchResult : []
  };

export  default  (state = initialState , action)=>{


    switch(action.type){
           case "SEARCH":
                const result = {...state};
                result.msg = "";
                result.searchParams = action.payload;
                return result;
           break; 
           
           default:
           console.log("reducer default" ,state)
           return state;
    }


}