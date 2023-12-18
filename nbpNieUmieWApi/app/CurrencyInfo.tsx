import {View, Text, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import { Currency, Data, CurrencyFromNBP, currencyToFlagEmoji} from "./types";


export default function CurrencyInfo() {
  const { currency } : Currency | any = useRoute().params;
  const [data, setData] = useState<Data>({datasets: [{data: []}]});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/a/${currency.code}/last/60/?format=json`
      ).then((response) => response.json());
        
      return {
        datasets: [{data: response.rates.map((item: CurrencyFromNBP) => item.mid)}]
      };
    }
    fetchData().then((data) => setData(data)); 
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>{currencyToFlagEmoji[currency.code]}</Text>
        <Text style={styles.title}>{currency.currency.charAt(0).toUpperCase() + currency.currency.slice(1)}</Text>
        <Text style={styles.subtitle}>{currency.code}</Text>
      </View>
    
      <View style={styles.info}>
        <Text style={styles.subtitle}>Cena {currency.code} w ostatnich 60 dniach</Text>
        <Text style={styles.subtitle}>Ostatnia wycena {currency.mid}</Text>
      </View>
    
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
      paddingTop: 70,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineChart: {
    marginVertical: 60,
  },
  loading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewTitle: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  subtitle: {
    fontSize: 20,
    color:'#fff',
    textAlign: 'center',
  },
  info: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  }
});

