
  // Example predefined coupons
  const coupons = {
    "AXIOS10": 10, // 10% off
    "FREESHIP": 5, // $5 off
    "SUMMER25": 25 // 25% off
  };

  let appliedCoupon = {
    type: null,   // "percentage" or "amount"
    value: 0
  };

function applyCoupon() {
  const input = document.getElementById("couponCode");
  const message = document.getElementById("couponMessage");
  const code = input.value.trim().toUpperCase();

  if (!code) {
    message.textContent = "Please enter a coupon code.";
    message.className = "mt-3 text-sm font-medium text-red-600";
    return;
  }

  if (coupons[code]) {
    const discount = coupons[code];

    // Decide the type: % discount if ≤ 100, else flat amount
    appliedCoupon.type = discount <= 100 ? "percentage" : "amount";
    appliedCoupon.value = discount;

    message.textContent = appliedCoupon.type === "percentage"
      ? `Coupon applied! You saved ${discount}%`
      : `Coupon applied! You saved $${discount}`;
    message.className = "mt-3 text-sm font-medium text-green-600";

    calculateTotal(); // Recalculate totals with discount
  } else {
    appliedCoupon = { type: null, value: 0 }; // reset if invalid
    message.textContent = "Invalid coupon code.";
    message.className = "mt-3 text-sm font-medium text-red-600";
    calculateTotal(); // Recalculate totals
  }
}
