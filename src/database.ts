//
// Copyright 2021 Vulcanize, Inc.
//

import assert from 'assert';
import { Connection, ConnectionOptions, DeepPartial, FindConditions, QueryRunner, FindManyOptions, EntityTarget } from 'typeorm';
import path from 'path';

import {
  ENTITY_QUERY_TYPE,
  Database as BaseDatabase,
  DatabaseInterface,
  QueryOptions,
  StateKind,
  Where
} from '@cerc-io/util';

import { Contract } from './entity/Contract';
import { Event } from './entity/Event';
import { SyncStatus } from './entity/SyncStatus';
import { StateSyncStatus } from './entity/StateSyncStatus';
import { BlockProgress } from './entity/BlockProgress';
import { State } from './entity/State';
import { Factory } from './entity/Factory';
import { Bundle } from './entity/Bundle';
import { Token } from './entity/Token';
import { Pool } from './entity/Pool';
import { Tick } from './entity/Tick';
import { Position } from './entity/Position';
import { PositionSnapshot } from './entity/PositionSnapshot';
import { Transaction } from './entity/Transaction';
import { Mint } from './entity/Mint';
import { Burn } from './entity/Burn';
import { Swap } from './entity/Swap';
import { Collect } from './entity/Collect';
import { Flash } from './entity/Flash';
import { UniswapDayData } from './entity/UniswapDayData';
import { PoolDayData } from './entity/PoolDayData';
import { PoolHourData } from './entity/PoolHourData';
import { TickHourData } from './entity/TickHourData';
import { TickDayData } from './entity/TickDayData';
import { TokenDayData } from './entity/TokenDayData';
import { TokenHourData } from './entity/TokenHourData';
import { IncreaseEvent } from './entity/IncreaseEvent';
import { DecreaseEvent } from './entity/DecreaseEvent';

export const SUBGRAPH_ENTITIES = new Set([Factory, Bundle, Token, Pool, Tick, Position, PositionSnapshot, Transaction, Mint, Burn, Swap, Collect, Flash, UniswapDayData, PoolDayData, PoolHourData, TickHourData, TickDayData, TokenDayData, TokenHourData, IncreaseEvent, DecreaseEvent]);
export const ENTITIES = [...SUBGRAPH_ENTITIES];
// Map: Entity to suitable query type.
export const ENTITY_QUERY_TYPE_MAP = new Map<new() => any, ENTITY_QUERY_TYPE>([]);

export const ENTITY_TO_LATEST_ENTITY_MAP: Map<any, any> = new Map();

export class Database implements DatabaseInterface {
  _config: ConnectionOptions;
  _conn!: Connection;
  _baseDatabase: BaseDatabase;
  _propColMaps: { [key: string]: Map<string, string>; };

  constructor (config: ConnectionOptions) {
    assert(config);

    this._config = {
      ...config,
      subscribers: [path.join(__dirname, 'entity/Subscriber.*')],
      entities: [path.join(__dirname, 'entity/*')]
    };

    this._baseDatabase = new BaseDatabase(this._config);
    this._propColMaps = {};
  }

  get baseDatabase (): BaseDatabase {
    return this._baseDatabase;
  }

  async init (): Promise<void> {
    this._conn = await this._baseDatabase.init();
  }

  async close (): Promise<void> {
    return this._baseDatabase.close();
  }

  getNewState (): State {
    return new State();
  }

  async getStates (where: FindConditions<State>): Promise<State[]> {
    const repo = this._conn.getRepository(State);

    return this._baseDatabase.getStates(repo, where);
  }

  async getLatestState (contractAddress: string, kind: StateKind | null, blockNumber?: number): Promise<State | undefined> {
    const repo = this._conn.getRepository(State);

    return this._baseDatabase.getLatestState(repo, contractAddress, kind, blockNumber);
  }

  async getPrevState (blockHash: string, contractAddress: string, kind?: string): Promise<State | undefined> {
    const repo = this._conn.getRepository(State);

    return this._baseDatabase.getPrevState(repo, blockHash, contractAddress, kind);
  }

  // Fetch all diff States after the specified block number.
  async getDiffStatesInRange (contractAddress: string, startblock: number, endBlock: number): Promise<State[]> {
    const repo = this._conn.getRepository(State);

    return this._baseDatabase.getDiffStatesInRange(repo, contractAddress, startblock, endBlock);
  }

