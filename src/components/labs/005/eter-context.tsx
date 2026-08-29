"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { PRODUCTS, type Product } from "@/components/labs/005/products";

interface CartLine {
  slug: string;
  quantity: number;
}

interface EterState {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addToCart: (slug: string, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  cartCount: number;
  cartTotal: number;
  cartProducts: { product: Product; quantity: number }[];
  wishlistProducts: Product[];
}

const EterContext = createContext<EterState | null>(null);

const CART_KEY = "eter-cart";
const WISHLIST_KEY = "eter-wishlist";

/**
 * A tiny localStorage-backed external store. useSyncExternalStore (not an
 * effect + setState) is the React-endorsed way to read a browser-only
 * source like localStorage without a hydration mismatch: the server
 * snapshot is always the fallback, the client snapshot is the real value.
 */
function createLocalStorageStore<T>(key: string, fallback: T) {
  let value = fallback;
  let loaded = false;
  const listeners = new Set<() => void>();

  function getSnapshot() {
    if (typeof window === "undefined") return fallback;
    if (!loaded) {
      try {
        const raw = window.localStorage.getItem(key);
        value = raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        value = fallback;
      }
      loaded = true;
    }
    return value;
  }

  function set(next: T) {
    value = next;
    loaded = true;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(next));
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getServerSnapshot() {
    return fallback;
  }

  return { subscribe, getSnapshot, getServerSnapshot, set };
}

export function EterProvider({ children }: { children: React.ReactNode }) {
  const cartStore = useMemo(
    () => createLocalStorageStore<CartLine[]>(CART_KEY, []),
    []
  );
  const wishlistStore = useMemo(
    () => createLocalStorageStore<string[]>(WISHLIST_KEY, []),
    []
  );

  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const addToCart = useCallback(
    (slug: string, quantity = 1) => {
      const existing = cartStore.getSnapshot().find((l) => l.slug === slug);
      const next = existing
        ? cartStore
            .getSnapshot()
            .map((line) =>
              line.slug === slug
                ? { ...line, quantity: line.quantity + quantity }
                : line
            )
        : [...cartStore.getSnapshot(), { slug, quantity }];
      cartStore.set(next);
      setCartOpen(true);
    },
    [cartStore]
  );

  const removeFromCart = useCallback(
    (slug: string) => {
      cartStore.set(cartStore.getSnapshot().filter((l) => l.slug !== slug));
    },
    [cartStore]
  );

  const setQuantity = useCallback(
    (slug: string, quantity: number) => {
      const next =
        quantity <= 0
          ? cartStore.getSnapshot().filter((l) => l.slug !== slug)
          : cartStore
              .getSnapshot()
              .map((line) => (line.slug === slug ? { ...line, quantity } : line));
      cartStore.set(next);
    },
    [cartStore]
  );

  const clearCart = useCallback(() => {
    cartStore.set([]);
  }, [cartStore]);

  const toggleWishlist = useCallback(
    (slug: string) => {
      const current = wishlistStore.getSnapshot();
      wishlistStore.set(
        current.includes(slug)
          ? current.filter((s) => s !== slug)
          : [...current, slug]
      );
    },
    [wishlistStore]
  );

  const isWishlisted = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist]
  );

  const cartProducts = useMemo(
    () =>
      cart
        .map((line) => {
          const product = PRODUCTS.find((p) => p.slug === line.slug);
          return product ? { product, quantity: line.quantity } : null;
        })
        .filter((v): v is { product: Product; quantity: number } => v !== null),
    [cart]
  );

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.slug)),
    [wishlist]
  );

  const cartCount = cartProducts.reduce((sum, l) => sum + l.quantity, 0);
  const cartTotal = cartProducts.reduce(
    (sum, l) => sum + l.quantity * l.product.price,
    0
  );

  const value: EterState = {
    cart,
    wishlist,
    cartOpen,
    wishlistOpen,
    searchOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    cartTotal,
    cartProducts,
    wishlistProducts,
  };

  return <EterContext.Provider value={value}>{children}</EterContext.Provider>;
}

export function useEter() {
  const ctx = useContext(EterContext);
  if (!ctx) throw new Error("useEter must be used within EterProvider");
  return ctx;
}
