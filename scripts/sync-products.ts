const { syncAllProductsToFirestore } = require('../src/services/products');

async function main() {
  try {
    await syncAllProductsToFirestore();
    console.log('Successfully synced all products to Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing products:', error);
    process.exit(1);
  }
}

main();
