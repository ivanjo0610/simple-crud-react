import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {

    constructor(){
        super();

        this.state ={
            success_flag: 0,
            selectedFile: null
        };
    }

    onFileChange = event => { 
        this.setState({ selectedFile: event.target.files[0] });
    };

    post(refs){
        var self = this;

        const formData = new FormData(); 
     
        formData.append("filename", this.state.selectedFile);
        formData.append('name', refs.name.value);
        formData.append('email', refs.email.value);
        formData.append('phonenumber', refs.phonenumber.value);

        console.log(formData);

        axios.post('http://localhost:3001/insert', formData, {
        }).then(function(response){
            console.log(response.data);

            document.getElementById("create-course-form").reset();

            if (response.data.success){
                self.setState({
                    success_flag: 1
                });
            } else {
                self.setState({
                    success_flag: 2
                });
            }
        }).catch(function(err){
            console.log(err);

            self.setState({
              success_flag: 2
            });
        });
    }

  render() {
    if (this.state.success_flag === 1){
         var success_flag = <div className="form-group">
            <br></br>
            <div class="alert alert-success" role="alert">
                <strong>Well done! </strong>
                <span>You successfully read this important alert message.</span>
                <a href="#" class="alert-link">alert link</a>
            </div>
        </div>
    } else if (this.state.success_flag === 2) {
        var success_flag = <div className="form-group">
            <br></br>
            <div class="alert alert-danger" role="alert">
                <strong>Well done! </strong>
                <span>You successfully read this important alert message.</span>
                <a href="#" class="alert-link">alert link</a>
            </div>
        </div>
    }

    return (
        <div className="col-lg-12">
            {success_flag}
            <form id="create-course-form" action="#" className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="control-demo-1" className="col-sm-3">Name</label>
                    <div className="col-sm-12">
                        <input type="text" id="control-demo-1" className="form-control" placeholder="Name" ref="name" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="control-demo-2" className="col-sm-3">Email</label>
                    <div className="col-sm-12">
                        <input type="email" id="control-demo-2" className="form-control" placeholder="Email" ref="email" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="control-demo-2" className="col-sm-3">Phone Number</label>
                    <div className="col-sm-12">
                        <input type="number" id="control-demo-2" className="form-control" placeholder="Phone Number" ref="phonenumber" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="control-demo-2" className="col-sm-3">Profile Picture</label>
                    <div className="col-sm-12">
                        <input type="file" accept="image/*" onChange={this.onFileChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="button" onClick={() => this.post(this.refs)} value="Submit" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>
      );
  }
}

export default Form;
