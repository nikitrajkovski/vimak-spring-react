/// <reference types="google.maps" />
export interface DirectionsServiceHookOptions {
    mapId?: string;
    renderOnMap?: boolean;
    renderOptions?: google.maps.DirectionsRendererOptions;
}
interface DirectionsServiceHookReturns {
    directionsService: google.maps.DirectionsService | null;
    directionsRenderer: google.maps.DirectionsRenderer | null;
    renderRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
    setRenderedRouteIndex: ((index: number) => void) | null;
}
/**
 * Hook to get Google Maps Places Directions Service instance
 */
export declare const useDirectionsService: (props?: DirectionsServiceHookOptions) => DirectionsServiceHookReturns;
export {};
