/// <reference types="google.maps" />
/**
 * Internal hook that updates the camera when deck.gl viewState changes.
 * @internal
 */
export declare function useDeckGLCameraUpdate(map: google.maps.Map | null, viewState: Record<string, unknown> | undefined): void;
