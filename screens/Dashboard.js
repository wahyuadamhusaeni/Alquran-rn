import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class Dashboard extends Component {
    static navigationOptions = {
        title: "Adamatuh - Al-Qur'an",
        headerStyle: {
            backgroundColor: '#00a4e4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor() {
        super();
        this.state = {
            DataSurat: []
        };
    }
    _bootstrapAsync = async () => {
        SuratData = await AsyncStorage.getItem('DataSurat');
        let SuratDataParse = JSON.parse(SuratData);
        this.setState({ DataSurat: SuratDataParse });
    };
    componentDidMount() {
        this._bootstrapAsync();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.DataSurat}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.kotak} onPress={() => this.props.navigation.navigate('Detail', item)}>
                            <View style={styles.nourut}>
                                <View style={styles.bulat}>
                                    <Text style={styles.angka}>{item.id}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10, flex: 1 }}>
                                <Text style={styles.judul}>{item.surat_name} ( {item.surat_text} )</Text>
                                <Text style={styles.deskripsi}>Terjemahan : {item.surat_terjemahan}</Text>
                                <Text style={styles.deskripsi}>Jumlah Ayat : {item.count_ayat}</Text>
                            </View>
                        </TouchableOpacity>
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
        borderRadius: 10,
        shadowColor: "#ccc",
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    deskripsi: {
        fontSize: 14,
        color: '#ccc'
    }
});