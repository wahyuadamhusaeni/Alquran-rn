import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class Detail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('surat_name', null) + ' - ' + navigation.getParam('surat_text', null),
            headerStyle: {
                backgroundColor: '#00a4e4',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.getParam('id'),
            DataAyat: []
        };
    }
    _bootstrapAsync = async () => {
        AyatData = await AsyncStorage.getItem('DataAyat' + this.state.id);

        if (AyatData == null) {
            fetch("https://quran.kemenag.go.id/index.php/api/v1/ayatweb/" + this.state.id + "/0/0/1000")
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        DataAyat: response.data,
                    }, function () {
                        AsyncStorage.setItem('DataAyat' + this.state.id, JSON.stringify(response.data));
                    });
                })
        } else {
            let AyatDataParse = JSON.parse(AyatData);
            this.setState({ DataAyat: AyatDataParse });
        }
    };
    componentDidMount() {
        this._bootstrapAsync();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.DataAyat}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.kotak}>
                            <View style={styles.nourut}>
                                <View style={styles.bulat}>
                                    <Text style={styles.angka}>{item.aya_number}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10, flex: 1 }}>
                                <Text style={styles.judul}>{item.aya_text}</Text>
                                <Text style={styles.deskripsi}>{item.translation_aya_text}</Text>
                            </View>
                        </View>
                    }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    kotak: {
        marginBottom: 10,
        width: wp('90%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10
    },
    nourut: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    bulat: {
        backgroundColor: '#00a4e4',
        borderRadius: 500,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    angka: {
        fontSize: 18,
        color: 'white'
    },
    judul: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    deskripsi: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 10,

    }
});