type CheckoutItem = {
  sku: string;
  title: string;
  quantity: number;
  unitAmountCents: number;
};

type CreateCheckoutSessionInput = {
  customerEmail: string;
  customerName?: string;
  currency: string;
  items: CheckoutItem[];
  successUrl: string;
  cancelUrl: string;
};

type CreateCheckoutSessionResponse = {
  id: string;
  url: string | null;
  orderId: string;
  orderNumber: string;
};

type OrderStatusResponse = {
  id: string;
  orderNumber: string;
  status: string;
  previewUnlockedAt: string | null;
  totalAmountCents: number;
  createdAt: string;
};

type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

type CommentUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

type CommentReply = {
  id: string;
  body: string;
  createdAt: string;
  user: CommentUser;
};

export type OrderComment = {
  id: string;
  pageNumber: number;
  body: string;
  status: "OPEN" | "DESIGNER_REPLIED" | "CUSTOMER_REPLIED" | "RESOLVED" | "REOPENED";
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  replies: CommentReply[];
};

type ApplyDiscountInput = {
  orderId: string;
  discountType: "fixed" | "percent";
  value: number;
  code?: string;
  reason?: string;
};

type RefundInput = {
  orderId: string;
  amountCents?: number;
  reason?: string;
};

type AdminOrderListItem = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmountCents: number;
  createdAt: string;
  customer: { email: string; name: string | null };
};

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8787";

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionResponse> {
  const response = await fetch(`${backendUrl}/api/payments/checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to create checkout session");
  }

  return response.json();
}

export async function getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
  const response = await fetch(`${backendUrl}/api/orders/${orderId}`);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to fetch order status");
  }
  return response.json();
}

export async function getOrderComments(orderId: string): Promise<OrderComment[]> {
  const response = await fetch(`${backendUrl}/api/orders/${orderId}/comments`, {
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to fetch order comments");
  }
  return response.json();
}

export async function createOrderComment(
  orderId: string,
  input: { pageNumber: number; body: string },
) {
  const response = await fetch(`${backendUrl}/api/orders/${orderId}/comments`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to create comment");
  }
  return response.json();
}

export async function replyToComment(commentId: string, body: string) {
  const response = await fetch(`${backendUrl}/api/comments/${commentId}/replies`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });
  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(bodyText || "Failed to reply to comment");
  }
  return response.json();
}

export async function resolveComment(commentId: string) {
  const response = await fetch(`${backendUrl}/api/comments/${commentId}/resolve`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to resolve comment");
  }
  return response.json();
}

export async function reopenComment(commentId: string) {
  const response = await fetch(`${backendUrl}/api/comments/${commentId}/reopen`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to reopen comment");
  }
  return response.json();
}

export async function approveOrder(orderId: string) {
  const response = await fetch(`${backendUrl}/api/orders/${orderId}/approve`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to approve order");
  }
  return response.json();
}

export async function applyOrderDiscount(input: ApplyDiscountInput) {
  const response = await fetch(`${backendUrl}/api/admin/orders/${input.orderId}/discounts`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      discountType: input.discountType,
      value: input.value,
      code: input.code,
      reason: input.reason,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to apply discount");
  }
  return response.json();
}

export async function issueOrderRefund(input: RefundInput) {
  const response = await fetch(`${backendUrl}/api/admin/orders/${input.orderId}/refunds`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amountCents: input.amountCents,
      reason: input.reason,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to issue refund");
  }
  return response.json();
}

export async function getAdminOrders(params?: { q?: string; status?: string; page?: number; pageSize?: number }): Promise<{ orders: AdminOrderListItem[]; pagination?: { page: number; pageSize: number; total: number; totalPages: number } }> {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.status) search.set("status", params.status);
  if (params?.page) search.set("page", String(params.page));
  if (params?.pageSize) search.set("pageSize", String(params.pageSize));
  const response = await fetch(`${backendUrl}/api/admin/orders?${search.toString()}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to fetch admin orders");
  }
  return response.json();
}

export async function getAdminOrderAudit(orderId: string) {
  const response = await fetch(`${backendUrl}/api/admin/orders/${orderId}/audit`, {
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to fetch admin order audit");
  }
  return response.json();
}

export async function getAuthMe(): Promise<{ user: AuthUser | null }> {
  const response = await fetch(`${backendUrl}/api/auth/me`, {
    credentials: "include",
  });
  if (response.status === 401) {
    return { user: null };
  }
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to fetch auth session");
  }
  return response.json();
}

export function startGoogleLogin(returnTo: string) {
  const startUrl = new URL(`${backendUrl}/api/auth/google/start`);
  startUrl.searchParams.set("returnTo", returnTo);
  window.location.assign(startUrl.toString());
}

export async function logout() {
  await fetch(`${backendUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
