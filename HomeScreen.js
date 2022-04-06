import React from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';
const d = new Date();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const HomeScreen = ({ route }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>FPS Transactions</Text>
                </View>
                <View style={{ margin: 10 }} >
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${month[d.getMonth() - 1]}, ${d.getFullYear()}`}</Text>
                </View>
                <View style={styles.root}>
                    <View style={styles.main}>
                        <Text style={styles.mainHeader}>Transactions</Text>
                        <Text style={styles.text}>{route.params.value}</Text>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.mainHeader}>Percentage</Text>
                        <Text style={styles.text}>{Math.round(route.params.value / 428 * 100)}%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

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

export default HomeScreen;



