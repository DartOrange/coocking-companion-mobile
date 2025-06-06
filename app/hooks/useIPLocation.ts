import { useToast } from "@/contexts/ToastContext";
import { useEffect, useState } from "react";

// Define the shape of the location data
interface IPLocation {
  country: string;
  city: string;
}

// Define the hook return type (can be null if not loaded)
export const useIPLocation = (): IPLocation | null => {
  const toast = useToast();
  const [location, setLocation] = useState<IPLocation | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Get public IP address
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData: { ip: string } = await ipRes.json();

        // Fetch geolocation from IP
        const locRes = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        const locData: {
          country: string;
          city: string;
          status: string;
          message?: string;
        } = await locRes.json();

        if (locData.status === "success") {
          setLocation({
            country: locData.country,
            city: locData.city,
          });
        } else {
          toast.showToast({ type: "error", message: String(locData.message) });
        }
      } catch (err) {
        toast.showToast({ type: "error", message: String(err) });
      }
    };

    fetchLocation();
  }, []);

  return location;
};
