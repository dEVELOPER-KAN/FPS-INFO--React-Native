import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet, View, Text, FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Records = ({ route }) => {

    const Item = ({ id, name }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{id}</Text>
            <Text style={styles.title}>{name}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item id={item.id} name={item.name} />
    );

    const d = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [category, setcategory] = useState("NPH")
    const [data, setdata] = useState([])

    useEffect(() => {
        let res = route.params.data;
        res = res.filter((el) => {
            return el.category == category;
        })
        setdata(res)
    }, [category])


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>FPS Pending Records</Text>
                </View>
                <View style={{ margin: 10 }} >
                    <Text style={{ fontSize: 20, textAlign: 'center' }}> {`${month[d.getMonth() - 1]}, ${d.getFullYear()}`}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Picker style={{ width: 150 }}
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) =>
                            setcategory(itemValue)
                        }>
                        <Picker.Item label="NPH" value="NPH" />
                        <Picker.Item label="AAY" value="AAY" />
                        <Picker.Item label="PHH" value="PHH" />
                    </Picker>
                    <Text style={{ fontSize: 18, color: 'red', marginRight: 10 }}>Pending: {data.length}</Text>
                </View>
                <SafeAreaView style={styles.container}>

                    <FlatList data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id + index}
                        initialNumToRender={50}
                        refreshing={true} />
                </SafeAreaView>
            </View >
        </View>


    );
};

const styles = StyleSheet.create({
    container: {

    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    title: {
        fontSize: 16,
        margin: 5
    },
    loaderView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: 0.7
    },
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 200,
        padding: 15
    },
    header: {
        width: "100%",
        backgroundColor: "#0D8A37"

    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        color: "#fff"
    },
    main: {
        backgroundColor: "#fff",
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        elevation: 5,
        borderRadius: 10

    }, text: {
        fontSize: 30,
        fontWeight: "400",
        color: "#BA9C05"
    },
    mainHeader: {
        fontSize: 15,
        color: "#0D8A37"
    }
})

export default Records;



