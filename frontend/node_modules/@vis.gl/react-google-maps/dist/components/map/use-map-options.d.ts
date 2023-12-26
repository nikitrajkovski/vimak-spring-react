/// <reference types="google.maps" />
import { MapProps } from '@vis.gl/react-google-maps';
import { InternalCameraStateRef } from './use-internal-camera-state';
/**
 * Internal hook to update the map-options and camera parameters when
 * props are changed.
 *
 * @param map the map instance
 * @param cameraStateRef stores the last values seen during dispatch into the
 * react-application in useMapEvents(). We can safely assume that we
 * don't need to feed these values back into the map.
 * @param mapProps the props to update the map-instance with
 * @internal
 */
export declare function useMapOptions(map: google.maps.Map | null, cameraStateRef: InternalCameraStateRef, mapProps: MapProps): void;
