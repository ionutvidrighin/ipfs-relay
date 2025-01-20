const IPFS = require('ipfs');

const startIPFSNode = async () => {
  const ipfs = await IPFS.create({
    repo: './.ipfs', // Directory for IPFS storage
    config: {
      Addresses: {
        Swarm: [
          // Change these as per your configuration
          '/ip4/0.0.0.0/tcp/4001',
          '/ip4/0.0.0.0/tcp/4002/ws',
        ],
        API: '/ip4/0.0.0.0/tcp/5001',
        Gateway: '/ip4/0.0.0.0/tcp/8080',
      },
    },
  });

  console.log('IPFS node is running');
  console.log('Node ID:', (await ipfs.id()).id);

  // Prevent the script from exiting
  process.stdin.resume();
};

startIPFSNode().catch((error) => {
  console.error('Failed to start IPFS node:', error);
  process.exit(1);
});
