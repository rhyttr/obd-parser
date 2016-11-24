'use strict';

import * as connection from './connection';
import * as Promise from 'bluebird';
import * as PIDS from './pids/pid';
import log from './log';

// Logger instance exposed so it can be configured as necessary
export { default as logger } from './log';

// Export all PIDS so they can be passed to an ECUPoller
export { PIDS as PIDS };

// Just export the vanilla ECUPoller class
export { ECUPoller as ECUPoller } from './poller';

// Interfaces
export { OBDOutput, PIDInfo, OBDConnection } from './interfaces';


/**
 * Initialises this module for usage (no shit - right?)
 * @param  {Object}   opts
 * @return {Promise}
 */
export function init (connectorFn: Function) : Promise<void> {
  log.info('initialising obd-parser');

  // Expose the connection we've been passed
  connection.setConnectorFn(connectorFn);

  // Call this to get a connection error/success now rather than later
  return connection.getConnection()
    .then(onInitialiseSuccess);


  function onInitialiseSuccess () {
    log.info('initialised successfully');
  }
};