  async saveOrUpdateState (dbTx: QueryRunner, state: State): Promise<State> {
    const repo = dbTx.manager.getRepository(State);

    return this._baseDatabase.saveOrUpdateState(repo, state);
  }

  async removeStates (dbTx: QueryRunner, blockNumber: number, kind: string): Promise<void> {
    const repo = dbTx.manager.getRepository(State);

    await this._baseDatabase.removeStates(repo, blockNumber, kind);
  }

  async removeStatesAfterBlock (dbTx: QueryRunner, blockNumber: number): Promise<void> {
    const repo = dbTx.manager.getRepository(State);

    await this._baseDatabase.removeStatesAfterBlock(repo, blockNumber);
  }

  async getStateSyncStatus (): Promise<StateSyncStatus | undefined> {
    const repo = this._conn.getRepository(StateSyncStatus);

    return this._baseDatabase.getStateSyncStatus(repo);
  }

  async updateStateSyncStatusIndexedBlock (queryRunner: QueryRunner, blockNumber: number, force?: boolean): Promise<StateSyncStatus> {
    const repo = queryRunner.manager.getRepository(StateSyncStatus);

    return this._baseDatabase.updateStateSyncStatusIndexedBlock(repo, blockNumber, force);
  }

  async updateStateSyncStatusCheckpointBlock (queryRunner: QueryRunner, blockNumber: number, force?: boolean): Promise<StateSyncStatus> {
    const repo = queryRunner.manager.getRepository(StateSyncStatus);

    return this._baseDatabase.updateStateSyncStatusCheckpointBlock(repo, blockNumber, force);
  }

  async getContracts (): Promise<Contract[]> {
    const repo = this._conn.getRepository(Contract);

    return this._baseDatabase.getContracts(repo);
  }

  async createTransactionRunner (): Promise<QueryRunner> {
    return this._baseDatabase.createTransactionRunner();
  }

  async getProcessedBlockCountForRange (fromBlockNumber: number, toBlockNumber: number): Promise<{ expected: number, actual: number }> {
    const repo = this._conn.getRepository(BlockProgress);

    return this._baseDatabase.getProcessedBlockCountForRange(repo, fromBlockNumber, toBlockNumber);
  }

  async getEventsInRange (fromBlockNumber: number, toBlockNumber: number): Promise<Array<Event>> {
    const repo = this._conn.getRepository(Event);

    return this._baseDatabase.getEventsInRange(repo, fromBlockNumber, toBlockNumber);
  }

  async saveEventEntity (queryRunner: QueryRunner, entity: Event): Promise<Event> {
    const repo = queryRunner.manager.getRepository(Event);
    return this._baseDatabase.saveEventEntity(repo, entity);
  }

  async getBlockEvents (blockHash: string, where: Where, queryOptions: QueryOptions): Promise<Event[]> {
    const repo = this._conn.getRepository(Event);

    return this._baseDatabase.getBlockEvents(repo, blockHash, where, queryOptions);
  }

  async saveBlockWithEvents (queryRunner: QueryRunner, block: DeepPartial<BlockProgress>, events: DeepPartial<Event>[]): Promise<BlockProgress> {
    const blockRepo = queryRunner.manager.getRepository(BlockProgress);
    const eventRepo = queryRunner.manager.getRepository(Event);

    return this._baseDatabase.saveBlockWithEvents(blockRepo, eventRepo, block, events);
  }

  async saveEvents (queryRunner: QueryRunner, events: Event[]): Promise<void> {
    const eventRepo = queryRunner.manager.getRepository(Event);

    return this._baseDatabase.saveEvents(eventRepo, events);
  }

  async saveBlockProgress (queryRunner: QueryRunner, block: DeepPartial<BlockProgress>): Promise<BlockProgress> {
    const repo = queryRunner.manager.getRepository(BlockProgress);

    return this._baseDatabase.saveBlockProgress(repo, block);
  }

  async saveContract (queryRunner: QueryRunner, address: string, kind: string, checkpoint: boolean, startingBlock: number): Promise<Contract> {
    const repo = queryRunner.manager.getRepository(Contract);

    return this._baseDatabase.saveContract(repo, address, kind, checkpoint, startingBlock);
  }

