interface CloudinaryUploadWidgetResults {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
    // Add other properties as needed
  };
}

interface CloudinaryUploadWidget {
  open(): void;
  close(): void;
  destroy(): void;
}

interface CloudinaryUploadWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  sources: string[];
  multiple: boolean;
  maxFiles: number;
  maxFileSize: number;
  styles: {
    palette: {
      window: string;
      windowBorder: string;
      tabIcon: string;
      menuIcons: string;
      textDark: string;
      textLight: string;
      link: string;
      action: string;
      inactiveTabIcon: string;
      error: string;
      inProgress: string;
      complete: string;
      sourceBg: string;
    };
  };
}

interface CloudinaryInstance {
  createUploadWidget(
    options: CloudinaryUploadWidgetOptions,
    callback: (error: Error | null, result: CloudinaryUploadWidgetResults) => void
  ): CloudinaryUploadWidget;
}

declare global {
  interface Window {
    cloudinary?: CloudinaryInstance;
  }
}
