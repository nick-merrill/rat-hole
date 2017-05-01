import StorageEngine from '../lib/StorageEngine';

export const DEMO_MODE = 'demo_mode';

const debugStorage = new StorageEngine('debug');

window.debugStorage = debugStorage;
export default debugStorage;

export const isDemoMode = () => {
  return !!debugStorage.get(DEMO_MODE);
};
