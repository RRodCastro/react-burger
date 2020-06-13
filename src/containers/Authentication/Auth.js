import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../stores/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {  Redirect } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pwd, isSignup) => dispatch(actions.auth(email, pwd, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/"))
    }
}

class Auth extends Component {


    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/" ){
            this.props.onSetAuthRedirectPath()
        }

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const autFrom = { ...this.state.authForm }
        this.props.onAuth(autFrom.email.value, autFrom.password.value, this.state.isSignup)
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    inputChangedHandler = (event, controName) => {
        const updatedAuthForm = {
            ...this.state.authForm
        };
        const updatedFormElement = {
            ...updatedAuthForm[controName]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedAuthForm[controName] = updatedFormElement;

        let formIsValid = true;
        for (let controName in updatedAuthForm) {
            formIsValid = updatedAuthForm[controName].valid && formIsValid;
        }
        this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.regex) {
            isValid = rules.regex.test(value) && isValid
        }

        return isValid;
    }

    render() {
        
        const formElementsArray = Object.keys(this.state.authForm).map((key) => {
            return { id: key, config: this.state.authForm[key] }
        })
        let form = (
            <div >
                <form onSubmit={this.onSubmitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}> {this.state.isSignup ? "Sign Up" : "Sign In"} </Button>
                </form>
                <Button
                    clicked={this.switchAuthHandler}
                    btnType="Danger">Or {this.state.isSignup ? "Sign In" : "Sign Up"}
                </Button>
            </div>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null 
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message} </p>
        }
        let authenticated = null
        if (this.props.token) {
            authenticated = <Redirect to={this.props.authRedirectPath} />

        }
        return (
            <div className={classes.Auth} >
                {authenticated}
                {errorMessage}
                {form}
            </div>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)