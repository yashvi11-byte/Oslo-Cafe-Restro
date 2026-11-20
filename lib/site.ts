export const SITE = {
  name: "OSLO CAFE & RESTRO",
  address:
    "Shop No. 155, 12, Street Number 9, opposite Lal Chand Dharamshala, near D.M. College, New Town, Moga, Punjab 142001, India",
  phoneDisplay: "+91 93340 00029",
  phoneHref: "tel:+919334000029",
  phoneSecondaryDisplay: "+91 96170 00029",
  phoneSecondaryHref: "tel:+919617000029",
  email: "oslocaferestro@gmail.com",
  hours: "09:00 AM – 11:00 PM (Daily)",
  smsHref: "sms:+919334000029",
  rating: "4.2",
  reviews: "241",
  spend: "₹200–₹400",
  /** Set a real ordering URL here to enable "Order Online" buttons. */
  orderUrl: "" as string,
  instagramUrl:
    "https://www.instagram.com/oslocaferestro?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==",
};

const q = encodeURIComponent(`OSLO CAFE & RESTRO, ${SITE.address}`);
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${q}&output=embed`;
