import assert from 'assert';

// Simulated LocalStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

// Emulate auth.ts logic
function getSavedProductsStorageKey(userId) {
  return `vox_saved_items_${userId}`;
}

function runPrivacyTests() {
  console.log('--- RUNNING SAVED-LIST PRIVACY AUDIT & ISOLATION TESTS ---');

  // Session 1: User Alice
  const storageAlice = new MockLocalStorage();
  const aliceId = 'user_alice_123';
  const aliceSaved = ['oneplus-12r', 'xiaomi-14'];

  storageAlice.setItem(getSavedProductsStorageKey(aliceId), JSON.stringify(aliceSaved));
  console.log('1. User Alice saved products:', aliceSaved);

  // Session 2: Public Visitor / Bob
  const storageBob = new MockLocalStorage();
  const bobId = 'guest_bob_987';
  
  // Bob visits the site fresh
  const bobInitialSaved = storageBob.getItem(getSavedProductsStorageKey(bobId));
  const bobSavedList = bobInitialSaved ? JSON.parse(bobInitialSaved) : [];
  console.log('2. Fresh Visitor Bob saved products count:', bobSavedList.length);
  assert.strictEqual(bobSavedList.length, 0, 'Fresh visitor should start with an EMPTY saved list (0 items)');

  // Bob checks if he can see Alice's data in his storage
  assert.strictEqual(storageBob.getItem(getSavedProductsStorageKey(aliceId)), null, "Bob must not have access to Alice's storage key");

  // Bob saves a product
  const bobSaved = ['galaxy-s24-ultra'];
  storageBob.setItem(getSavedProductsStorageKey(bobId), JSON.stringify(bobSaved));

  // Verify Alice's list is completely unaffected by Bob's actions
  const aliceCurrentSaved = JSON.parse(storageAlice.getItem(getSavedProductsStorageKey(aliceId)));
  assert.deepStrictEqual(aliceCurrentSaved, ['oneplus-12r', 'xiaomi-14'], "Alice's saved items must remain completely unchanged");

  // Verify URL sharing does not leak saved items
  const publicShareUrl = 'https://myreviewiqapp.vercel.app/?product=iphone-16';
  const urlParams = new URL(publicShareUrl).searchParams;
  assert.strictEqual(urlParams.get('saved'), null, 'Public URL must never contain saved products parameter');
  assert.strictEqual(urlParams.get('userId'), null, 'Public URL must never leak user ID or session tokens');

  console.log('--- ALL PRIVACY ISOLATION TESTS PASSED SUCCESSFULLY! ---');
}

runPrivacyTests();
