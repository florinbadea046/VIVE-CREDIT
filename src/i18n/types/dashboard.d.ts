// i18n/types/dashboard.d.ts

export interface DashboardTranslations {
  layout: {
    closeMenu: string;
    navigation: {
      home: string;
      dashboard: string;
      myLoan: string;
      paymentHistory: string;
      documents: string;
      help: string;
    };
  };
  payments: {
    modal: {
      title: string;
      description: string;
      confirmButton: string;
      successNotification: string;
    };
    status: {
      completed: string;
      pending: string;
      failed: string;
    };
    method: {
      card: string;
      transfer: string;
      cash: string;
    };
  };
  verification: {
    title: string;
    viewDetails: string;
    loading: string;
    noVerifications: string;
    kyc: string;
    aml: string;
    status: {
      approved: string;
      rejected: string;
      inProgress: string;
      pending: string;
    };
    lastStepCompleted: string;
    lastStepInProgress: string;
    noStepsStarted: string;
  };
  home: {
    registrationSuccess: {
      title: string;
      message: string;
    };
  };
  documents: {
    title: string;
    description: string;
    names: {
      contract_credit: string;
      repayment_schedule: string;
      id_card_both_sides: string;
      income_certificate: string;
      old_contract_expired: string;
    };
  };
  uploadDocument: {
    title: string;
    backButton: string;
    description: string;
    acceptedFormats: string;
    maxSize: string;
    note: string;
  };
  welcome: {
    title: string;
    greeting: string;
    description: string;
  };
  help: {
    title: string;
    subtitle: string;
    phoneSupport: {
      title: string;
      scheduleLabel: string;
      schedule: string;
      number: string;
    };
    emailSupport: {
      title: string;
      description: string;
      email: string;
    };
    usefulInfo: {
      title: string;
      requiredDocs: {
        title: string;
        idCard: string;
        incomeProof: string;
        otherDocs: string;
      };
      dataSecurity: {
        title: string;
        description: string;
      };
    };
  };
  applications: {
    title: string;
    applicationId: string;
    requestedAmount: string;
    submittedOn: string;
    newApplication: string;
    status: {
      approved: string;
      pending: string;
      rejected: string;
    };
  };
  credits: {
    title: string;
    noActiveCredits: string;
    creditId: string;
    totalAmount: string;
    remainingAmount: string;
    monthlyPayment: string;
    paymentProgress: string;
  };
  quickActions: {
    title: string;
    applyForLoan: string;
    myDocuments: string;
    help: string;
  };
  applicationStatus: {
    title: string;
    applicationNumber: string;
    notificationMessage: string;
    statuses: {
      pending: string;
      inReview: string;
      approved: string;
      rejected: string;
    };
  };
  documentsCard: {
    title: string;
    download: string;
  };
  paymentFilters: {
    status: {
      label: string;
      all: string;
      completed: string;
      pending: string;
      failed: string;
    };
    method: {
      label: string;
      all: string;
      card: string;
      transfer: string;
      cash: string;
    };
    month: {
      label: string;
      all: string;
    };
  };
  paymentHistory: {
    title: string;
    status: {
      completed: string;
      pending: string;
    };
  };
  paymentList: {
    status: {
      completed: string;
      pending: string;
      failed: string;
    };
  };
  loanContract: {
    title: string;
    signedAndActive: string;
    description: string;
    formatAvailable: string;
    compatible: string;
    downloadButton: string;
  };
  loanDetails: {
    title: string;
    loanAmount: string;
    monthlyRate: string;
    interest: string;
    contractDuration: string;
    nextDueDate: string;
    months: string;
  };
  loanProgress: {
    title: string;
    status: {
      slow: string;
      almostDone: string;
      inProgress: string;
    };
    totalProgress: string;
    totalRepaid: string;
    remainingToPay: string;
    paidMonths: string;
    remainingMonths: string;
    months: string;
    totalLoanValue: string;
  };
  loanSummary: {
    title: string;
    status: {
      active: string;
      completed: string;
    };
    grantedAmount: string;
    monthlyRate: string;
    interest: string;
    duration: string;
    months: string;
    lastPayment: string;
    method: string;
  };
  nextPayment: {
    title: string;
    status: {
      overdue: string;
      dueSoon: string;
      onTime: string;
    };
    amountToPay: string;
    dueDate: string;
    overdueDays: string;
    dueToday: string;
    inDays: string;
    payButton: string;
  };
  documentsFilters: {
    title: string;
    reset: string;
    uploadDocument: string;
    category: {
      all: string;
      contract: string;
      schedule: string;
      kyc: string;
      income: string;
      other: string;
    };
    status: {
      all: string;
      available: string;
      processing: string;
      expired: string;
    };
    year: {
      all: string;
    };
  };
  documentsList: {
    title: string;
    categories: {
      contract: string;
      schedule: string;
      kyc: string;
      income: string;
      other: string;
    };
    status: {
      available: string;
      processing: string;
      expired: string;
    };
    download: string;
    unavailable: string;
    noDocuments: string;
  };
  documentUploader: {
    uploadTitle: string;
    uploadSubtitle: string;
    uploadProgress: string;
    uploadedDocuments: string;
    noDocuments: string;
    submitButton: string;
    preview: string;
    remove: string;
    previewTitle: string;
    previewAlt: string;
    close: string;
    errors: {
      invalidType: string;
      tooLarge: string;
    };
    uploadSuccess: string;
    submitSuccess: string;
    notificationText: string;
  };
}
