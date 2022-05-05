import './style/global.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConfigProvider} from '@arco-design/web-react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import Login from './pages/login';

const store = createStore(rootReducer);

function Index() {
    return (
        <BrowserRouter>
            <ConfigProvider
                componentConfig={{
                    Card: {
                        bordered: false,
                    },
                    List: {
                        bordered: false,
                    },
                    Table: {
                        border: false,
                    },
                }}
            >
                <Provider store={store}>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={PageLayout}/>
                    </Switch>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index/>, document.getElementById('root'));
