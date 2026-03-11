export interface User {
  email: string;
  password: string;
  plan: 'free' | 'pro';
  qrCount: number; 
}

export interface QRItem {
  qrId?: string;
  name: string;
  destinationUrl: string;
  shortUrl?: string;
  todayScans?: number;
  totalScans?: number;
  updateCount?: number;
  createdAt?: string;
}

export interface Analytics {
  totalScans: number;
  todayScans: number;
}

export const PLAN_LIMITS = {
  free: {
    maxQRCodes: 5,
    maxUpdates: 5
  },
  pro: {
    maxQRCodes: 20,
    maxUpdates: 20
  }
};
