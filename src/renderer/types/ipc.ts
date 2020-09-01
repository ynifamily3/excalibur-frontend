// actions Type Definition
import { BrowserWindow } from "electron";

export interface IPCAction {
  type: "notificate" | "resizeWindow";
}

export interface Notificate extends IPCAction {
  title: string;
  subtitle?: string;
  body: string;
}

export interface ResizeWindow extends IPCAction {
  window: BrowserWindow;
  x: number;
  y: number;
}
