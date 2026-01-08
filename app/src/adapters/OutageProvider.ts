/**
 * Outage Provider Interface
 * 
 * This interface defines the contract for outage data providers.
 * Implementations can be swapped to integrate with different data sources.
 * 
 * TODO: Integrate with reverse-engineered SCE endpoints from
 * https://www.sce.com/outages-safety/outage-center/check-outage-status
 */

import type { Coordinates, OutageStatus } from '../types';

export interface OutageProvider {
  /**
   * Check if there is an outage at the given location
   * @param coords - The coordinates to check
   * @returns Promise resolving to outage status
   */
  checkOutageStatus(coords: Coordinates): Promise<OutageStatus>;
}

/**
 * Mock Outage Provider
 * 
 * Provides deterministic outage results based on latitude/longitude ranges.
 * This is a placeholder implementation for development and testing.
 * 
 * Mock logic:
 * - If latitude is between 33.0 and 34.0 AND longitude is between -118.5 and -117.5
 *   then simulate an outage (covers part of Los Angeles area)
 */
export class MockOutageProvider implements OutageProvider {
  async checkOutageStatus(coords: Coordinates): Promise<OutageStatus> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Deterministic mock: simulate outage in specific LA area coordinates
    const hasOutage = 
      coords.lat >= 33.0 && 
      coords.lat <= 34.0 && 
      coords.lng >= -118.5 && 
      coords.lng <= -117.5;

    if (hasOutage) {
      return {
        hasOutage: true,
        outageId: 'MOCK-OUTAGE-' + Math.floor(Math.random() * 10000),
        estimatedRestoreTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        affectedCustomers: Math.floor(Math.random() * 5000) + 100,
        message: 'Power outage detected in your area. Crews are working to restore service.',
      };
    }

    return {
      hasOutage: false,
      message: 'No outage detected at your location.',
    };
  }
}

/**
 * SCE Outage Provider (Placeholder)
 * 
 * TODO: Implement integration with SCE outage endpoints
 * This will require reverse-engineering the API calls from:
 * https://www.sce.com/outages-safety/outage-center/check-outage-status
 * 
 * Expected implementation steps:
 * 1. Capture network requests from SCE website
 * 2. Identify authentication/rate limiting requirements
 * 3. Implement endpoint calls with proper error handling
 * 4. Parse response data to match OutageStatus interface
 * 5. Add retry logic and caching as needed
 */
export class SCEOutageProvider implements OutageProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkOutageStatus(_coords: Coordinates): Promise<OutageStatus> {
    // TODO: Replace with actual SCE API integration
    throw new Error('SCE Outage Provider not yet implemented. Use MockOutageProvider for development.');
  }
}
