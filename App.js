import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const Stack = createStackNavigator();

/* Navbar */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Conversor" component={HomeScreen} 
        options={{
          title: 'Conversor de BitCoin',
          headerStyle: {
            backgroundColor: '#1874CD',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen style={styles.nav}  name="Cotação" component={CotationScreen }
        options={{
          headerStyle: {
            backgroundColor: '#1874CD',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [cotation, setCotation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [conversionResult, setConversionResult] = useState('');

  /* Função converter */

  const handleConvert = () => {
    if (!cotation || !quantity) {
      setConversionResult('Por favor, preencha os campos acima');
      return;
    }
    if (setCurrency === 'BRL') {
      const result = parseFloat(quantity) * parseFloat(cotation);
      setConversionResult(result.toFixed(2));
    } else {
      const result = parseFloat(quantity) * (parseFloat(cotation));
      setConversionResult(result.toFixed(2));
    }
  };

  /* Função limpar campos*/

  const handleClear = () => {
    setCotation('');
    setQuantity('');
    setConversionResult('');
  }

  /* Função moeda selecionada */

  const handleCotation = () => {
    navigation.navigate('Cotação', { currency });
  }

  /* Função trocar moeda selecionada */

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  }

  /* Front-end */

  return (

    /* Container dos inputs */

    <View style={styles.container}>
      
      <View style={styles.buttons}>
      <View style={styles.buttonContainer /* Container selecionar moedas */}>
        <TouchableOpacity
          style={[styles.currencyButton, currency === 'BRL' ? styles.selectedCurrencyButton : null]}
          onPress={() => handleCurrencyChange('BRL')}
        >
          <Text style={[styles.currencyButtonText, currency === 'BRL' ? styles.selectedCurrencyButtonText : null]}>BRL</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer /* Container selecionar moedas */}>
        <TouchableOpacity
          style={[styles.currencyButton, currency === 'USD' ? styles.selectedCurrencyButton : null]}
          onPress={() => handleCurrencyChange('USD')}
        >
          <Text style={[styles.currencyButtonText, currency === 'USD' ? styles.selectedCurrencyButtonText : null]}>USD</Text>
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.containerInput /* Container input */}>
      <TextInput
        style={styles.input}
        placeholder="Cotação"
        keyboardType="numeric"
        value={cotation}
        onChangeText={(value) => setCotation(value)}
        placeholderTextColor="#4F4F4F"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(value) => setQuantity(value)}
        placeholderTextColor="#4F4F4F"
      />
      <Text  style={styles.result}>{conversionResult}</Text>
      </View>
      
      <View style={styles.buttonConverterContainer /*Botão converter*/}>
        <TouchableOpacity style={styles.buttonConverter} Função converter onPress={handleConvert}>
          <Text style={styles.buttonConverter}>Converter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.button/* Container botões */}>
            <TouchableOpacity style={styles.buttonCotacao} onPress={handleCotation}>
              <Text style={styles.buttonTextCotacao}>Ver cotação</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.buttonLimpar} onPress={handleClear}>
              <Text style={styles.buttonTextLimpar}>Limpar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

/* Função chama webview */

function CotationScreen({ route }) {
  const { currency } = route.params;

  return (
    <WebView
      source={{ uri: currency === 'BRL' ? 'https://www.coinbase.com/pt/converter/btc/brl' : 'https://www.coinbase.com/pt/converter/btc/usd' }}
    />
  );
}

/* Estilização */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27408B',
    alignItems: 'center',
    /*justifyContent: 'center'*/
  },

  selectedCurrencyButtonText: {
    alignItems: 'center',
    fontSize: 30,
    margin: 10,
  },

  buttons: {
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },  

  buttonContainer: {
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },  

  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 32,
  },

  currencyContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 100
  },

  containerInput: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },


  currencyButtonText:{
    marginRight: 20,
    marginLeft: 20,
    color: 'black',
    fontSize: 20
    
  }, 

  input: {
    color: '#1874CD',
    backgroundColor:'#fff',
    width: 320,
    height:50,
    fontSize:20,
    textAlign: 'center',
    borderRadius: 15,
    marginTop: 20,
  },

  buttonConverterContainer:{
    marginTop: 25
  },
  
  buttonConverter:{
    color: 'white',
    backgroundColor:'#1874CD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize:20,
    fontWeight: 'bold',
    borderRadius: 6,
  },
  result: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },

  buttonCotacao:{
    backgroundColor: '#1874CD',
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
  },

  buttonLimpar:{
    backgroundColor: '#1874CD',
    paddingHorizontal: 25,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
  },

  buttonTextCotacao:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  barContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 648,
  },

  selectedCurrencyButtonText: {
    color: '#1874CD',
  },

  buttonTextLimpar:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

})