import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import { VideoPlayerProps } from "./props";

export default function VideoPlayer({
  video,
  onShare,
  onSave,
  onDiscard,
}: VideoPlayerProps) {
  const uri = video?.uri ?? "";

  const player = useVideoPlayer(uri, (p) => {
    p.loop = true;
    if (uri) {
      p.play();
    }
  });

  useEffect(() => {
    if (uri) {
      player.replace(uri);
      player.loop = true;
      player.play();
    }
  }, [player, uri]);

  return (
    <View style={playerStyles.container}>
      <View style={playerStyles.videoBox}>
        <VideoView
          style={playerStyles.video}
          player={player}
          nativeControls
        />
      </View>

      <View style={playerStyles.actionsRow}>
        <TouchableOpacity style={playerStyles.btnShare} onPress={onShare}>
          <Text style={playerStyles.btnText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={playerStyles.btnSave} onPress={onSave}>
          <Text style={playerStyles.btnText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={playerStyles.btnDiscard} onPress={onDiscard}>
          <Text style={playerStyles.btnText}>Discard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const playerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingTop: 24,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  videoBox: {
    flex: 1,
    width: "100%",
    marginBottom: 12,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#222222",
    gap: 8,
  },
  btnShare: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnSave: {
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDiscard: {
    flex: 1,
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});