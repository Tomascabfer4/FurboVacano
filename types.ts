export interface LinkItem {
  title: string;
  url: string;
  description?: string;
  icon?: any;
  color?: string;
  size?: string;
}

export interface PasteCode {
  name: string;
  code: string;
}

export interface WebChannel {
  name: string;
  url: string;
  accessCode?: string;
  description?: string;
}

export interface MagmaConfig {
  server: string;
  user: string;
  pass: string;
  downloaderCode: string;
}
