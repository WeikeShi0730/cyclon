"use client";

import React, { useEffect, useState } from "react";
import { useGeolocated } from "@/utils/useGeolocation";
import { GpsData } from "@/interfaces";

const Dash = () => {
  const [gps, setGps] = useState<GpsData>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    speed: 0,
  });
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGeolocationAvailable && isGeolocationEnabled && coords) {
        const { latitude, longitude, altitude, speed } = coords;
        setGps({
          latitude,
          longitude,
          altitude,
          speed,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <div>
      <div className="">Latitude: {gps.latitude?.toFixed(2)}</div>
      <div className="">Longitude: {gps.longitude?.toFixed(2)}</div>
      <div className="">Altitude: {gps.altitude?.toFixed(2)}</div>
      <div className="">Speed: {gps.speed?.toFixed(2)} m/s</div>
    </div>
  );
};

export default Dash;
