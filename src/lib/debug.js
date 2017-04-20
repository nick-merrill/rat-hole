/*
 This file determines whether we are in debug mode.

 Debug mode can be used for any sort of convenience for the developer.
 */
import StorageEngine from './StorageEngine';

const storage = new StorageEngine('debug');

const DEBUG_KEY = 'DEBUG';

export const get_debug = () => storage.get(DEBUG_KEY) || false;
window.get_debug = get_debug;

const set_debug = (true_or_false) => {
  storage.set(DEBUG_KEY, true_or_false);
  window.DEBUG = true_or_false;
};
window.set_debug = set_debug;
