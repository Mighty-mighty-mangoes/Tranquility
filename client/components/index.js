/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './Navbar';
export {default as Homepage} from './Homepage';
export {default as Login} from './Login';
export {default as Signup} from './Signup';
export {default as Cart} from './Cart';
export {default as Confirmation} from './Confirmation';

//candle components
export {default as AllCandles} from './AllCandles';
export {default as SingleCandle} from './SingleCandle';
export {default as FoodCandles} from './FoodCandles';
export {default as SpiceCandles} from './SpiceCandles';
export {default as FlowerCandles} from './FlowerCandles';
export {default as CoderCandles} from './CoderCandles';
export {default as InsufficientStock} from './InsufficientStock';
