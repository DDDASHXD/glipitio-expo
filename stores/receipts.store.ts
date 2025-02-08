import { create } from "zustand";
import useSWR, { mutate } from "swr";
import { strapiClient } from "@/lib/strapi";

export interface ReceiptItem {
  __component: "shared.receipt-item";
  id: number;
  name: string;
  price: number;
  valuta: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes?: number;
  url: string;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Store {
  createdAt: string;
  description: any;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
  logo: Media;
  cover: Media;
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  name: string;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
}

export interface Receipt {
  createdAt: string;
  documentId: string;
  id: number;
  items: ReceiptItem[];
  publishedAt: string;
  store: Store;
  updatedAt: string;
  user: User;
}

interface ReceiptsStore {
  receipts: Receipt[] | null;
  isLoading: boolean;
  error: Error | null;
  fetchReceipts: (userId: number) => Promise<void>;
}

const useReceiptsStore = create<ReceiptsStore>((set) => ({
  receipts: null,
  isLoading: false,
  error: null,
  fetchReceipts: async (userId: number) => {
    try {
      set({ isLoading: true });
      const { data } = await strapiClient.get<Receipt[]>("/receipts", {
        populate: {
          items: true,
          store: {
            populate: ["logo", "cover"]
          },
          user: true
        },
        filters: {
          user: {
            id: {
              $eq: userId
            }
          }
        }
      });
      set({ receipts: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  }
}));

export const useRecentReceipts = (userId: number) => {
  const { data, error, isLoading } = useSWR(
    userId ? `/receipts/${userId}` : null,
    () =>
      strapiClient
        .get<Receipt[]>("/receipts", {
          populate: {
            items: true,
            store: {
              populate: ["logo", "cover"]
            },
            user: true
          },
          filters: {
            user: {
              id: {
                $eq: userId
              }
            }
          }
        })
        .then((res) => res.data)
  );

  return {
    receipts: data,
    isLoading,
    error,
    refresh: async () => {
      if (userId) {
        await mutate(`/receipts/${userId}`);
      }
    }
  };
};

export default useReceiptsStore;
