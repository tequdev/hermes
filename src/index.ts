import ingress from './processors/Ingress'
import connectPeers from './processors/peersync/index'
import ENV from './lib/ENV'
import { startExpressServer } from './http'
import { startgRPCServer } from './grpc/server'
import { connectDatabase } from './db'

// Connect to mongodb
connectDatabase()

// Start REST services
if (ENV.SERVER_REST_ENABLED) {
  startExpressServer()
}

// Start gRPC services
if (ENV.SERVER_GRPC_ENABLED) {
  startgRPCServer()
}

// Ingress validation messages
if (ENV.INGRESS_ENABLED) {
  ingress()
}

// Sync with peers and fetch validation messages
if (ENV.PEERSYNC_ENABLED) {
  connectPeers()
}