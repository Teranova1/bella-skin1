import { CartItem, Product } from './types';

export const CART_KEY = 'bella-cart-v1';
export const CART_EVENT = 'bella-cart-updated';

/** Read cart from localStorage. Returns [] on SSR or parse error. */
export function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** Persist cart to localStorage and notify all listeners. */
export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

/** Add one unit of a product to the persisted cart. Returns the new cart. */
export function addToCartStorage(product: Product, quantity = 1): CartItem[] {
  const current = loadCart();
  const existing = current.find((i) => i.product.id === product.id);
  const updated = existing
    ? current.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + quantity }
          : i,
      )
    : [...current, { product, quantity }];
  saveCart(updated);
  return updated;
}

/** Total item count across all cart entries. */
export function getCartCount(): number {
  return loadCart().reduce((sum, item) => sum + item.quantity, 0);
}
