import fs from 'fs';
import path from 'path';

export const events = fs.readFileSync(path.join(__dirname, 'events.gql'), 'utf8');
export const eventsInRange = fs.readFileSync(path.join(__dirname, 'eventsInRange.gql'), 'utf8');
export const factory = fs.readFileSync(path.join(__dirname, 'factory.gql'), 'utf8');
export const factories = fs.readFileSync(path.join(__dirname, 'factories.gql'), 'utf8');
export const bundle = fs.readFileSync(path.join(__dirname, 'bundle.gql'), 'utf8');
export const bundles = fs.readFileSync(path.join(__dirname, 'bundles.gql'), 'utf8');
export const token = fs.readFileSync(path.join(__dirname, 'token.gql'), 'utf8');
export const tokens = fs.readFileSync(path.join(__dirname, 'tokens.gql'), 'utf8');
export const pool = fs.readFileSync(path.join(__dirname, 'pool.gql'), 'utf8');
export const pools = fs.readFileSync(path.join(__dirname, 'pools.gql'), 'utf8');
export const tick = fs.readFileSync(path.join(__dirname, 'tick.gql'), 'utf8');
export const ticks = fs.readFileSync(path.join(__dirname, 'ticks.gql'), 'utf8');
export const position = fs.readFileSync(path.join(__dirname, 'position.gql'), 'utf8');
export const positions = fs.readFileSync(path.join(__dirname, 'positions.gql'), 'utf8');
export const positionSnapshot = fs.readFileSync(path.join(__dirname, 'positionSnapshot.gql'), 'utf8');
export const positionSnapshots = fs.readFileSync(path.join(__dirname, 'positionSnapshots.gql'), 'utf8');
export const transaction = fs.readFileSync(path.join(__dirname, 'transaction.gql'), 'utf8');
export const transactions = fs.readFileSync(path.join(__dirname, 'transactions.gql'), 'utf8');
export const mint = fs.readFileSync(path.join(__dirname, 'mint.gql'), 'utf8');
export const mints = fs.readFileSync(path.join(__dirname, 'mints.gql'), 'utf8');
export const burn = fs.readFileSync(path.join(__dirname, 'burn.gql'), 'utf8');
export const burns = fs.readFileSync(path.join(__dirname, 'burns.gql'), 'utf8');
export const swap = fs.readFileSync(path.join(__dirname, 'swap.gql'), 'utf8');
export const swaps = fs.readFileSync(path.join(__dirname, 'swaps.gql'), 'utf8');
export const collect = fs.readFileSync(path.join(__dirname, 'collect.gql'), 'utf8');
export const collects = fs.readFileSync(path.join(__dirname, 'collects.gql'), 'utf8');
export const flash = fs.readFileSync(path.join(__dirname, 'flash.gql'), 'utf8');
export const flashes = fs.readFileSync(path.join(__dirname, 'flashes.gql'), 'utf8');
export const uniswapDayData = fs.readFileSync(path.join(__dirname, 'uniswapDayData.gql'), 'utf8');
export const uniswapDayDatas = fs.readFileSync(path.join(__dirname, 'uniswapDayDatas.gql'), 'utf8');
export const poolDayData = fs.readFileSync(path.join(__dirname, 'poolDayData.gql'), 'utf8');
export const poolDayDatas = fs.readFileSync(path.join(__dirname, 'poolDayDatas.gql'), 'utf8');
export const poolHourData = fs.readFileSync(path.join(__dirname, 'poolHourData.gql'), 'utf8');
export const poolHourDatas = fs.readFileSync(path.join(__dirname, 'poolHourDatas.gql'), 'utf8');
export const tickHourData = fs.readFileSync(path.join(__dirname, 'tickHourData.gql'), 'utf8');
export const tickHourDatas = fs.readFileSync(path.join(__dirname, 'tickHourDatas.gql'), 'utf8');
export const tickDayData = fs.readFileSync(path.join(__dirname, 'tickDayData.gql'), 'utf8');
export const tickDayDatas = fs.readFileSync(path.join(__dirname, 'tickDayDatas.gql'), 'utf8');
export const tokenDayData = fs.readFileSync(path.join(__dirname, 'tokenDayData.gql'), 'utf8');
export const tokenDayDatas = fs.readFileSync(path.join(__dirname, 'tokenDayDatas.gql'), 'utf8');
export const tokenHourData = fs.readFileSync(path.join(__dirname, 'tokenHourData.gql'), 'utf8');
export const tokenHourDatas = fs.readFileSync(path.join(__dirname, 'tokenHourDatas.gql'), 'utf8');
export const increaseEvent = fs.readFileSync(path.join(__dirname, 'increaseEvent.gql'), 'utf8');
export const increaseEvents = fs.readFileSync(path.join(__dirname, 'increaseEvents.gql'), 'utf8');
export const decreaseEvent = fs.readFileSync(path.join(__dirname, 'decreaseEvent.gql'), 'utf8');
export const decreaseEvents = fs.readFileSync(path.join(__dirname, 'decreaseEvents.gql'), 'utf8');
export const getStateByCID = fs.readFileSync(path.join(__dirname, 'getStateByCID.gql'), 'utf8');
export const getState = fs.readFileSync(path.join(__dirname, 'getState.gql'), 'utf8');
export const getSyncStatus = fs.readFileSync(path.join(__dirname, 'getSyncStatus.gql'), 'utf8');
export const _meta = fs.readFileSync(path.join(__dirname, '_meta.gql'), 'utf8');
