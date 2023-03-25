import { SharedStoreValues } from 'common/utilities/SharedStore';

declare global {
  interface Window {
    __STORE_VALUES__?: SharedStoreValues;
  }
}
