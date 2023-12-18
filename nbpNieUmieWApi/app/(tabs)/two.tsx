import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TextInput, View } from "react-native";
import CurrencyItem from "../CurrencyItem";
import { Currency } from "./../types";


export default function TabTwoScreen() {
  const [data, setData] = useState<Currency[]>([]);
  const [inputCurrencyCode, setInputCurrencyCode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://api.nbp.pl/api/exchangerates/tables/A?format=json"
      ).then((response) => response.json());
      
      
      return response[0]["rates"];
    };

    const fetchLastMid = async () => {
      const response = await fetch(
        "http://api.nbp.pl/api/exchangerates/tables/A/last/2/?format=json"
      ).then((response) => response.json());

      return response[0]["rates"].map((item: Currency) => item.mid);
    };

    fetchData().then((data) => setData(data));
    fetchLastMid().then((data) =>
      setData((prev) =>
        prev.map((item, index) => {
          return {
            ...item,
            lastMid: data[index],
          };
        })
      )
    );
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wpisz kod/nazwę waluty"
        onChange={(e) => setInputCurrencyCode(e.nativeEvent.text)}
        value={inputCurrencyCode}
      />
  
      <ScrollView contentContainerStyle={styles.currencyView}>
        {data
          .filter((currency) => {
            return (
              currency.code.includes(inputCurrencyCode.toUpperCase()) ||
              currency.currency.includes(
                inputCurrencyCode.toLocaleLowerCase()
              ) ||
              inputCurrencyCode.length === 0
            );
          })
          .map((currency, index) => (
            <CurrencyItem currency={currency} key={index} />
          ))}
      </ScrollView>
    </View>
  );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 30, 
    },
    input: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 4,
      marginBottom: 20,
    },
    currencyView: {
      flexGrow: 1,
    },
  });
  