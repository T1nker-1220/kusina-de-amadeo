import {
  doc,
  getDoc,
  updateDoc,
  increment,
  Transaction,
  runTransaction,
  FieldValue,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface LoyaltyProfile {
  userId: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number | FieldValue;
  joinDate: string;
  lastActivity: string;
  rewards: {
    id: string;
    name: string;
    cost: number;
    expiryDate: string;
    used: boolean;
  }[];
}

const POINTS_PER_PESO = 1;
const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
};

export async function calculateTier(points: number): Promise<LoyaltyProfile['tier']> {
  if (points >= TIER_THRESHOLDS.platinum) return 'platinum';
  if (points >= TIER_THRESHOLDS.gold) return 'gold';
  if (points >= TIER_THRESHOLDS.silver) return 'silver';
  return 'bronze';
}

export async function addPointsFromPurchase(
  userId: string,
  amount: number
): Promise<LoyaltyProfile> {
  const pointsToAdd = Math.floor(amount * POINTS_PER_PESO);

  return runTransaction(db, async (transaction: Transaction) => {
    const profileRef = doc(db, 'loyaltyProfiles', userId);
    const profile = await transaction.get(profileRef);

    if (!profile.exists()) {
      // Create new profile if it doesn't exist
      const newProfile: LoyaltyProfile = {
        userId,
        points: pointsToAdd,
        tier: await calculateTier(pointsToAdd),
        totalSpent: amount,
        joinDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        rewards: [],
      };

      transaction.set(profileRef, newProfile);
      return newProfile;
    }

    const currentData = profile.data() as LoyaltyProfile;
    const newPoints = currentData.points + pointsToAdd;
    const newTier = await calculateTier(newPoints);

    const updates = {
      points: newPoints,
      tier: newTier,
      totalSpent: increment(amount),
      lastActivity: new Date().toISOString(),
    };

    transaction.update(profileRef, updates);

    return {
      ...currentData,
      ...updates,
      points: newPoints,
    };
  });
}

export async function redeemReward(
  userId: string,
  rewardId: string,
  pointsCost: number
): Promise<boolean> {
  return runTransaction(db, async (transaction: Transaction) => {
    const profileRef = doc(db, 'loyaltyProfiles', userId);
    const profile = await transaction.get(profileRef);

    if (!profile.exists()) {
      throw new Error('Loyalty profile not found');
    }

    const currentData = profile.data() as LoyaltyProfile;

    if (currentData.points < pointsCost) {
      throw new Error('Insufficient points');
    }

    const updates = {
      points: currentData.points - pointsCost,
      lastActivity: new Date().toISOString(),
      rewards: [
        ...currentData.rewards,
        {
          id: rewardId,
          name: 'Free Delivery',
          cost: pointsCost,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          used: false,
        },
      ],
    };

    transaction.update(profileRef, updates);
    return true;
  });
}

export async function createLoyaltyProfile(userId: string): Promise<LoyaltyProfile> {
  const profileRef = doc(db, 'loyaltyProfiles', userId);
  const profile = await getDoc(profileRef);

  if (profile.exists()) {
    return profile.data() as LoyaltyProfile;
  }

  const newProfile: LoyaltyProfile = {
    userId,
    points: 0,
    tier: 'bronze',
    totalSpent: 0,
    joinDate: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    rewards: [],
  };

  await setDoc(profileRef, newProfile);
  return newProfile;
}
