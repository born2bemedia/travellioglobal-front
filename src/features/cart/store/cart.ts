import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
  bookingDetails?: {
    date: string;
    time: string;
    participants: number;
    duration: string;
    meetingPoint: string;
  };
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: true,
      setIsLoading: (isLoading: boolean) => {
        set({ isLoading: isLoading ?? true });
      },

      addToCart: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) => {
              if (i.id !== item.id) {
                return i;
              }

              const nextQuantity = i.quantity + item.quantity;

              return {
                ...i,
                ...item,
                quantity: nextQuantity,
                bookingDetails: item.bookingDetails
                  ? {
                      ...item.bookingDetails,
                      participants: nextQuantity,
                    }
                  : i.bookingDetails
                    ? {
                        ...i.bookingDetails,
                        participants: nextQuantity,
                      }
                    : undefined,
              };
            }),
          }));
          toast.success(`${item.title} quantity updated!`, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                ...item,
                quantity: item.quantity,
                bookingDetails: item.bookingDetails
                  ? {
                      ...item.bookingDetails,
                      participants: item.quantity,
                    }
                  : undefined,
              },
            ],
          }));
          toast.success(`${item.title} added to cart!`, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity,
                  bookingDetails: i.bookingDetails
                    ? {
                        ...i.bookingDetails,
                        participants: quantity,
                      }
                    : undefined,
                }
              : i,
          ),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
