import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import {
  CameraView as ExpoCameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import VideoPlayer from "./src/components/VideoPlayer";
import CameraView from "./src/components/CameraView";

export default function App() {
  const cameraRef = useRef<ExpoCameraView | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>();

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions({ writeOnly: true });

  useEffect(() => {
    (async () => {
      if (!cameraPermission?.granted) {
        await requestCameraPermission();
      }
      if (!microphonePermission?.granted) {
        await requestMicrophonePermission();
      }
      if (!mediaLibraryPermission?.granted) {
        await requestMediaLibraryPermission();
      }
    })();
  }, []);

  if (!cameraPermission || !microphonePermission || !mediaLibraryPermission) {
    return (
      <View style={styles.blackScreen}>
        <Text style={styles.whiteText}>Iniciando estúdio de gravação...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.blackScreen}>
        <Text style={styles.whiteText}>Não tem permissão de câmera ou áudio</Text>
        <Button
          title="Solicitar permissões"
          onPress={async () => {
            await requestCameraPermission();
            await requestMicrophonePermission();
          }}
        />
      </View>
    );
  }

  if (!mediaLibraryPermission.granted) {
    return (
      <View style={styles.blackScreen}>
        <Text style={styles.whiteText}>Não tem acesso à biblioteca</Text>
        <Button
          title="Permitir biblioteca"
          onPress={() => requestMediaLibraryPermission()}
        />
      </View>
    );
  }

  const recordVideo = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      const recordedVideo = await cameraRef.current.recordAsync({
        maxDuration: 60,
      });
      if (recordedVideo?.uri) {
        setVideo(recordedVideo);
      }
    } catch (error) {
      console.error("Erro ao gravar vídeo:", error);
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  if (video) {
    const saveVideo = async () => {
      await MediaLibrary.saveToLibraryAsync(video.uri);
      Alert.alert("Sucesso", "Vídeo salvo na galeria.");
      setVideo(undefined);
    };

    const shareVideo = async () => {
      await shareAsync(video.uri);
      setVideo(undefined);
    };

    const discardVideo = () => {
      setVideo(undefined);
    };

    return (
      <View style={styles.rootBlack}>
        <VideoPlayer
          video={video}
          onShare={shareVideo}
          onSave={saveVideo}
          onDiscard={discardVideo}
        />
      </View>
    );
  }

  return (
    <View style={styles.rootBlack}>
      <CameraView
        cameraRef={cameraRef}
        isRecording={isRecording}
        onRecord={recordVideo}
        onStopRecording={stopRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootBlack: {
    flex: 1,
    backgroundColor: "#000000",
  },
  blackScreen: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  whiteText: {
    color: "#111057",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});