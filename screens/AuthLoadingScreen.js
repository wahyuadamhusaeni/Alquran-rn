import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this.state = {
            DataSurat: []
        };
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        DataSurat = await AsyncStorage.getItem('DataSurat');
        if (DataSurat == null) {
            fetch("https://quran.kemenag.go.id/index.php/api/v1/surat/0/200")
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        DataSurat: response.data,
                    }, function () {
                        AsyncStorage.setItem('DataSurat', JSON.stringify(response.data));
                        this.props.navigation.navigate('App');
                    });
                })
           
        } else {
            this.props.navigation.navigate('App');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});