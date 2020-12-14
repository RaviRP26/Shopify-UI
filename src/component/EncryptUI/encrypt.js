import React, { Component } from "react";
import '../EncryptUI/encrypt.css';
import client from '../../services/api';
import Sidebar from '../sidebar/sidebar'

export default class Encrypt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: { email: "", password: "" },
            errors: {},
            copySuccess: false,
            encryptData:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.input);
        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input["email"] = "";
            input["password"] = "";
            this.setState({ input: input });
            client.post('/access',this.state.input).then((data) => {console.log(data.data.data,"DATAA");
                console.log(data.data.data.PASSWORD,"password");
                this.setState({encryptData: JSON.stringify(data.data.data.PASSWORD)})
            } )
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email.";
        }

        if (typeof input["email"] !== "undefined") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false;
                errors["password"] = "Please add at least 6 charachter.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    copyCodeToClipboard = () => {
        const el = this.encryptedtext
        el.select()
        document.execCommand("copy")
        this.setState({ copySuccess: true })
    }

    render() {
        return (
            <>
            < Sidebar />
            <div className="main">
            <form onSubmit={this.handleSubmit}>
                
                    <div className="wrapper">
                        <div className="form-group col-sm-8">
                            <label>Email</label>
                            <input type="email" name="email" value={this.state.input.email}
                                onChange={this.handleChange} className="form-control" placeholder="Enter the email" required />
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>

                        <div className="form-group col-sm-8">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.input.password}
                                onChange={this.handleChange} className="form-control" placeholder="Enter password" required />
                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary button">Encrypt</button>
                            </div>
                            <div className="form-group col-sm-6">
                                <input type="text" name="encryptedtext" className="form-control" value={this.state.encryptData} ref={(encryptedtext) => this.encryptedtext = encryptedtext} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-primary" onClick={() => this.copyCodeToClipboard()}>copy</button>
                                {
                                    this.state.copySuccess ?
                                        <div style={{ "color": "green" }}>
                                            Copied!
                                        </div> : null
                                }
                            </div>
                        </div>
                    </div>    
            </form>
            </div>
            </>
        );
    }
}