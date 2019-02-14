import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from  './pages/Login';
import Timeline from  './pages/Timeline';
import New from './pages/New';

const Routes = createAppContainer( //Funcao que precisa colocar por volta de todas nossas rotas
    createSwitchNavigator({ // nao permite que retorne a pagina anterior 
        Login,
        App: createStackNavigator({ // permite que retorne entre as navegacoes
            Timeline,
            New
        }), 
    })
); 

export default Routes;