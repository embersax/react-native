import React, { Componet, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const App = () => {

  const [hasPermission, setHaspermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // async componentDidMount() {
  //   this.getPermissionAsync();
  // }

  const getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "android") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHaspermission(status == 'granted')
  };

  const handleCameraType = () => {
    let newType = type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back;
    setType(newType);
  };

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
  };
  useEffect(() => {
    getPermissionAsync()
  })
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.cameraType}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              onPress={() => this.pickImage()}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              onPress={() => this.takePicture()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              onPress={() => this.handleCameraType()}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default App;
