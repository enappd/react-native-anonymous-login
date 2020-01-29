import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, TextInput, ToastAndroid } from 'react-native';
import { firebaseAuth } from './environment/config';
const widthConst = Dimensions.get('screen').width;
const firebaseIcon = require('./assets/firebase.png');
const enappdIcon = require('./assets/enappd.png');
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'Sign in with credentials',
            showInput: false,
            email: '',
            password: ''
        };
    }

    signIn = () => {
        firebaseAuth.signInAnonymously()
            .then(() => this.props.navigation.navigate('Home',{type:'anonymous'}))
            .catch(error => {
                this.setState({ errorMessage: error.message }, () => {
                    ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
                })
            });
    }

    signInWithCred = () => {
        if (!this.state.showInput) {
            this.setState({
                showInput: true,
                buttonText: 'Sign In'
            })
        }
        else {
            firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        showInput: false,
                        buttonText: 'Sign in with credentials'
                    })
                    this.props.navigation.navigate('Home',{type:'credential'});
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message }, () => {
                        ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
                    })
                });
        }
    }

    render() {

        return (
            <View style={styles.fullHeight}>
                <Image source={firebaseIcon} style={styles.icon} />
                <Text style={styles.rn}>React Native</Text>
                <Text style={styles.signin}>Anonymous Sign In Example</Text>
                <View style={styles.btnWrapper}>
                    <Button
                        title="anonymously sign in "
                        color="#f07430"
                        onPress={() => this.signIn()}
                        style={styles.btn}
                    />
                </View>
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
                            secureTextEntry={true}
                        />
                    </View>
                }
                <View style={styles.btnWrapper}>
                    <Button
                        title={this.state.buttonText}
                        color="#f07430"
                        onPress={() => this.signInWithCred()}
                        style={styles.btn}
                    />
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 100,
        height: 100
    },
    rn: {
        marginVertical: 5,
        fontSize: 18
    },
    btn: {
        alignSelf: 'stretch'
    },
    btnWrapper: {
        width: widthConst - 100,
        marginVertical: 10
    },
    signin: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    enappdWrapper: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    enappdIcon: {
        width: 100,
        height: 40
    },

    input: {
        height: 50,
        backgroundColor: '#ddd',
        width: widthConst - 100,
        padding: 10,
        marginBottom: 10
    },
    inputWrapper: {
        marginVertical: 10
    }
});
