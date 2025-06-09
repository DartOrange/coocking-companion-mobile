import * as Localization from "expo-localization";
import { useEffect, useState } from "react";

// Define the shape of the location data
export const useLocation = (): Localization.Locale | null => {
  const [locationParams, setLocationParams] =
    useState<Localization.Locale | null>(null);

  useEffect(() => {
    const localesParams = Localization.getLocales();
    setLocationParams(localesParams[0]);
  }, []);

  return locationParams;
};
