import { GeolocatedConfig, GeolocatedResult } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";



/**
 * Hook abstracting away the interaction with the Geolocation API.
 * @param config - the configuration to use
 */
export function useGeolocated(config: GeolocatedConfig = {}): GeolocatedResult {
    const {
        positionOptions = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
        isOptimisticGeolocationEnabled = true,
        userDecisionTimeout = undefined,
        suppressLocationOnMount = false,
        watchPosition = false,
        geolocationProvider = typeof navigator !== "undefined"
            ? navigator.geolocation
            : undefined,
        onError,
        onSuccess,
    } = config;

    const userDecisionTimeoutId = useRef(0);
    const isCurrentlyMounted = useRef(true);
    const watchId = useRef<number | void>(0);

    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(
        isOptimisticGeolocationEnabled,
    );

    const [coords, setCoords] = useState<GeolocationCoordinates | undefined>();
    const [timestamp, setTimestamp] = useState<EpochTimeStamp | undefined>();
    const [positionError, setPositionError] = useState<
        GeolocationPositionError | undefined
    >();

    const cancelUserDecisionTimeout = useCallback(() => {
        if (userDecisionTimeoutId.current) {
            window.clearTimeout(userDecisionTimeoutId.current);
        }
    }, []);

    const handlePositionError = useCallback(
        (error?: GeolocationPositionError) => {
            cancelUserDecisionTimeout();
            if (isCurrentlyMounted.current) {
                setCoords(() => undefined);
                setIsGeolocationEnabled(false);
                setPositionError(error);
            }
            onError?.(error);
        },
        [onError, cancelUserDecisionTimeout],
    );

    const handlePositionSuccess = useCallback(
        (position: GeolocationPosition) => {
            cancelUserDecisionTimeout();
            if (isCurrentlyMounted.current) {
                setCoords(position.coords);
                setTimestamp(position.timestamp);
                setIsGeolocationEnabled(true);
                setPositionError(() => undefined);
            }
            onSuccess?.(position);
        },
        [onSuccess, cancelUserDecisionTimeout],
    );

    const getPosition = useCallback(() => {
        if (
            !geolocationProvider ||
            !geolocationProvider.getCurrentPosition ||
            !geolocationProvider.watchPosition
        ) {
            throw new Error("The provided geolocation provider is invalid");
        }

        const funcPosition = (
            watchPosition
                ? geolocationProvider.watchPosition
                : geolocationProvider.getCurrentPosition
        ).bind(geolocationProvider);

        if (userDecisionTimeout) {
            userDecisionTimeoutId.current = window.setTimeout(() => {
                handlePositionError();
            }, userDecisionTimeout);
        }

        watchId.current = funcPosition(
            handlePositionSuccess,
            handlePositionError,
            positionOptions,
        );
    }, [
        geolocationProvider,
        watchPosition,
        userDecisionTimeout,
        handlePositionError,
        handlePositionSuccess,
        positionOptions,
    ]);

    useEffect(() => {
        if (!suppressLocationOnMount) {
            getPosition();
        }

        return () => {
            cancelUserDecisionTimeout();
            if (watchPosition && watchId.current) {
                geolocationProvider?.clearWatch(watchId.current);
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        getPosition,
        coords,
        timestamp,
        isGeolocationEnabled,
        isGeolocationAvailable: Boolean(geolocationProvider),
        positionError,
    };
}