import React from "react";

class Description extends React.Component{

render(){
  return(
    <h4>
      {this.props.text}
    </h4>
  );
}
}

export default Description;