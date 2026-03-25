import { useCallback } from "react";

const ANDROID_MAP_API_KEY = process.env.MAP_API_KEY;
export const useLocation = () => {
  const fetchReverseGeoCoding = useCallback(async (corr: [number, number]) => {
    const latlng = `${corr[0]},${corr[1]}`;
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${ANDROID_MAP_API_KEY}`,
    ).then((res) => res.json());
  }, []);

  return {
    fetchReverseGeoCoding,
  };
};
