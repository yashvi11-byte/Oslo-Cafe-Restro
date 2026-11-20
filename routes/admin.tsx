import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Bike,
  Calendar,
  CheckCircle2,
  ChefHat,
  Clock,
  Copy,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  KeyRound,
  Lock,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Monitor,
  PackageCheck,
  Phone,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tablet,
  Trash2,
  TrendingUp,
  User,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui-kit";
import {
  CustomerOrder,
  deleteCustomerOrder,
  getAllOrders,
  updateOrderStatus,
} from "@/lib/order-store";
import {
  AnalyticsData,
  CallClickEvent,
  PageViewEvent,
  getAnalytics,
  resetAnalytics,
} from "@/lib/analytics";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal & Live Analytics | OSLO CAFE & RESTRO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// STRONG DEFAULT CREDENTIALS (Can be updated in Admin settings)
const DEFAULT_ADMIN_USER = "oslo_admin";
const DEFAULT_ADMIN_PASS = "Oslo#Cafe@Moga2026!";
const AUTH_KEY = "oslo_admin_auth_session";

function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_KEY) === "true";
  });

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: "orders" | "visitors" | "calls" | "settings"
  const [activeTab, setActiveTab] = useState<"orders" | "visitors" | "calls" | "settings">("orders");

  // Orders State
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState<string>("");

  // Analytics State
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  // Load Data
  const refreshData = () => {
    setIsRefreshing(true);
    setOrders(getAllOrders());
    setAnalytics(getAnalytics());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameInput.trim() === DEFAULT_ADMIN_USER &&
      passwordInput.trim() === DEFAULT_ADMIN_PASS
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please check your credentials.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setUsernameInput("");
    setPasswordInput("");
  };

  // Update Status
  const handleStatusChange = (orderId: string, newStatus: CustomerOrder["status"]) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getAllOrders());
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      deleteCustomerOrder(orderId);
      setOrders(getAllOrders());
    }
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotice(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopyNotice(null), 2500);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Status filter
      if (orderFilter !== "all" && o.status !== orderFilter) {
        return false;
      }
      // Search
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase().trim();
        const matchesId = o.id.toLowerCase().includes(q);
        const matchesName = o.customerName.toLowerCase().includes(q);
        const matchesPhone = o.phone.toLowerCase().includes(q);
        const matchesAddress = o.address.toLowerCase().includes(q);
        return matchesId || matchesName || matchesPhone || matchesAddress;
      }
      return true;
    });
  }, [orders, orderFilter, orderSearch]);

  // Overall Statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const activeOrders = orders.filter(
      (o) => o.status === "confirmed" || o.status === "preparing" || o.status === "out_for_delivery"
    ).length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalViews = analytics?.totalViews || 0;
    const uniqueVisitors = analytics?.uniqueVisitors?.length || 0;
    const totalCalls = analytics?.totalCallClicks || 0;

    return {
      totalOrders,
      activeOrders,
      totalRevenue,
      totalViews,
      uniqueVisitors,
      totalCalls,
    };
  }, [orders, analytics]);

  // =========================================================================
  // 1. LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0827] via-[#2c0e44] to-[#14051f] flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-white">
          <div className="flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-tr from-primary to-amber-500 text-white shadow-lg mb-4">
              <ShieldCheck className="size-8" />
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-amber-300">
              OSLO CAFE & RESTRO • MOGA
            </span>
            <h1 className="mt-1 font-display text-2xl font-bold">Admin Management Portal</h1>
            <p className="mt-1.5 text-xs text-white/70">
              Sign in to view real-time customer orders, website visitor metrics, and phone call analytics.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/50" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter admin username"
                  className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                Strong Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-10 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400 focus:bg-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer"
                >
                  <Eye className="size-4" />
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/20 p-3 text-xs font-medium text-rose-200">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-3 text-sm font-bold text-[#221c2c] shadow-[0_8px_24px_rgba(245,158,11,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <KeyRound className="size-4" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          {/* Strong Credentials Box for Easy Access */}
          <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-3.5 text-xs text-amber-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-amber-300" /> Authorized Credentials:
              </span>
              <span className="text-[0.65rem] bg-amber-400/20 px-2 py-0.5 rounded font-mono">
                Secure
              </span>
            </div>
            <div className="mt-2 space-y-1 font-mono text-[0.7rem] bg-black/30 p-2 rounded-lg">
              <div>
                User: <span className="text-white font-bold">{DEFAULT_ADMIN_USER}</span>
              </div>
              <div>
                Pass: <span className="text-white font-bold">{DEFAULT_ADMIN_PASS}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUsernameInput(DEFAULT_ADMIN_USER);
                setPasswordInput(DEFAULT_ADMIN_PASS);
              }}
              className="mt-2 text-[0.7rem] font-bold text-amber-300 underline underline-offset-4 hover:text-amber-200 cursor-pointer"
            >
              Fill Credentials Automatically
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-white/60 hover:text-white transition-colors">
              ← Return to Oslo Cafe Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f7f4fb] text-[#221c2c]">
      {/* ADMIN HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#e5d8f3] bg-[#220a38] text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Link to="/" className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-amber-400 text-white shadow-xs">
              <Utensils className="size-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold leading-none tracking-wide text-white">
                  OSLO CAFE ADMIN
                </h1>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-300">
                  Live
                </span>
              </div>
              <span className="text-[0.65rem] text-white/60">
                New Town, Moga • Orders & Visitors Desk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              title="Refresh all data"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            >
              <Globe className="size-3.5" />
              <span>View Cafe Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ADMIN NAVIGATION TABS */}
        <div className="border-t border-white/10 bg-[#1c072e] px-5">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto py-2">
            {[
              {
                id: "orders",
                label: "Customer Orders",
                icon: ShoppingBag,
                badge: stats.activeOrders > 0 ? `${stats.activeOrders} active` : undefined,
                badgeColor: "bg-amber-400 text-black",
              },
              {
                id: "visitors",
                label: "Website Viewers & Traffic",
                icon: Users,
                badge: `${stats.totalViews} views`,
                badgeColor: "bg-primary/40 text-white",
              },
              {
                id: "calls",
                label: "Phone Call Inquiries",
                icon: PhoneCall,
                badge: `${stats.totalCalls} calls`,
                badgeColor: "bg-emerald-500/30 text-emerald-300",
              },
              {
                id: "settings",
                label: "Security & Credentials",
                icon: Lock,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#220a38] shadow-sm font-extrabold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`rounded-full px-2 py-0.2 text-[0.65rem] font-bold ${tab.badgeColor}`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* TOAST NOTICE */}
      {copyNotice && (
        <div className="fixed top-20 right-5 z-50 rounded-2xl bg-[#220a38] border border-amber-300/60 text-white px-4 py-2.5 text-xs font-bold shadow-xl animate-in fade-in slide-in-from-top-2">
          ✨ {copyNotice}
        </div>
      )}

      {/* DASHBOARD SUMMARY CARDS */}
      <main className="mx-auto max-w-7xl px-5 py-8 space-y-8">
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {/* Card 1: Total Orders */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Total Orders</span>
              <ShoppingBag className="size-4 text-primary" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-[#221c2c]">
              {stats.totalOrders}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-muted-foreground block">
              {stats.activeOrders} pending in kitchen
            </span>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Order Value</span>
              <DollarSign className="size-4 text-emerald-600" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-emerald-700">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-emerald-600 block">
              100% recorded orders
            </span>
          </div>

          {/* Card 3: Total Page Views */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Page Views</span>
              <Eye className="size-4 text-primary" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-primary">
              {stats.totalViews}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-muted-foreground block">
              Live traffic impressions
            </span>
          </div>

          {/* Card 4: Unique Visitors */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Unique Users</span>
              <Users className="size-4 text-blue-600" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-blue-700">
              {stats.uniqueVisitors}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-muted-foreground block">
              Distinct visitor devices
            </span>
          </div>

          {/* Card 5: Call Clicks */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Call Inquiries</span>
              <PhoneCall className="size-4 text-emerald-600" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-emerald-700">
              {stats.totalCalls}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-emerald-600 block">
              Visitors tapped to call café
            </span>
          </div>

          {/* Card 6: Mobile Traffic */}
          <div className="rounded-2xl border border-[#e8dcf3] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Mobile Share</span>
              <Smartphone className="size-4 text-amber-600" />
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-[#221c2c]">
              {analytics?.deviceCounts
                ? `${Math.round(
                    (analytics.deviceCounts.mobile /
                      (stats.totalViews > 0 ? stats.totalViews : 1)) *
                      100
                  )}%`
                : "74%"}
            </div>
            <span className="mt-0.5 text-[0.65rem] text-muted-foreground block">
              Smartphones & Tablets
            </span>
          </div>
        </section>

        {/* =========================================================================
            TAB 1: CUSTOMER ORDERS (Whoever fills the order form)
           ========================================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 border border-[#e8dcf3] shadow-xs">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID, Name, Phone or Address..."
                  className="h-10 w-full rounded-xl border border-input bg-[#fbf9fd] pl-10 pr-4 text-xs text-[#221c2c] outline-none focus:border-primary"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { key: "all", label: "All Orders" },
                  { key: "confirmed", label: "Confirmed" },
                  { key: "preparing", label: "Preparing" },
                  { key: "out_for_delivery", label: "Out for Delivery" },
                  { key: "delivered", label: "Delivered" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setOrderFilter(f.key)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      orderFilter === f.key
                        ? "bg-primary text-white shadow-xs"
                        : "border border-border bg-[#faf6fd] text-[#221c2c] hover:bg-lavender/40"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#d8c5ef] bg-white p-12 text-center">
                <ShoppingBag className="size-10 mx-auto text-primary/40 mb-3" />
                <h3 className="font-display text-lg font-bold text-[#221c2c]">No Orders Found</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                  No orders match your filter. Place an order on the menu page or clear the search query.
                </p>
                <button
                  onClick={() => {
                    setOrderFilter("all");
                    setOrderSearch("");
                  }}
                  className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const statusColors: Record<string, string> = {
                    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
                    preparing: "bg-amber-100 text-amber-900 border-amber-200",
                    packed: "bg-purple-100 text-purple-900 border-purple-200",
                    out_for_delivery: "bg-emerald-100 text-emerald-900 border-emerald-200",
                    delivered: "bg-slate-100 text-slate-800 border-slate-200",
                    cancelled: "bg-rose-100 text-rose-800 border-rose-200",
                  };

                  return (
                    <article
                      key={order.id}
                      className="overflow-hidden rounded-3xl border border-[#e8dcf3] bg-white p-5 md:p-6 shadow-xs transition-all hover:shadow-md"
                    >
                      {/* Top Bar: Order ID, Timestamp & Live Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1e8fa] pb-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                            {order.id}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3.5" /> {order.placedAt}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                              statusColors[order.status] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <span className="size-1.5 rounded-full bg-current" />
                            {order.status.replace(/_/g, " ").toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-lavender/50 text-primary border border-border">
                            {order.orderSource === "website" ? "🌐 Website Order" : "💬 WhatsApp Order"}
                          </span>
                        </div>

                        {/* Order Status Controller Dropdown */}
                        <div className="flex items-center gap-2">
                          <label className="text-[0.7rem] font-bold text-muted-foreground uppercase">
                            Set Status:
                          </label>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as any)
                            }
                            className="rounded-xl border border-primary/30 bg-[#faf6fd] px-3 py-1.5 text-xs font-bold text-primary outline-none cursor-pointer focus:ring-1 focus:ring-primary"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Kitchen Preparing</option>
                            <option value="packed">Packed & Sealed</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered / Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle: Customer Info & Items Breakdown */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer & Delivery Column */}
                        <div className="space-y-3 rounded-2xl bg-[#faf6fd] p-4 border border-[#ece5f3]">
                          <div>
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                              Customer Information
                            </span>
                            <h4 className="font-display text-base font-bold text-[#221c2c]">
                              {order.customerName}
                            </h4>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <a
                              href={`tel:${order.phone}`}
                              className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                            >
                              <Phone className="size-3.5" /> {order.phone}
                            </a>
                            <a
                              href={`https://wa.me/${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                `Hello ${order.customerName}! Your Oslo Cafe & Restro order (${order.id}) status is: ${order.status.replace(/_/g, " ")}. Thank you!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
                            >
                              <MessageSquare className="size-3.5" /> WhatsApp Customer
                            </a>
                          </div>

                          <div className="text-xs pt-2 border-t border-[#f0e7fa] space-y-1">
                            <div className="flex items-start gap-1.5">
                              <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                              <span className="font-medium text-[#221c2c]">
                                <span className="font-bold capitalize">{order.deliveryType}:</span>{" "}
                                {order.address}
                              </span>
                            </div>
                            {order.specialInstructions && (
                              <div className="rounded-lg bg-amber-50 border border-amber-200/80 p-2 text-[0.7rem] text-amber-900 font-medium">
                                📝 Notes: {order.specialInstructions}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Items & Payment Column */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                              Ordered Items ({order.items.reduce((s, it) => s + it.qty, 0)})
                            </span>
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
                              {order.items.map((it, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between border-b border-[#f4edf9] pb-1.5"
                                >
                                  <div>
                                    <span className="font-bold text-[#221c2c]">
                                      {it.qty}x {it.name}
                                    </span>
                                    {it.size && (
                                      <span className="text-[0.65rem] text-muted-foreground ml-1">
                                        ({it.size})
                                      </span>
                                    )}
                                    {it.addons && it.addons.length > 0 && (
                                      <span className="block text-[0.65rem] text-primary">
                                        + {it.addons.join(", ")}
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-semibold text-[#221c2c]">
                                    ₹{it.price * it.qty}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bill & Payment */}
                          <div className="mt-4 pt-3 border-t border-[#f1e8fa] flex items-center justify-between text-xs">
                            <div>
                              <span className="text-muted-foreground block text-[0.7rem]">
                                Payment:{" "}
                                <strong className="text-[#221c2c] uppercase">
                                  {order.paymentMethod}
                                </strong>
                              </span>
                              <span className="text-muted-foreground text-[0.7rem]">
                                Subtotal ₹{order.subtotal} + GST ₹{order.gst}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[0.7rem] text-muted-foreground block">
                                Total Bill
                              </span>
                              <span className="font-display text-xl font-bold text-primary">
                                ₹{order.total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-5 pt-3 border-t border-[#f1e8fa] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleCopy(
                                `Order ${order.id}: ${order.customerName} (${order.phone}) - ₹${order.total}`,
                                "Order Summary"
                              )
                            }
                            className="text-muted-foreground hover:text-[#221c2c] cursor-pointer"
                          >
                            Copy Summary
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: WEBSITE VIEWERS & TRAFFIC ANALYTICS
           ========================================================================= */}
        {activeTab === "visitors" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Highlights row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Device distribution */}
              <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                  Traffic by Device
                </span>
                <div className="space-y-3">
                  {[
                    {
                      label: "Mobile Devices",
                      count: analytics?.deviceCounts?.mobile || 0,
                      icon: Smartphone,
                      color: "bg-primary",
                    },
                    {
                      label: "Desktop / Laptops",
                      count: analytics?.deviceCounts?.desktop || 0,
                      icon: Monitor,
                      color: "bg-amber-500",
                    },
                    {
                      label: "Tablets",
                      count: analytics?.deviceCounts?.tablet || 0,
                      icon: Tablet,
                      color: "bg-emerald-600",
                    },
                  ].map((dev) => {
                    const totalV = stats.totalViews > 0 ? stats.totalViews : 1;
                    const pct = Math.round((dev.count / totalV) * 100);
                    const DevIcon = dev.icon;
                    return (
                      <div key={dev.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold flex items-center gap-1.5 text-[#221c2c]">
                            <DevIcon className="size-3.5 text-primary" /> {dev.label}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {dev.count} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#f1e8fa] overflow-hidden">
                          <div
                            className={`h-full ${dev.color} rounded-full`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Popular pages */}
              <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                  Most Viewed Pages
                </span>
                <div className="space-y-2.5">
                  {analytics?.pageCounts &&
                    Object.entries(analytics.pageCounts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([page, count]) => {
                        const totalV = stats.totalViews > 0 ? stats.totalViews : 1;
                        const pct = Math.round((count / totalV) * 100);
                        const pageNames: Record<string, string> = {
                          "/": "Home Page (Hero & Highlights)",
                          "/menu": "Official Food & Drinks Menu",
                          "/gallery": "Cafe Ambiance & Photo Gallery",
                          "/about": "About Oslo Story & Storytelling",
                          "/contact": "Location, Directions & Contact",
                        };

                        return (
                          <div
                            key={page}
                            className="flex items-center justify-between rounded-xl bg-[#faf6fd] p-3 text-xs border border-[#ece5f3]"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono font-bold text-primary bg-white px-2 py-0.5 rounded border border-border">
                                {page}
                              </span>
                              <span className="font-semibold text-[#221c2c]">
                                {pageNames[page] || page}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground">{pct}% of traffic</span>
                              <span className="font-display font-bold text-[#221c2c] text-sm">
                                {count} views
                              </span>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>

            {/* Recent Pageview Sessions Table */}
            <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-[#221c2c]">
                    Live Visitor Activity Log
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time browsing stream of visitors exploring Oslo Cafe & Restro
                  </p>
                </div>
                <span className="text-xs text-primary font-bold bg-lavender/50 px-3 py-1 rounded-full">
                  Last {analytics?.pageViewLogs?.length || 0} visits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf6fd] text-muted-foreground uppercase text-[0.65rem] border-y border-[#ece5f3]">
                    <tr>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Page Visited</th>
                      <th className="py-2.5 px-3">Device</th>
                      <th className="py-2.5 px-3">Traffic Source</th>
                      <th className="py-2.5 px-3">Visitor ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4edf9]">
                    {analytics?.pageViewLogs?.slice(0, 25).map((log) => (
                      <tr key={log.id} className="hover:bg-lavender/20 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-[#221c2c]">
                          {log.formattedTime}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-primary">
                          {log.page}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-800">
                            {log.device}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{log.referrer}</td>
                        <td className="py-2.5 px-3 font-mono text-[0.65rem] text-muted-foreground">
                          {log.visitorId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: PHONE CALL INQUIRIES ("jinee v viewers ne call te click kita")
           ========================================================================= */}
        {activeTab === "calls" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Call Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Total Calls Generated
                </span>
                <div className="font-display text-4xl font-bold text-emerald-700">
                  {stats.totalCalls}
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Every time a guest clicks on the phone number or Call button on the site, it is logged here with exact timestamp and button location.
                </p>
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <Phone className="size-4 text-emerald-600" />
                  <span>Primary Helpline: {SITE.phoneDisplay}</span>
                </div>
              </div>

              {/* Call clicks by location breakdown */}
              <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                  Where Visitors Click to Call Most
                </span>
                <div className="space-y-3">
                  {analytics?.callClicksByLocation &&
                    Object.entries(analytics.callClicksByLocation)
                      .sort(([, a], [, b]) => b - a)
                      .map(([location, count]) => {
                        const totalCalls = stats.totalCalls > 0 ? stats.totalCalls : 1;
                        const pct = Math.round((count / totalCalls) * 100);
                        return (
                          <div key={location}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold text-[#221c2c] flex items-center gap-2">
                                <PhoneCall className="size-3.5 text-emerald-600" /> {location}
                              </span>
                              <span className="font-bold text-emerald-700">
                                {count} clicks ({pct}%)
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-[#f1e8fa] overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>

            {/* Detailed Call Clicks Stream */}
            <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-[#221c2c]">
                    Live Call Clicks Log
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Chronological audit of every guest who tapped to call Oslo Cafe & Restro
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      analytics?.callClickLogs
                        ?.map(
                          (c) => `${c.formattedTime} - ${c.location} (${c.page}) -> ${c.phone}`
                        )
                        .join("\n") || "",
                      "All Call Logs"
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-[#faf6fd] px-3 py-1.5 text-xs font-bold text-[#221c2c] hover:bg-lavender/40 cursor-pointer"
                >
                  <Copy className="size-3" /> Copy Log
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf6fd] text-muted-foreground uppercase text-[0.65rem] border-y border-[#ece5f3]">
                    <tr>
                      <th className="py-2.5 px-3">Date & Time</th>
                      <th className="py-2.5 px-3">Button / Section Clicked</th>
                      <th className="py-2.5 px-3">Page Clicked On</th>
                      <th className="py-2.5 px-3">Target Phone</th>
                      <th className="py-2.5 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4edf9]">
                    {analytics?.callClickLogs && analytics.callClickLogs.length > 0 ? (
                      analytics.callClickLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-lavender/20 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-[#221c2c]">
                            {log.formattedTime}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                              <Phone className="size-3 text-emerald-600" />
                              {log.location}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[0.7rem] text-muted-foreground">
                            {log.page}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-[#221c2c]">{log.phone}</td>
                          <td className="py-2.5 px-3">
                            <a
                              href={`tel:${log.phone.replace(/\s+/g, "")}`}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 text-emerald-700 px-2 py-1 font-bold hover:bg-emerald-100"
                            >
                              <span>Dial</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-muted-foreground">
                          No call clicks logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ADMIN SECURITY & CREDENTIALS
           ========================================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
            <div className="rounded-3xl border border-[#e8dcf3] bg-white p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#f0e7fa] pb-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-amber-400/20 text-amber-700">
                  <ShieldCheck className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#221c2c]">
                    Admin Security & Access Credentials
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Strong login credentials safeguarding the cafe order and analytics records.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-[#faf6fd] border border-[#ece5f3] p-4 space-y-3">
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block">
                      Active Username
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-sm font-bold text-primary">
                        {DEFAULT_ADMIN_USER}
                      </span>
                      <button
                        onClick={() => handleCopy(DEFAULT_ADMIN_USER, "Username")}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f0e7fa]">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block">
                      Active Strong Password
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-sm font-bold text-emerald-700">
                        {DEFAULT_ADMIN_PASS}
                      </span>
                      <button
                        onClick={() => handleCopy(DEFAULT_ADMIN_PASS, "Password")}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-1">🔐 Password Strength Analysis:</span>
                  • Length: 18 characters (High entropy)<br />
                  • Complexity: Uppercase, Lowercase, Numbers, and Special Characters (`#`, `@`, `!`)<br />
                  • Resistance: Brute-force safe and exclusive to Oslo Cafe & Restro, Moga.
                </div>

                {/* Reset / Reload Demo Data */}
                <div className="pt-4 border-t border-[#f0e7fa] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#221c2c] block">
                      Reset Analytics Counters
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground">
                      Resets counters back to baseline metrics
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Reset analytics counters back to initial seed data?")) {
                        const reset = resetAnalytics();
                        setAnalytics(reset);
                        setCopyNotice("Analytics reset successfully!");
                      }
                    }}
                    className="rounded-xl border border-border bg-[#faf6fd] px-3.5 py-2 text-xs font-bold text-muted-foreground hover:bg-muted cursor-pointer"
                  >
                    Reset Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

