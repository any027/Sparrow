import React, { Component } from 'react';
import '../style/FormComponent.css';

class FormComponent extends Component {
    constructor(props){
      super(props);
      //console.log(this.props)
      this.model = this.props.json
    }
    // "tag": "input",
    // "name": "first_name",
    // "type": "text",
    // "human_label": "First Name"

    JSONToForm() {
      return this.model.map((obj,idx) => {
        return <input  
                tag = {obj.tag} 
                name = {obj.name} 
                type = {obj.type} 
                human_label = {obj.human_label} 
        /> 
      })
    }


    render(){
      return(
        <div className="FormComponent">
          <div className="Forms">
            <form>
              {this.JSONToForm()}
            </form>
          </div>
        </div>
      )
    }
}

export default FormComponent;