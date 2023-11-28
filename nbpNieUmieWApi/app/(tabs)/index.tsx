import { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Gold = {
  data: string;
  cena: number;
};

type Data = {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export default function TabOneScreen() {
  const [data, setData] = useState<Data>({ labels: [], datasets: [] })
  const [lastDays, setLastDays] = useState<number>(20)

  useEffect(() => {
    const fetchData = async (lastDays: number) => {
      const response: Gold[] = await fetch(
        `http://api.nbp.pl/api/cenyzlota/last/${lastDays && lastDays > 255 ? 255 : lastDays}/?format=json`
      ).then((response) => response.json())
      
      return {
        labels: [],
        datasets: [{data: response.map((item) => item.cena)}] 
      }
    }

    fetchData(lastDays).then((data) => setData(data));
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cena złota</Text>
      <Text style={styles.subtitle}>Cena złota w ostatnich {lastDays} dniach</Text>

      <TextInput style={styles.input} placeholder="Cena złota w ostatnich: " 
      onChange={(e: any) => setLastDays(e.nativeEvent.text)}  />
      
      {data.labels && data.datasets ? (
        <LineChart
        data={data}
        width={350}
        height={300}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          fillShadowGradient: '#FF8C00',
          fillShadowGradientOpacity: 1,
          propsForDots: {r: "1"}}}
        bezier
        />
      ) : (<Text>Loading...</Text>)}
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  }
})