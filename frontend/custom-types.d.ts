
declare namespace NodeJS {
    interface Module {
      hot?: {
        dispose(callback: () => void): void;
      };
    }
  }
  