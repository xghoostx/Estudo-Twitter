import React from 'react';
import Routes from './routes';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);// usado para ignorar os warning que aparecer com a string passada

const App = () => <Routes />;

export default App;
