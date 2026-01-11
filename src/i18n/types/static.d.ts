export interface StaticTranslations {
  products: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    calculator: {
      title: string;
      amountLabel: string;
      periodLabel: string;
      monthsUnit: string;
      results: {
        monthlyRate: string;
        totalCost: string;
        dae: string;
      };
      disclaimer: string;
    };
    feature: {
      title: string;
      description: string;
    };
  };
  about: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    headlineHighlight: string;
    intro: string;
    cards: {
      transparency: {
        title: string;
        text: string;
      };
      tech: {
        title: string;
        text: string;
      };
      speed: {
        title: string;
        text: string;
      };
    };
    mission: {
      title: string;
      text: string;
    };
    vision: {
      title: string;
      text: string;
    };
    evolutionTitle: string;
    evolution: Array<{
      year: string;
      title: string;
      text: string;
    }>;
  };
  contact: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    subheadline: string;
    cards: {
      phone: {
        title: string;
        availability: string;
        number: string;
      };
      email: {
        title: string;
        responseTime: string;
        address: string;
      };
      location: {
        title: string;
        description: string;
        address: string;
      };
    };
    form: {
      title: string;
      description: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailError: string;
      messageLabel: string;
      messagePlaceholder: string;
      successMessage: string;
      submitButton: string;
    };
    map: {
      title: string;
    };
  };
  terms: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    intro: string;
    sections: {
      definitions: {
        title: string;
        text: string;
      };
      eligibility: {
        title: string;
        text: string;
      };
      process: {
        title: string;
        items: string[];
      };
      responsibilities: {
        title: string;
        items: string[];
      };
      liability: {
        title: string;
        text: string;
      };
      modifications: {
        title: string;
        text: string;
      };
    };
    lastUpdated: string;
  };
  privacy: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    intro: string;
    sections: {
      dataCollection: {
        title: string;
        items: string[];
      };
      purpose: {
        title: string;
        text: string;
      };
      legalBasis: {
        title: string;
        items: string[];
      };
      retention: {
        title: string;
        text: string;
      };
      rights: {
        title: string;
        items: string[];
      };
      security: {
        title: string;
        text: string;
      };
      dpo: {
        title: string;
        email: string;
        phone: string;
      };
    };
    lastUpdated: string;
  };
  cookies: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    intro: string;
    sections: {
      what: {
        title: string;
        text: string;
      };
      types: {
        title: string;
        items: string[];
      };
      manage: {
        title: string;
        text: string;
      };
    };
  };
  anpc: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    intro: string;
    sections: {
      complaints: {
        title: string;
        text: string;
        email: string;
      };
      authority: {
        title: string;
        text: string;
        website: string;
        phoneLabel: string;
        phone: string;
      };
      sol: {
        title: string;
        text: string;
        button: string;
      };
    };
    commitment: string;
  };
}
