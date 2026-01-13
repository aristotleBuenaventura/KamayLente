import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      console.log('Camera permission:', permission);
    })();
  }, []);

  if (device == null) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
