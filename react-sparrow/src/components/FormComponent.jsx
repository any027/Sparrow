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


    JSONToForm() {
      return this.model.map((obj,idx) => {
        let label = React.createElement('label', {} , obj.human_label)
        let input = React.createElement(obj.tag, {name:obj.name, type:obj.type, onChange:this.handleChange} )

        if (obj.conditional){
          let con_name = obj.conditional.name
 
          let con_value = (this.state.data[con_name])
          if (obj.conditional.show_if(con_value) === true){
            return React.createElement('div', {}, label,input)
          }
          return null
        } else {
        
          return React.createElement('div', {}, label,input)
        }
      })
    }

    handleSubmit(e) {
      e.preventDefault();     
      this.setState({submittedData: this.state.data})
    }

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