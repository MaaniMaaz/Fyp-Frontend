// Google OAuth types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
          }) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: string;
              size?: string;
              type?: string;
              shape?: string;
              text?: string;
              onSuccess?: (response: any) => void;
              onError?: (error: any) => void;
            }
          ) => void;
        };
      };
    };
  }
}

export {};

