import Peer, { IPeer } from '../../models/Peer'
import Table from 'cli-table3'
import mongoose from 'mongoose'

const listPeer = async (): Promise<void> => {
  Peer.find({}, '-_id -certificate -fingerprint', async (error, peers) => {
    await printPeers(peers)
    await mongoose.disconnect()
  })
}

const printPeers = async (peers: IPeer[]): Promise<void> => {
  let table = new Table({
    head: [
      'node_id',
      'rest_url',
      'grpc_url',
      'enabled',
    ],
  })
  for (const peer of peers) {
    table.push([
      peer.node_id,
      peer.rest_url,
      peer.grpc_url,
      peer.enabled,
    ])
  }
  console.log(table.toString())
}

const ListPeerCommand = {
  command: 'list',
  aliases: ['ls'],
  describe: 'List saved peers',
  builder: {},
  handler: listPeer,
}
export default ListPeerCommand