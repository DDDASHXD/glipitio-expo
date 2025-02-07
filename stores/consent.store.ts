import { create } from "zustand";

interface ConsentStore {
  consent: boolean;
  setConsent: (consent: boolean) => void;
}

const useConsentStore = create<ConsentStore>((set) => ({
  consent: false,
  setConsent: (consent: boolean) => set({ consent })
}));

export default useConsentStore;
