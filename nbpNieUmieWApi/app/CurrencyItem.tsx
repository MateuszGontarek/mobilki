import { Link  } from "@react-navigation/native";
import { Text, StyleSheet, View } from "react-native";
import { Props, currencyToFlagEmoji} from "./types";


const displayMid = (mid: number) => {
  return String(mid).slice(0, 6) + "0".repeat(6 - String(mid).slice(0, 6).length)
}

export default function CurrencyItem(props: Props) {
  const { currency } = props;
  const colorStyle = {
    color: currency.lastMid > currency.mid ? "green" : "red",
  };

  return (
    <View style={styles.view}>
      <Link
        to={{
          screen: "CurrencyInfo",
          params: {currency: currency}
        }}
      >
        <Text style={styles.currencyText}>
          {currencyToFlagEmoji[currency.code]}{" "}
          {currency.code + " " + currency.currency.split("(")[0]}
        </Text>
      </Link>
      <View style={styles.rightContainer}>
        <Link
          to={{
          screen: "CurrencyInfo",
          params: {currency: currency}
        }}
        >
          <Text style={styles.mid}>{displayMid(currency.mid)}</Text>
          <Text style={{ ...styles.lastMid, ...colorStyle }}>
            {currency.lastMid < currency.mid ? "⬆" : "⬇"}
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  currencyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastMid: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mid: {
    fontSize: 14,
  },
});
