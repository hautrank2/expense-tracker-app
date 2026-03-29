import { useCallback } from "react";

const ANDROID_MAP_API_KEY = process.env.EXPO_PUBLIC_ANDROID_MAP_API_KEY ?? "";
export const useLocation = () => {
  const fetchReverseGeoCoding = useCallback(
    async (corr: [number, number]): Promise<string> => {
      // const latlng = `${corr[0]},${corr[1]}`;
      // const params = { latlng, key: ANDROID_MAP_API_KEY };
      // const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(params).toString()}`;
      // console.log("fetchReverseGeoCoding", latlng, ANDROID_MAP_API_KEY);
      // console.log("fetchReverseGeoCoding url", url);
      // return fetch(url).then((res) => res.json());

      return new Promise((resolve) => {
        return setTimeout(() => {
          resolve("Ký tục xá Bích Thủy, Thủ Dầu Một, Hồ Chí Minh, Việt Nam");
        }, 500);
      });
    },
    [],
  );

  return {
    fetchReverseGeoCoding,
  };
};
