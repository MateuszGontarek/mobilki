import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function podziekowaniaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podziękowania</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.text}>
        Specjalnie podziękowania dla całego zespołu informatycznego Narodowego
        Banku Polskiego za stworzenie świetnie działającego i z czytelną
        dokumentacją Interfejsu Programowania Aplikacji, a szczególności
        liderowi Jastrzębi w Radzie Polityki Pięnieżnej Profesorowi Adamowi
        Glapińskiemu za sprawne działania w celu obrony wartości Polskiej
        Złotówki i za bycie przeciwko anty-patriotycznej ideologii przyjęcia
        Euro w naszym Kraju.
      </Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  text: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
