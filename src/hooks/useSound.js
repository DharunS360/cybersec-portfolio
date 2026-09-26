import { useCallback } from "react";
import {
  playKeypress,
  playCommandBeep,
  playClick,
  playHover,
  playError,
  playSuccess,
  startAmbient,
  stopAmbient,
} from "../utils/sounds";

const STORAGE_KEY = "portfolio_sound_enabled";

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === "true";
}

export function setSoundEnabled(enabled) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  if (enabled) {
    startAmbient();
  } else {
    stopAmbient();
  }
}

export function useSound() {
  const keypress = useCallback(() => {
    if (isSoundEnabled()) playKeypress();
  }, []);

  const commandBeep = useCallback(() => {
    if (isSoundEnabled()) playCommandBeep();
  }, []);

  const click = useCallback(() => {
    if (isSoundEnabled()) playClick();
  }, []);

  const hover = useCallback(() => {
    if (isSoundEnabled()) playHover();
  }, []);

  const error = useCallback(() => {
    if (isSoundEnabled()) playError();
  }, []);

  const success = useCallback(() => {
    if (isSoundEnabled()) playSuccess();
  }, []);

  return { keypress, commandBeep, click, hover, error, success };
}

export default useSound;