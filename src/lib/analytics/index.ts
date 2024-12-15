import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel only on client side and when token exists
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

// Type-safe event tracking
type SearchEvent = {
  query: string;
  filters: Record<string, unknown>;
};

type RoasterViewEvent = {
  roasterId: string;
  roasterName: string;
};

type UserJourneyEvent = {
  entryPoint: string;
  pageSequence: string[];
};

export const analytics = {
  trackSearch: (data: SearchEvent) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Search Initiated', {
        ...data,
        timestamp: new Date().toISOString()
      });
    }
  },

  trackRoasterView: (data: RoasterViewEvent) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Roaster Viewed', {
        ...data,
        timestamp: new Date().toISOString()
      });
    }
  },

  trackUserJourney: (data: UserJourneyEvent) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('User Journey', {
        ...data,
        timeOnSite: performance.now(),
        timestamp: new Date().toISOString()
      });
    }
  }
};