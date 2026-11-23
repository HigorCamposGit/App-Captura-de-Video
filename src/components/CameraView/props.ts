import React from "react";
import type { CameraView as ExpoCameraView } from "expo-camera";

export interface CameraViewProps {
  cameraRef: React.RefObject<ExpoCameraView | null>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}