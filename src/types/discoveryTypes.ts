// Action Types
export const FINISH_DISCOVERY = 'FINISH_DISCOVERY';
export const CLOSE_DISCOVERY = 'CLOSE_DISCOVERY';

// Interfaces for Action Payloads
export interface DiscoveryFilters {
  text: {
    [key: string]: string;
  };
}

// Interface for each Action
interface FinishDiscoveryAction {
  type: typeof FINISH_DISCOVERY;
  payload: DiscoveryFilters;
}

interface CloseDiscoveryAction {
  type: typeof CLOSE_DISCOVERY;
}

// Union Type for all Action Types
export type DiscoveryActionTypes = FinishDiscoveryAction | CloseDiscoveryAction;

// Interface for the Discovery State
export interface DiscoveryState {
  filters: DiscoveryFilters;
}
