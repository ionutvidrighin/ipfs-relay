import { create } from 'ipfs';

const startRelayNode = async () => {
  try {
    const node = await create({
      repo: './ipfs-repo',
      config: {
        Addresses: {
          Swarm: [
            '/ip4/0.0.0.0/tcp/4001',
            '/ip4/0.0.0.0/udp/4001/quic',
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