  async updateSyncStatusIndexedBlock (queryRunner: QueryRunner, blockHash: string, blockNumber: number, force = false): Promise<SyncStatus> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.updateSyncStatusIndexedBlock(repo, blockHash, blockNumber, force);
  }

  async updateSyncStatusCanonicalBlock (queryRunner: QueryRunner, blockHash: string, blockNumber: number, force = false): Promise<SyncStatus> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.updateSyncStatusCanonicalBlock(repo, blockHash, blockNumber, force);
  }

  async updateSyncStatusChainHead (queryRunner: QueryRunner, blockHash: string, blockNumber: number, force = false): Promise<SyncStatus> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.updateSyncStatusChainHead(repo, blockHash, blockNumber, force);
  }

  async updateSyncStatusProcessedBlock (queryRunner: QueryRunner, blockHash: string, blockNumber: number, force = false): Promise<SyncStatus> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.updateSyncStatusProcessedBlock(repo, blockHash, blockNumber, force);
  }

  async updateSyncStatusIndexingError (queryRunner: QueryRunner, hasIndexingError: boolean): Promise<SyncStatus | undefined> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.updateSyncStatusIndexingError(repo, hasIndexingError);
  }

  async getSyncStatus (queryRunner: QueryRunner): Promise<SyncStatus | undefined> {
    const repo = queryRunner.manager.getRepository(SyncStatus);

    return this._baseDatabase.getSyncStatus(repo);
  }

  async getEvent (id: string): Promise<Event | undefined> {
    const repo = this._conn.getRepository(Event);

    return this._baseDatabase.getEvent(repo, id);
  }

  async getBlocksAtHeight (height: number, isPruned: boolean): Promise<BlockProgress[]> {
    const repo = this._conn.getRepository(BlockProgress);

    return this._baseDatabase.getBlocksAtHeight(repo, height, isPruned);
  }

  async markBlocksAsPruned (queryRunner: QueryRunner, blocks: BlockProgress[]): Promise<void> {
    const repo = queryRunner.manager.getRepository(BlockProgress);

    return this._baseDatabase.markBlocksAsPruned(repo, blocks);
  }

  async getBlockProgress (blockHash: string): Promise<BlockProgress | undefined> {
    const repo = this._conn.getRepository(BlockProgress);
    return this._baseDatabase.getBlockProgress(repo, blockHash);
  }

  async getBlockProgressEntities (where: FindConditions<BlockProgress>, options: FindManyOptions<BlockProgress>): Promise<BlockProgress[]> {
    const repo = this._conn.getRepository(BlockProgress);

    return this._baseDatabase.getBlockProgressEntities(repo, where, options);
  }

  async getEntitiesForBlock (blockHash: string, tableName: string): Promise<any[]> {
    return this._baseDatabase.getEntitiesForBlock(blockHash, tableName);
  }

  async updateBlockProgress (queryRunner: QueryRunner, block: BlockProgress, lastProcessedEventIndex: number): Promise<BlockProgress> {
    const repo = queryRunner.manager.getRepository(BlockProgress);

    return this._baseDatabase.updateBlockProgress(repo, block, lastProcessedEventIndex);
  }

  async removeEntities<Entity> (queryRunner: QueryRunner, entity: new () => Entity, findConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<void> {
    return this._baseDatabase.removeEntities(queryRunner, entity, findConditions);
  }

  async deleteEntitiesByConditions<Entity> (queryRunner: QueryRunner, entity: EntityTarget<Entity>, findConditions: FindConditions<Entity>): Promise<void> {
    await this._baseDatabase.deleteEntitiesByConditions(queryRunner, entity, findConditions);
  }

  async getAncestorAtDepth (blockHash: string, depth: number): Promise<string> {
    return this._baseDatabase.getAncestorAtDepth(blockHash, depth);
  }

  _getPropertyColumnMapForEntity (entityName: string): Map<string, string> {
    return this._conn.getMetadata(entityName).ownColumns.reduce((acc, curr) => {
      return acc.set(curr.propertyName, curr.databaseName);
    }, new Map<string, string>());
  }
}
