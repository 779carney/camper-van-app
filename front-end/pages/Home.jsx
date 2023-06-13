import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, ScrollView, Image } from "react-native";

function Home() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        color="#f194ff"
        title="Advertise a Van"
        onPress={() => navigate("AdvertiseVan")}
      />
      <Button
        color="#f194ff"
        title="View all Vans"
        onPress={() => navigate("Vans")}
      />
    </View>
  );
}

export default Home;
