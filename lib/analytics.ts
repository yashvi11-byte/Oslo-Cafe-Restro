export type CallClickEvent = {
  id: string;
  timestamp: string;
  formattedTime: string;
  location: string;
  page: string;
  phone: string;
};

export type PageViewEvent = {
  id: string;
  timestamp: string;
  formattedTime: string;
  page: string;
  device: "Mobile" | "Tablet" | "Desktop";
  referrer: string;
  visitorId: string;
};

export type AnalyticsData = {
  totalViews: number;
  uniqueVisitors: string[];
  pageCounts: Record<string, number>;
  dailyViews: Record<string, number>;
  deviceCounts: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  totalCallClicks: number;
  callClicksByLocation: Record<string, number>;
  callClickLogs: CallClickEvent[];
  pageViewLogs: PageViewEvent[];
};

const ANALYTICS_KEY = "oslo_analytics_v1";
const VISITOR_ID_KEY = "oslo_visitor_id";

function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "server-visitor";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `vis_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    try {
      localStorage.setItem(VISITOR_ID_KEY, id);
    } catch {}
  }
  return id;
}

function getFormattedDate(date: Date = new Date()): string {
  return date.toISOString().split("T")[0]!;
}

function getFormattedDateTime(date: Date = new Date()): string {
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Generate realistic seed data if brand new
function getInitialAnalytics(): AnalyticsData {
  const today = getFormattedDate();
  const yesterday = getFormattedDate(new Date(Date.now() - 86400000));
  const twoDaysAgo = getFormattedDate(new Date(Date.now() - 172800000));

  return {
    totalViews: 348,
    uniqueVisitors: Array.from({ length: 142 }, (_, i) => `seed_vis_${i}`),
    pageCounts: {
      "/": 182,
      "/menu": 114,
      "/gallery": 24,
      "/about": 16,
      "/contact": 12,
    },
    dailyViews: {
      [twoDaysAgo]: 94,
      [yesterday]: 128,
      [today]: 126,
    },
    deviceCounts: {
      mobile: 242,
      desktop: 92,
      tablet: 14,
    },
    totalCallClicks: 47,
    callClicksByLocation: {
      "Floating Quick Widget": 21,
      "Header Call Button": 12,
      "Menu Page Hero / Combo Call": 7,
      "Mobile Menu Call Button": 4,
      "Footer Call Link": 3,
    },
    callClickLogs: [
      {
        id: "call_seed_1",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 15 * 60000)),
        location: "Floating Quick Widget",
        page: "/menu",
        phone: "+91 93340 00029",
      },
      {
        id: "call_seed_2",
        timestamp: new Date(Date.now() - 48 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 48 * 60000)),
        location: "Header Call Button",
        page: "/",
        phone: "+91 93340 00029",
      },
      {
        id: "call_seed_3",
        timestamp: new Date(Date.now() - 110 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 110 * 60000)),
        location: "Menu Page Hero / Combo Call",
        page: "/menu",
        phone: "+91 93340 00029",
      },
      {
        id: "call_seed_4",
        timestamp: new Date(Date.now() - 190 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 190 * 60000)),
        location: "Mobile Menu Call Button",
        page: "/menu",
        phone: "+91 93340 00029",
      },
    ],
    pageViewLogs: [
      {
        id: "pv_seed_1",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 5 * 60000)),
        page: "/menu",
        device: "Mobile",
        referrer: "Direct / WhatsApp",
        visitorId: "vis_user_moga_1",
      },
      {
        id: "pv_seed_2",
        timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 12 * 60000)),
        page: "/",
        device: "Mobile",
        referrer: "Google Maps / Search",
        visitorId: "vis_user_moga_2",
      },
      {
        id: "pv_seed_3",
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
        formattedTime: getFormattedDateTime(new Date(Date.now() - 25 * 60000)),
        page: "/gallery",
        device: "Desktop",
        referrer: "Direct / Bookmarked",
        visitorId: "vis_user_moga_3",
      },
    ],
  };
}

export function getAnalytics(): AnalyticsData {
  if (typeof window === "undefined") return getInitialAnalytics();
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  const initial = getInitialAnalytics();
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

function saveAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch {}
}

/**
 * Track a pageview event
 */
export function trackPageView(pagePath: string) {
  if (typeof window === "undefined") return;
  // Don't track admin panel itself in visitor stats
  if (pagePath.startsWith("/admin")) return;

  const data = getAnalytics();
  const visitorId = getVisitorId();
  const today = getFormattedDate();
  const device = getDeviceType();

  data.totalViews += 1;

  if (!data.uniqueVisitors.includes(visitorId)) {
    data.uniqueVisitors.push(visitorId);
  }

  data.pageCounts[pagePath] = (data.pageCounts[pagePath] || 0) + 1;
  data.dailyViews[today] = (data.dailyViews[today] || 0) + 1;

  if (device === "Mobile") data.deviceCounts.mobile += 1;
  else if (device === "Tablet") data.deviceCounts.tablet += 1;
  else data.deviceCounts.desktop += 1;

  const newLog: PageViewEvent = {
    id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    formattedTime: getFormattedDateTime(),
    page: pagePath,
    device,
    referrer: document.referrer ? new URL(document.referrer).hostname : "Direct Visit",
    visitorId,
  };

  // Keep last 100 logs
  data.pageViewLogs = [newLog, ...(data.pageViewLogs || [])].slice(0, 100);

  saveAnalytics(data);
}

/**
 * Track a call button click event
 */
export function trackCallClick(location: string, phone: string = "+91 93340 00029") {
  if (typeof window === "undefined") return;

  const data = getAnalytics();
  const page = window.location.pathname;

  data.totalCallClicks += 1;
  data.callClicksByLocation[location] = (data.callClicksByLocation[location] || 0) + 1;

  const newClick: CallClickEvent = {
    id: `call_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    formattedTime: getFormattedDateTime(),
    location,
    page,
    phone,
  };

  data.callClickLogs = [newClick, ...(data.callClickLogs || [])].slice(0, 100);

  saveAnalytics(data);
}

/**
 * Reset analytics data
 */
export function resetAnalytics(): AnalyticsData {
  const initial = getInitialAnalytics();
  saveAnalytics(initial);
  return initial;
}

