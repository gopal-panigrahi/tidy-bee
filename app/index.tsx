import { StyleSheet, View } from "react-native";
import { Button, List } from "react-native-paper";
import { StorageAccessFramework as SAF } from "expo-file-system";
import useFolders from "@/context/folders.context";

function Index() {
  const { folders, addFolder } = useFolders();

  async function selectFolder() {
    try {
      const result = await SAF.requestDirectoryPermissionsAsync();

      if (result.granted) {
        addFolder(result.directoryUri.split("%2F").at(-1) ?? "");
        const files = await SAF.readDirectoryAsync(result.directoryUri);
        console.log(files);
      }
    } catch (e) {}
  }

  return (
    <View style={styles.container}>
      {folders.length > 0 ? (
        <List.Item title={folders?.at(0)} />
      ) : (
        <Button mode="contained" onPress={selectFolder}>
          Select a Folder
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index;
