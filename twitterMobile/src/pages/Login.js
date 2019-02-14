import React, { Component } from 'react';

import {
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage // como nao tem o localstorage do Browser... nesse caso temos o async, a grande diferenca e que necessita que ele salve no sqlite 
}
    from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class Login extends Component {
    state = {
        username: '',
    }

    handleInputChange = (username) => {
        this.setState({ username });
    }

    //funcao para realizar o login quando acionar o botao 
    handleLogin = async () => {
        const { username } = this.state;

        if (!username.length) return; // se usuario estiver vazio retorna aplicacao

        await AsyncStorage.setItem('@GoTwiiter:username', username); // salvamos o username

        this.props.navigation.navigate('App'); // usamos essa props para a navegacao
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwiiter:username');
        if (username) { // se o username existir ja navega para a App
            this.props.navigation.navigate('App');
        }

    }

    render() {
        return (
            <KeyboardAvoidingView behaivor='padding' style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Icon name='twitter' size={64} color='#4BB0EE' />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome de usuário'
                        value={this.state.username}
                        onSubmitEditing={this.handleLogin}
                        onChangeText={this.handleInputChange}
                        returnKeyType='send'
                    />
                    <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}> Entrar </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});
