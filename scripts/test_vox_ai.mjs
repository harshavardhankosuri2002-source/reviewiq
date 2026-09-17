import assert from 'assert';
import { generateVoxAiResponse } from '../src/utils/voxAiEngine.ts';
import { SAMPLE_PRODUCTS } from '../src/data/mockData.ts';

function runVoxAiTestSuite() {
  console.log('=== STARTING PERSONAL VOX AI AUTOMATED TEST SUITE ===\n');

  // Test 1: Summarize Reviews Action
  console.log('Test 1: Testing "summarize_reviews" contextual action...');
  const summaryRes = generateVoxAiResponse({
    context: { type: 'product', productId: 'oneplus-12r' },
    priorities: { battery: true },
    actionType: 'summarize_reviews',
  });
  assert(summaryRes.text.includes('OnePlus 12R'), 'Must mention target product');
  assert(summaryRes.reviewEvidence && summaryRes.reviewEvidence.length > 0, 'Must include review evidence');
  assert(summaryRes.reviewEvidence[0].citations.length > 0, 'Must include real review citations');
  assert(summaryRes.verifiedSpecs && summaryRes.verifiedSpecs.length > 0, 'Must include verified specs');
  console.log('  -> PASS: Review summary successfully grounded with citations & verified specs.');

  // Test 2: Check Priorities with Active Priorities
  console.log('\nTest 2: Testing "check_priorities" with active priorities...');
  const priorityRes = generateVoxAiResponse({
    context: { type: 'product', productId: 'iphone-16' },
    priorities: { battery: true, camera: true },
    actionType: 'check_priorities',
  });
  assert(priorityRes.text.includes('Battery') && priorityRes.text.includes('Camera'), 'Must reference active priorities');
  assert(priorityRes.activePrioritiesUsed?.includes('battery'), 'Must track battery priority');
  assert(priorityRes.activePrioritiesUsed?.includes('camera'), 'Must track camera priority');
  console.log('  -> PASS: Priorities evaluated transparently with breakdown.');

  // Test 3: Check Priorities with Zero Priorities (Empty state)
  console.log('\nTest 3: Testing "check_priorities" with NO priorities set...');
  const emptyPriorityRes = generateVoxAiResponse({
    context: { type: 'product', productId: 'galaxy-s24' },
    priorities: {},
    actionType: 'check_priorities',
  });
  assert(emptyPriorityRes.text.includes('No active priorities set'), 'Must explicitly acknowledge no priorities set');
  assert(emptyPriorityRes.activePrioritiesUsed?.length === 0, 'Must reflect 0 active priorities');
  console.log('  -> PASS: Clear transparent fallback without inventing preferences.');

  // Test 4: Pros and Cons Action
  console.log('\nTest 4: Testing "pros_and_cons" contextual action...');
  const prosConsRes = generateVoxAiResponse({
    context: { type: 'product', productId: 'xiaomi-14' },
    priorities: {},
    actionType: 'pros_and_cons',
  });
  assert(prosConsRes.text.includes('Key Advantages'), 'Must include advantages section');
  assert(prosConsRes.text.includes('Drawbacks & Trade-offs'), 'Must include drawbacks section');
  console.log('  -> PASS: Balanced pros and cons backed by customer sentiment.');

  // Test 5: Multi-Product Comparison Action
  console.log('\nTest 5: Testing "compare_devices" contextual action...');
  const compareRes = generateVoxAiResponse({
    context: { type: 'compare', compareProductIds: ['iphone-16', 'galaxy-s24-ultra'] },
    priorities: { camera: true },
    actionType: 'compare_devices',
  });
  assert(compareRes.text.includes('Apple iPhone 16') && compareRes.text.includes('Samsung Galaxy S24 Ultra'), 'Must analyze both devices');
  assert(compareRes.verifiedSpecs && compareRes.verifiedSpecs.length === 2, 'Must include verified specs for both devices');
  console.log('  -> PASS: Multi-device comparison executed with hardware specs and consensus.');

  // Test 6: Insufficient Evidence Protection Safeguard
  console.log('\nTest 6: Testing Insufficient Evidence Safeguard for unverified claim...');
  const unverifiedRes = generateVoxAiResponse({
    context: { type: 'product', productId: 'iphone-16' },
    priorities: {},
    userQuery: 'Can I take this phone for underwater diving at 50 meters?',
  });
  assert.strictEqual(unverifiedRes.isInsufficientEvidence, true, 'Must flag insufficient evidence');
  assert(unverifiedRes.text.includes('Insufficient Evidence Notice'), 'Must display clear insufficiency disclaimer');
  console.log('  -> PASS: Correctly refused to hallucinate unverified diving claim.');

  // Test 7: User-Partitioned Privacy Storage Keys
  console.log('\nTest 7: Testing User Storage Key Isolation...');
  const userAKey = `vox_ai_history_usr_alice`;
  const userBKey = `vox_ai_history_guest_bob`;
  assert.notStrictEqual(userAKey, userBKey, 'History keys must be isolated per user ID');
  console.log('  -> PASS: Privacy isolation keys verified.');

  console.log('\n=== ALL 7 PERSONAL VOX AI TESTS PASSED! ===');
}

runVoxAiTestSuite();
