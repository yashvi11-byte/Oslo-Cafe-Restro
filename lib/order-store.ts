export type CustomerOrder = {
  id: string;
  placedAt: string;
  customerName: string;
  phone: string;
  deliveryType: "delivery" | "takeaway" | "dine_in";
  address: string;
  specialInstructions?: string | undefined;
  paymentMethod: "cod" | "upi" | "counter";
  items: {
    name: string;
    size?: string | undefined;
    qty: number;
    price: number;
    addons?: string[] | undefined;
  }[];
  subtotal: number;
  deliveryFee: number;
  gst: number;
  total: number;
  status: "confirmed" | "preparing" | "packed" | "out_for_delivery" | "delivered" | "cancelled";
  estimatedMinutes: number;
  orderSource: "website" | "whatsapp";
};

const ORDERS_STORAGE_KEY = "oslo_customer_orders";

/**
 * Save a customer record or order to localStorage for the admin portal
 */
export function saveCustomerOrder(order: CustomerOrder) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: Record<string, CustomerOrder> = raw ? JSON.parse(raw) : {};
    orders[order.id.toUpperCase()] = order;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error("Failed to save order to localStorage:", err);
  }
}

/**
 * Get all customer orders sorted by latest first
 */
export function getAllOrders(): CustomerOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      // Seed initial realistic orders if empty
      const initialSeed: Record<string, CustomerOrder> = {
        "OSLO-8421": {
          id: "OSLO-8421",
          placedAt: "Today, 18 mins ago",
          customerName: "Amanpreet Singh",
          phone: "+91 98765 43210",
          deliveryType: "delivery",
          address: "House 24, Street 4, Near D.M. College, New Town, Moga",
          paymentMethod: "cod",
          items: [
            { name: "Margarita Stone Pizza", size: "Medium (M)", qty: 1, price: 270 },
            { name: "Lotus Biscoff Shake", size: "Medium (350ml)", qty: 1, price: 260 },
            { name: "Crispy Paneer Burger", qty: 2, price: 130 },
            { name: "Peri Peri Fries", qty: 1, price: 160 },
          ],
          subtotal: 950,
          deliveryFee: 0,
          gst: 47,
          total: 997,
          status: "out_for_delivery",
          estimatedMinutes: 12,
          orderSource: "website",
        },
        "OSLO-6192": {
          id: "OSLO-6192",
          placedAt: "Today, 45 mins ago",
          customerName: "Simran Kaur",
          phone: "+91 98123 45678",
          deliveryType: "delivery",
          address: "Model Town, Near Main Market, Moga",
          paymentMethod: "upi",
          items: [
            { name: "Signature Chicken Burger", qty: 2, price: 180 },
            { name: "Rosa Elganza Pasta (Non-Veg)", qty: 1, price: 300 },
            { name: "Vietnamese Iced Coffee", qty: 2, price: 250 },
          ],
          subtotal: 1160,
          deliveryFee: 0,
          gst: 58,
          total: 1218,
          status: "preparing",
          estimatedMinutes: 22,
          orderSource: "website",
        },
        "OSLO-3920": {
          id: "OSLO-3920",
          placedAt: "Today, 1 hour ago",
          customerName: "Rahul Sharma",
          phone: "+91 97234 56789",
          deliveryType: "takeaway",
          address: "Takeaway Counter Pickup — Shop No. 155, New Town, Moga",
          paymentMethod: "counter",
          items: [
            { name: "Lotus Biscoff Cheesecake", qty: 2, price: 195 },
            { name: "Hot Cappuccino", size: "Regular (R)", qty: 2, price: 190 },
            { name: "Nutella Belgian Waffle", qty: 1, price: 280 },
          ],
          subtotal: 1050,
          deliveryFee: 0,
          gst: 52,
          total: 1102,
          status: "delivered",
          estimatedMinutes: 0,
          orderSource: "whatsapp",
        },
      };
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialSeed));
      return Object.values(initialSeed);
    }
    const orders: Record<string, CustomerOrder> = JSON.parse(raw);
    return Object.values(orders).reverse();
  } catch {
    return [];
  }
}

/**
 * Update an order's status
 */
export function updateOrderStatus(orderId: string, status: CustomerOrder["status"]): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return false;
    const orders: Record<string, CustomerOrder> = JSON.parse(raw);
    const clean = orderId.trim().toUpperCase();
    if (orders[clean]) {
      orders[clean].status = status;
      if (status === "delivered") {
        orders[clean].estimatedMinutes = 0;
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      return true;
    }
  } catch (err) {
    console.error("Failed to update order status:", err);
  }
  return false;
}

/**
 * Delete an order
 */
export function deleteCustomerOrder(orderId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return false;
    const orders: Record<string, CustomerOrder> = JSON.parse(raw);
    const clean = orderId.trim().toUpperCase();
    if (orders[clean]) {
      delete orders[clean];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      return true;
    }
  } catch (err) {
    console.error("Failed to delete order:", err);
  }
  return false;
}


