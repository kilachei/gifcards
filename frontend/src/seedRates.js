// Run this ONCE in your browser console or as a one-time script
// to seed your Firestore with the initial rates data.
// Import and call seedRates() once, then delete this file.

import { db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

const INITIAL_RATES = [
  { brand: 'Amazon',                discount: 18, buyRate: 0.82, sellRate: 0.88, minAmount: 10,  payout: 'Instant'   },
  { brand: 'Apple',                 discount: 20, buyRate: 0.80, sellRate: 0.86, minAmount: 10,  payout: 'Instant'   },
  { brand: 'Steam',                 discount: 15, buyRate: 0.85, sellRate: 0.90, minAmount: 5,   payout: '< 1 hour'  },
  { brand: 'Razer Gold',            discount: 15, buyRate: 0.85, sellRate: 0.89, minAmount: 5,   payout: '< 1 hour'  },
  { brand: 'Google Play',           discount: 17, buyRate: 0.83, sellRate: 0.88, minAmount: 5,   payout: 'Instant'   },
  { brand: 'Xbox',                  discount: 16, buyRate: 0.84, sellRate: 0.89, minAmount: 10,  payout: '< 1 hour'  },
  { brand: 'PlayStation',           discount: 16, buyRate: 0.84, sellRate: 0.89, minAmount: 10,  payout: '< 1 hour'  },
  { brand: 'Nike',                  discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 20,  payout: '< 2 hours' },
  { brand: 'Sephora',               discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 20,  payout: '< 2 hours' },
  { brand: 'Prepaid Visa',          discount: 12, buyRate: 0.88, sellRate: 0.91, minAmount: 25,  payout: '< 2 hours' },
  { brand: 'Mastercard',            discount: 12, buyRate: 0.88, sellRate: 0.91, minAmount: 25,  payout: '< 2 hours' },
  { brand: 'Tremendous',            discount: 13, buyRate: 0.87, sellRate: 0.91, minAmount: 10,  payout: 'Instant'   },
  { brand: 'Virtual Reward Center', discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 10,  payout: 'Instant'   },
]

export async function seedRates() {
  for (const rate of INITIAL_RATES) {
    await setDoc(doc(db, 'rates', rate.brand), rate)
  }
  console.log('✅ Rates seeded to Firestore!')
}