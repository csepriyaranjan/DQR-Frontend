import type { QRItem } from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_BASE_URI;

export const qrApi = {
  async getAll(authFetch: any): Promise<QRItem[]> {
    const response = await authFetch(`${API_BASE_URL}/qr/get-all-qr`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch QR codes");
    }

    return response.json();
  },

  async create(authFetch: any, qrCode: QRItem): Promise<QRItem> {
    const response = await authFetch(`${API_BASE_URL}/qr/create-qr`, {
      method: "POST",
      body: JSON.stringify(qrCode),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Create QR failed");
    }

    return response.json();
  },

  async update(
    authFetch: any,
    qrId: string,
    destinationUrl: string,
  ): Promise<QRItem> {
    const response = await authFetch(`${API_BASE_URL}/qr/update/${qrId}`, {
      method: "PUT",
      body: JSON.stringify({ destinationUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Update failed");
    }

    return response.json();
  },

  async delete(authFetch: any, qrId: string): Promise<boolean> {
    const response = await authFetch(`${API_BASE_URL}/qr/delete/${qrId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Delete failed");
    }

    return true;
  },

  async getOne(authFetch: any, qrId: string): Promise<QRItem> {
    const response = await authFetch(`${API_BASE_URL}/qr/get/${qrId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch QR");
    }

    return response.json();
  },
};
