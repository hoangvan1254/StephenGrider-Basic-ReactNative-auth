import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    state = { loggedIn: false }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDwS0QAw7VgCXj0CBaHx2lgH49Zkm2Tt2s',
            authDomain: 'authentication-accb6.firebaseapp.com',
            databaseURL: 'https://authentication-accb6.firebaseio.com',
            projectId: 'authentication-accb6',
            storageBucket: 'authentication-accb6.appspot.com',
            messagingSenderId: '890136441096'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
          case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
            );
          case false:
            return <LoginForm />;
          default:
            return (
                <Card>
                    <CardSection>
                        <Spinner size="large" />
                    </CardSection>
                </Card>
            );
        }
    }


    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
