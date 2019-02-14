import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from  '../services/api';
import Tweet from  '../components/Tweet';
import socket from 'socket.io-client';

export default class pages extends Component {
    static navigationOptions = ({ navigation }) =>({
        title: 'Início',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon
                    name='add-circle-outline'
                    size={24}
                    color='#4BB0EE'
                    style={{ marginRight: 20 }}
                />
            </TouchableOpacity>
        ),
    }); // esse parentese forca que retorne um objeto ao inves de ser o escopo da funcao 

    state = {
        tweets: [],
    }

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');

        this.setState({ tweets : response.data })
    }

    subscribeToEvents = () => {
        const io = socket('http://192.168.1.4:3000');
    
        io.on('tweet', data =>{
            this.setState({ tweets: [data,...this.state.tweets]})
        });
    
        io.on('like', data =>{
          this.setState({ tweets: this.state.tweets.map( tweet => 
            tweet._id === data._id ? data : tweet // analiza se o id do tweet e igual ao id recebido no evento e atualiza, se não retorna o tweet antigo 
          ) })
        });
    
      };


    render() {
        return <View style={styles.container}>
            <FlatList 
                data={this.state.tweets}
                keyExtractor={ tweets => tweets._id}
                renderItem={({item}) => <Tweet tweet={ item }/>}
            />
        </View> ;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
