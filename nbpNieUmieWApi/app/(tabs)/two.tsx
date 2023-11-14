import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";

type Currency = {
  code: string;
  currency: string;
  mid: number;
};

const getData = async () => {
  const response = await fetch(
    "http://api.nbp.pl/api/exchangerates/tables/A?format=json"
  ).then((response) => response.json());
  return response[0]["rates"];
};

export default function TabTwoScreen() {
  const [data, setData] = useState<Currency[]>([]);
  const [inputCurrencyCode, setInputCurrencyCode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => await getData();

    fetchData().then((data) => setData(data));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kursy walut</Text>
      <Text style={styles.subtitle}>Kurs i takie tam</Text>

      <TextInput
        style={styles.input}
        placeholder="Wpisz kod waluty"
        onChange={(e) => setInputCurrencyCode(e.nativeEvent.text.toUpperCase())}
        value={inputCurrencyCode}
      />
      {data
        .filter((currency) => {
          return currency.code.includes(inputCurrencyCode) ||
            inputCurrencyCode.length === 0;
        })
        .map((item, index) => (
          <View key={index} style={styles.currencyContainer}>
            <Text style={styles.currencyText}>{item.code}</Text>
            <Text style={styles.currencyText}>{item.currency}</Text>
            <Text style={styles.currencyText}>{item.mid}</Text>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "white",
  },
  currencyContainer: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
  currencyText: {
    fontSize: 18,
    color: "white",
  },
});
