import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
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

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera permission not granted</Text>
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
