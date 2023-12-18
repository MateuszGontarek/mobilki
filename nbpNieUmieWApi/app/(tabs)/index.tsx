import { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Gold, Data } from "./../types";


export default function TabOneScreen() {
  const [data, setData] = useState<Data>({ datasets: [{ data: [] }] });
  const [lastDays, setLastDays] = useState<string>("60");

  useEffect(() => {
    const fetchData = async (lastDays: number) => {
      const response: Gold[] = await fetch(
        `http://api.nbp.pl/api/cenyzlota/last/${lastDays && lastDays > 255 ? 255 : lastDays}/?format=json`
      ).then((response) => response.json());

      return {
        datasets: [{data: response.map((item) => item.cena)}]
      };
    };

    fetchData(Number(lastDays)).then((data) => setData(data));
  }, [lastDays])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cena złota</Text>
      <Text style={styles.subtitle}>Cena złota w ostatnich {lastDays} dniach</Text>

      <TextInput
        style={styles.input}
        placeholder="Cena złota w ostatnich:"
        onChangeText={(text) => setLastDays(text)}
        value={lastDays}
        keyboardType="numeric"
      />

      {data.datasets && data.datasets[0].data.length > 0 ? 
        <LineChart
          style={styles.lineChart}
          data={{ labels: [], datasets: data.datasets }}
          width={350}
          height={300}
          chartConfig={{
            color: (opacity = 1) => `rgba(2, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            fillShadowGradient: '#FF8C00',
            fillShadowGradientOpacity: 1,
            propsForDots: { 
              r: "1",
              strokeWidth: "1",
              stroke: "#ffa726" 
            },
          }}
          bezier
        /> : <Text style={styles.loading}>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color:'white'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white'
  },
  lineChart: {
    marginTop: 20,
  },
  loading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color:'white'
  },
});
