import * as grpc from "@grpc/grpc-js"
import fs from 'node:fs'
import {
  LedgerRequest,
  LedgerRangeRequest,
  MasterKeyRequest,
  ValidationResponse
} from '../../protos/pb/validations_pb'
import { PingRequest, PongResponse } from "../../protos/pb/ping_pb"
import { ValidationsClient } from '../../protos/pb/validations_grpc_pb'
import { PingClient } from '../../protos/pb/ping_grpc_pb'

// Validation client
const creds = (): grpc.ChannelCredentials => {
  const cert = fs.readFileSync('./config/cert.pem')
  return grpc.credentials.createSsl(cert)
}

const client = new ValidationsClient(
  'localhost:3002',
  creds()
)

const ledgerRequest = new LedgerRequest()
ledgerRequest.setLedgerIndex(72982904)

client.getValidationsByLedger(ledgerRequest)
.on('data', (validation: ValidationResponse) => {
  console.log('[getValidationsByLedger]' + validation.getLedgerIndex())
})

client.getValidationsByLedger(ledgerRequest)
.on('data', (validation: ValidationResponse) => {
  console.log('[getValidationsByLedger]' + validation.getLedgerIndex())
})
.on('end', (error: any)=>{
  console.log('Stream ended')
})
.on('error', (error: any)=>{
  console.error(error)
})

const masterKeyRequest = new MasterKeyRequest()
masterKeyRequest.setMasterKey('nHDB2PAPYqF86j9j3c6w1F1ZqwvQfiWcFShZ9Pokg9q4ohNDSkAz')

client.getValidationsByMasterKey(masterKeyRequest)
.on('data', (validation: ValidationResponse) => {
  console.log('[getValidationsByMasterKey]' + validation.getMasterKey())
})

const ledgerRangeRequest = new LedgerRangeRequest()
ledgerRangeRequest.setLedgerIndexMin(72982904)
ledgerRangeRequest.setLedgerIndexMax(73088275)

client.getValidationsByLedgerRange(ledgerRangeRequest)
.on('data', (validation: ValidationResponse) => {
  console.log('[getValidationsByLedgerRange]' + validation.getLedgerIndex())
})
