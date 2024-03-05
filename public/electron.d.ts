// electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      sendScreenId: (callback: (event: any, screenId: any) => void) => void;
    };
  }
}
