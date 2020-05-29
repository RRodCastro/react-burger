import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Wrapper from '../Hoc/Wrapper'

const withOrderHandler = (WrapperComponenet, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {

            this.requestInterceptor = axios.interceptors.request.use( (req) => {
                this.setState({ error: null })
                return req
            })

            this.responeInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState({ error })
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responeInterceptor)

        }

        backdropHanlder = () => {
            this.setState({error: null})
        }
        render() {
            return (

                <Wrapper>
                    <Modal
                        show={this.state.error}
                        backdropHanlder={this.backdropHanlder}
                    >
                        {this.state.error ? this.state.error.message : null}
                </Modal>
                    <WrapperComponenet {...this.props} />
                </Wrapper>
            )

        }
    }
}




export default withOrderHandler