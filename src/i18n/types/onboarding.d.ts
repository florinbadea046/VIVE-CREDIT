export interface OnboardingTranslations {
  personalData: {
    title: string;
    fields: {
      fullName: {
        label: string;
        placeholder: string;
      };
      cnp: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      fullName: string;
      cnp: string;
      email: string;
    };
    continueButton: string;
  };
  addressData: {
    title: string;
    fields: {
      address: {
        label: string;
        placeholder: string;
      };
      city: {
        label: string;
        placeholder: string;
      };
      county: {
        label: string;
        placeholder: string;
      };
      phone: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      address: string;
      city: string;
      county: string;
      phone: string;
    };
    backButton: string;
    continueButton: string;
  };
  workData: {
    title: string;
    fields: {
      company: {
        label: string;
        placeholder: string;
      };
      position: {
        label: string;
        placeholder: string;
      };
      income: {
        label: string;
        placeholder: string;
      };
      experience: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      required: string;
      income: string;
      experience: string;
    };
    backButton: string;
    continueButton: string;
  };
  documentUpload: {
    title: string;
    fields: {
      idCard: {
        label: string;
        placeholder: string;
      };
      incomeProof: {
        label: string;
        placeholder: string;
      };
      otherDocs: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      invalidFormat: string;
      fileTooLarge: string;
      uploadError: string;
      unknownError: string;
      uploadFailedFor: string;
      requiredDocuments: string;
      waitForUploads: string;
    };
    backButton: string;
    continueButton: string;
    uploading: string;
  };
  onboardingPage: {
    steps: {
      personalData: string;
      address: string;
      workplace: string;
      documents: string;
      summary: string;
    };
    errors: {
      requiredFields: string;
      phonePrefix: string;
    };
    summary: {
      title: string;
      fields: {
        name: string;
        cnp: string;
        email: string;
        address: string;
        phone: string;
        company: string;
        position: string;
        income: string;
        experience: string;
        years: string;
        documentsUploaded: string;
      };
      documentsList: {
        idCard: string;
        incomeProof: string;
        otherDocs: string;
      };
      buttons: {
        editDocuments: string;
        finalize: string;
      };
    };
  };
  successPage: {
    title: string;
    thankYou: string;
    defaultName: string;
    dataRegistered: string;
    applicationNumber: string;
    consultantContact: string;
    accessAccount: string;
  };
}
