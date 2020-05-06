import React, { Component } from 'react';
import '../style/FormComponent.css';

class FormComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: {},
        submitted_data: null
      }
      this.model = this.props.json
      this.JSONToForm = this.JSONToForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }


    /* In JSONToForm we create a label and input using React.createElement, and we add a listener to the object for change.
    * When we listen to an object for change, we can handle the conditionals given to us per state change.
    *
    */
    JSONToForm() {
      return this.model.map((obj,idx) => {
        let label = React.createElement('label', {} , obj.human_label)
        let input = React.createElement(obj.tag, {name:obj.name, type:obj.type, onChange:this.handleChange} )

        if (obj.conditional){

          //Here we need to check the conditionals, if a conditional exist, we find the value that corresponds to it using a map.
          //We find the conditional name, and we use that conditional name in our map to find all the values from the created objects.
          let con_name = obj.conditional.name
 
          let con_value = (this.state.data[con_name])
          //If the conditional show if is true, then we must create the div.
          if (obj.conditional.show_if(con_value) === true){
            return React.createElement('div', {}, label,input)
          }
          return null
        } else {
        //Default case, we create a new element with the provided information.
          return React.createElement('div', {}, label,input)
        }
      })
    }

    //This function handles the submit button procedure. We change the submittedData prop in the state so that it shows everything we have submitted.
    handleSubmit(e) {
      e.preventDefault();     
      this.setState({submittedData: this.state.data})
    }

    //This function handles any type of change on our listeners and inputted forms.
    handleChange(e) {
      e.preventDefault();

        let data_form = {}
        if (e.target.type === 'date'){
          let date = new Date(e.target.value)
          data_form[e.target.name] = date
        } else {
          data_form[e.target.name] = e.target.value
        }

        this.setState({data: data_form})
    }

    render(){
      return(
        <div className="FormComponent">
          <div className="Forms">
            <form onSubmit={this.handleSubmit}>
              {this.JSONToForm()}
              <button 
                className="submitButton"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="Data">
            {this.state.submittedData ? JSON.stringify(this.state.submittedData) : ""}
          </div>
        </div>
      )
    }
}

export default FormComponent;