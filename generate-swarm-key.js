const fs = require('fs');
const crypto = require('crypto');

// Generate a 256-bit random key (32 bytes)
const randomKey = crypto.randomBytes(32).toString('hex');

// Define the content format of the swarm.key file
const swarmKeyContent = `/key/swarm/psk/1.0.0/
/base16/
${randomKey}
`;

// Write the content to a file named swarm.key
fs.writeFile('swarm.key', swarmKeyContent, (err) => {
  if (err) {
    console.error('Error generating swarm.key:', err);
    process.exit(1);
  }
  console.log('swarm.key generated successfully!');
});
