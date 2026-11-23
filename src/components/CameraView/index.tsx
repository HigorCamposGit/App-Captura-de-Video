import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CameraView as ExpoCameraView, CameraType } from "expo-camera";

import { CameraViewProps } from "./props";
import { styles } from "./styles";

export default function CameraView({
  cameraRef,
  isRecording,
  onRecord,
  onStopRecording,
}: CameraViewProps) {
  const [facing, setFacing] = useState<CameraType>("back");

  const toggleFacing = () => {
    if (isRecording) return;
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <ExpoCameraView
      style={styles.container}
      ref={cameraRef}
      mode="video"
      facing={facing}
    >
      <View style={extraCameraStyles.controlsRow}>
        {!isRecording && (
          <TouchableOpacity
            onPress={toggleFacing}
            style={extraCameraStyles.flipButton}
          >
            <Text style={extraCameraStyles.flipText}>Virar câmera</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={isRecording ? onStopRecording : onRecord}
          style={styles.buttonRecord}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "Parar gravação" : "Iniciar gravação"}
          </Text>
        </TouchableOpacity>
      </View>
    </ExpoCameraView>
  );
}

const extraCameraStyles = StyleSheet.create({
  controlsRow: {
    position: "absolute",
    bottom: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flipButton: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  flipText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});