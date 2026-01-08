/**
 * Outage Service
 * 
 * Main service for interacting with outage data.
 * Provides a layer of abstraction over the outage provider.
 */

import type { OutageProvider } from '../adapters/OutageProvider';
import type { Coordinates, OutageStatus } from '../types';
import { MockOutageProvider } from '../adapters/OutageProvider';

class OutageService {
  private provider: OutageProvider;

  constructor(provider?: OutageProvider) {
    // Use MockOutageProvider by default
    // Can be swapped with SCEOutageProvider or other implementations
    this.provider = provider || new MockOutageProvider();
  }

  /**
   * Set a different outage provider
   */
  setProvider(provider: OutageProvider): void {
    this.provider = provider;
  }

  /**
   * Check outage status for given coordinates
   */
  async checkOutage(coords: Coordinates): Promise<OutageStatus> {
    try {
      return await this.provider.checkOutageStatus(coords);
    } catch (error) {
      console.error('Error checking outage status:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const outageService = new OutageService();
