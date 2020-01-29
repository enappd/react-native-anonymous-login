import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { firebaseAuth } from './environment/config';
const widthConst = Dimensions.get('screen').width;
const enappdIcon = require('./assets/enappd.png');
import {auth} from 'firebase';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            buttonText: 'I want to link credentials',
            email: '',
            password: '',
            type: this.props.navigation.getParam('type', 'anonymous')
        };
    }

    signUp = () => {
        if (!this.state.showInput) {
            this.setState({
                showInput: true,
                buttonText: 'Link credentials'
            })
        }
        else {
            let credential = auth.EmailAuthProvider.credential(this.state.email, this.state.password);
            firebaseAuth.currentUser.linkAndRetrieveDataWithCredential(credential)
                .then(() => {
                    this.setState({
                        showInput: false,
                        buttonText: 'I want to link credentials'
                    })
                    this.props.navigation.navigate('Login');
                    ToastAndroid.show('Anonymous account linked with credentials', ToastAndroid.SHORT);
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message }, () => {
                        ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
                    })
                });
        }
    }
    logout = () => {
        firebaseAuth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login');
                ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
            })
            .catch(error => {
                this.setState({ errorMessage: error.message }, () => {
                    ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
                })
            });
    }

    render() {
        return (
            <View style={styles.fullHeight}>
                <Text style={styles.para}>Welcome User,</Text>
                {this.state.type == 'anonymous' &&
                    <Text style={styles.para}>You are logged in but you are still anonymous. If you wish to connect
                this account with your email, signup now ! </Text>
                }
                {this.state.type == 'credential' &&
                    <Text style={styles.para}>You are logged in with credentials. Your anonymous account is now linked with these credentials. 
                    You are no longer anonymous ! </Text>
                }
                {this.state.showInput &&
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            placeholder='Email'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            placeholder='Password'
                        />
                    </View>
                }
                {this.state.type == 'anonymous' &&
                    <View style={styles.btnWrapper}>
                        <Button
                            title={this.state.buttonText}
                            color="#f07430"
                            onPress={() => this.signUp()}
                            style={styles.btn}
                        />
                    </View>
                }
                <TouchableOpacity style={styles.logoutWrapper} onPress={() => this.logout()}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.enappdWrapper}>
                    <Text>By </Text>
                    <Image source={enappdIcon} style={styles.enappdIcon} />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    fullHeight: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        padding: 20
    },
    para: {
        fontSize: 17,
        marginBottom: 10
    },
    btn: {
        alignSelf: 'stretch'
    },
    btnWrapper: {
        width: widthConst - 40,
        marginVertical: 10
    },
    enappdWrapper: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: widthConst
    },
    enappdIcon: {
        width: 100,
        height: 40
    },
    input: {
        height: 50,
        backgroundColor: '#ddd',
        width: widthConst - 40,
        padding: 10,
        marginBottom: 10
    },
    inputWrapper: {
        marginVertical: 10
    },
    logoutWrapper: {
        width: widthConst - 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    logout: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
