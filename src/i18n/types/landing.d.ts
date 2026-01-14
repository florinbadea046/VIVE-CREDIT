export interface LandingTranslations {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    login: string;
    register: string;
  };
  common: {
    language: string;
  };
  landing: {
    hero: {
      title: string;
      highlight: string;
      subtitle: string;
      cta: string;
      badges: {
        security: string;
        digital: string;
      };
      card: {
        title: string;
        description: string;
        feature: {
          title: string;
          text: string;
        };
      };
    };
    benefits: {
      sectionTitle: string;
      fastApproval: {
        title: string;
        text: string;
      };
      fullSecurity: {
        title: string;
        text: string;
      };
      digital: {
        title: string;
        text: string;
      };
      transparency: {
        title: string;
        text: string;
      };
    };
    brandStory: {
      sectionLabel: string;
      sectionTitle: string;
      description: string;
      features: {
        modernIFN: {
          title: string;
          text: string;
        };
        transparency: {
          title: string;
          text: string;
        };
        fastDigital: {
          title: string;
          text: string;
        };
      };
    };
    products: {
      title: string;
      rate: string;
      limit: string;
      showDetails: string;
      hideDetails: string;
      items: Array<{
        name: string;
        rate: string;
        limit: string;
        description: string;
        features: string[];
      }>;
    };
    testimonials: {
      title: string;
      subtitle: string;
      items: Array<{
        name: string;
        role: string;
        text: string;
      }>;
    };
    security: {
      label: string;
      title: string;
      description: string;
      cards: {
        gdpr: {
          title: string;
          text: string;
        };
        encryption: {
          title: string;
          text: string;
        };
        rights: {
          title: string;
          text: string;
        };
      };
      footer: {
        before: string;
        privacy: string;
        and: string;
        terms: string;
      };
    };
    steps: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
    };
    costs: {
      label: string;
      sectionTitle: string;
      description: string;
      exampleTitle: string;
      loanAmount: string;
      loanDuration: string;
      dae: string;
      monthlyRate: string;
      totalRepayment: string;
      exampleNote: string;
      daeDescription: string;
      totalCostsDescription: string;
      personalizedOffer: string;
    };
    faq: {
      title: string;
      subtitle: string;
      faq1: { q: string; a: string };
      faq2: { q: string; a: string };
      faq3: { q: string; a: string };
      faq4: { q: string; a: string };
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
      note: string;
    };
    footer: {
      description: string;
      nav: {
        title: string;
        home: string;
        products: string;
        about: string;
        contact: string;
      };
      legal: {
        title: string;
        terms: string;
        privacy: string;
        cookies: string;
        anpc: string;
      };
      copyright: string;
    };
  };
  profile: {
    accountMenu: string;
    loggedIn: string;
    activeAccount: string;
    clientPortal: string;
    logout: string;
  };
}
