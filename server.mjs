import 'custom-event-polyfill'; // Add this line to polyfill CustomEvent
import { create } from 'ipfs';
import { webSockets } from '@libp2p/websockets';

if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = class CustomEvent extends Event {
    constructor(event, params = { bubbles: false, cancelable: false, detail: null }) {
      super(event, params);
      this.detail = params.detail;
    }
  };
}

const startRelayNode = async () => {
  try {
    const node = await create({
      repo: './ipfs-repo',
      libp2p: {
        config: {
          transports: [
            webSockets(), // Add WebSocket transport
          ],
        },
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ipfs-relay.onrender.com/tcp/443/wss', // WebSocket transport
            '/ip4/0.0.0.0/tcp/4001',                    // Optional plain TCP
            '/ip4/0.0.0.0/udp/4001/quic'               // Optional QUIC transport
          ],
          API: '/ip4/0.0.0.0/tcp/5001',
          Gateway: '/ip4/0.0.0.0/tcp/8080',
        },
        Swarm: {
          RelayService: {
            Enabled: true, // Enable relay functionality
          },
        },
      },
    });

    console.log('IPFS relay node is running...');
    console.log('Node ID:', (await node.id()).id);

    // Prevent the script from exiting
    process.stdin.resume();
  } catch (error) {
    console.error('Error starting IPFS relay node:', error);
    process.exit(1);
  }
};

startRelayNode();
