/// <reference types="google.maps" />
import { MutableRefObject } from 'react';
import { MapEvent } from './use-map-events';
export type InternalCameraState = {
    center: google.maps.LatLngLiteral;
    heading: number;
    tilt: number;
    zoom: number;
};
export type InternalCameraStateRef = MutableRefObject<InternalCameraState>;
/**
 * Creates a mutable ref object to track the last known state of the map camera.
 * This is updated by `trackDispatchedEvent` and used in `useMapOptions`.
 */
export declare function useInternalCameraState(): InternalCameraStateRef;
/**
 * Records camera data from the last event dispatched to the React application
 * in a mutable `IternalCameraStateRef`.
 * This data can then be used to prevent feeding these values back to the
 * map-instance when a typical "controlled component" setup (state variable is
 * fed into and updated by the map).
 */
export declare function trackDispatchedEvent(ev: MapEvent, cameraStateRef: InternalCameraStateRef): void;
