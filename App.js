import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, ActivityIndicator,
  StyleSheet, View, Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import Records from './Records'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import list from './Book1.json'
const Tab = createBottomTabNavigator();

const App = () => {
  const [value, setvalue] = useState(0)
  const [data, setdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const PRE_JAVASCRIPT = `(function () {
    $("#dist_code").val(1019);
    $("#dist_code").trigger("change");
    setTimeout(() => {
      $("#fps_id").val(101900200027);
      $("td .button2").first().click();
    }, 1000);
  })();`;


  const POST_JAVASCRIPT = `(function() {
      window.ReactNativeWebView.postMessage(JSON.stringify($("#Report").dataTable().fnGetData()));
  })();`;



  const webRef = useRef(0);

  const load = () => {
    webRef.current.injectJavaScript(PRE_JAVASCRIPT);
    setTimeout(() => {
      webRef.current.injectJavaScript(POST_JAVASCRIPT);
    }, 3000)
  };


  useEffect(() => {
    var timer = setTimeout(() => {
      var response = data.map(el => el[1])
      let result = [];
      list.forEach(item => { if (response.indexOf(item.id) == -1) result.push(item) })
      setdata(result);
      setvalue(response.length);
      setIsLoading(false)
    }, 8000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <>{isLoading ?
      <View style={{ flex: 1, margin: 10 }}>
        <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
          <WebView source={{ uri: 'http://epos.nic.in/jk/FPS_Trans_Abstract.jsp' }} style={{ height: 10, display: 'none' }}
            onMessage={e => {
              setdata(JSON.parse(e.nativeEvent.data))
            }}
            ref={webRef}
            onLoadEnd={load}
          />
        </View >
        <View style={styles.loaderView}>
          <Text style={{ fontSize: 40 }}>
            <ActivityIndicator size="large" color="#0D8A37" />
          </Text>
          <Text>Fetching Data. Please Wait...</Text>
          <Text>Note:- Restart the App if data is not updated.</Text>
        </View>
      </View> :
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Transactions" component={HomeScreen}
            initialParams={{ 'value': value }}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }} />
          <Tab.Screen name="Records" component={Records}
            initialParams={{ 'data': data }}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="format-list-checkbox" color={color} size={size} />
              )
            }} />
          <Tab.Screen name="Account" component={Account} options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-settings" color={color} size={size} />
            )
          }} />
        </Tab.Navigator>
      </NavigationContainer>}
    </>
  );
}


function Account() {
  return (
    <Text>Coming soon...</Text>
  )
}

export default App;


const styles = StyleSheet.create({
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