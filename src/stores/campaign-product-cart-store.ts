"use client";

import { create } from "zustand";

export type ProductUnitMap = Record<number, number>;

export const EMPTY_PRODUCT_UNITS: ProductUnitMap = {};

type CampaignProductCartState = {
  unitsByCampaign: Record<number, ProductUnitMap>;
  adjustQty: (
    campaignId: number,
    campaignProductId: number,
    delta: number,
  ) => void;
  removeProduct: (campaignId: number, campaignProductId: number) => void;
  clearCampaign: (campaignId: number) => void;
};

function omitProductId(
  map: ProductUnitMap,
  campaignProductId: number,
): ProductUnitMap {
  const { [campaignProductId]: _, ...rest } = map;
  return rest;
}

export const useCampaignProductCartStore = create<CampaignProductCartState>(
  (set) => ({
    unitsByCampaign: {},
    adjustQty: (campaignId, campaignProductId, delta) =>
      set((state) => {
        const prev = state.unitsByCampaign[campaignId] ?? {};
        const current = prev[campaignProductId] ?? 0;
        const next = Math.max(0, current + delta);
        let nextMap: ProductUnitMap;
        if (next === 0) {
          nextMap = omitProductId(prev, campaignProductId);
        } else {
          nextMap = { ...prev, [campaignProductId]: next };
        }
        return {
          unitsByCampaign: {
            ...state.unitsByCampaign,
            [campaignId]: nextMap,
          },
        };
      }),
    removeProduct: (campaignId, campaignProductId) =>
      set((state) => {
        const prev = state.unitsByCampaign[campaignId] ?? {};
        const nextMap = omitProductId(prev, campaignProductId);
        return {
          unitsByCampaign: {
            ...state.unitsByCampaign,
            [campaignId]: nextMap,
          },
        };
      }),
    clearCampaign: (campaignId) =>
      set((state) => {
        const { [campaignId]: _, ...rest } = state.unitsByCampaign;
        return { unitsByCampaign: rest };
      }),
  }),
);

export function getUnitsForCampaign(campaignId: number): ProductUnitMap {
  return (
    useCampaignProductCartStore.getState().unitsByCampaign[campaignId] ??
    EMPTY_PRODUCT_UNITS
  );
}
