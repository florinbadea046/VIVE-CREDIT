const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface DocumentUploadResponse {
  success: boolean;
  message: string;
  data?: {
    documents: Array<{
      id: string;
      documentType: string;
      originalName: string;
      fileName: string;
      fileSize: number;
      uploadedAt: string;
    }>;
  };
}

export const documentsService = {
  async uploadDocuments(
    files: File[],
    applicationId: string,
    documentType: 'idCard' | 'incomeProof' | 'other'
  ): Promise<DocumentUploadResponse> {
    console.log('Fișiere încărcate:', files);
    const formData = new FormData();

    files.forEach(file => {
      formData.append('documents', file);
    });

    formData.append('applicationId', applicationId);
    formData.append('documentType', documentType);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Răspuns upload:', result); // <-- vezi aici fileName
    return result;
  },

  async getDocumentsByApplication(applicationId: string): Promise<DocumentUploadResponse> {
    const response = await fetch(`${API_BASE_URL}/documents/application/${applicationId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};