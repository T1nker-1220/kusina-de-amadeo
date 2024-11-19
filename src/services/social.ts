import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface SocialShare {
  platform: 'facebook' | 'twitter' | 'instagram';
  contentType: 'product' | 'order' | 'review';
  contentId: string;
  userId: string;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const SOCIAL_MEDIA_TEMPLATES = {
  product: {
    facebook: (data: any) => `Check out ${data.name} at Kusina De Amadeo! 🍽️ ${data.description}`,
    twitter: (data: any) => `Just discovered ${data.name} @KusinaDeAmadeo! 😋 #FilipinoFood #FoodPH`,
    instagram: (data: any) => `Craving for authentic Filipino food? Try ${data.name} at @kusinade.amadeo! 🇵🇭\n\n#FilipinoFood #FoodPH #PinoyFood`,
  },
  order: {
    facebook: (data: any) => `Just ordered from Kusina De Amadeo! Can't wait to try their delicious Filipino dishes! 🍽️`,
    twitter: (data: any) => `My order from @KusinaDeAmadeo is on the way! 🚚 #FilipinoFood #FoodDelivery`,
    instagram: (data: any) => `Excited for my @kusinade.amadeo delivery! 😋\n\n#FilipinoFood #FoodPH #PinoyFood`,
  },
  review: {
    facebook: (data: any) => `Just had an amazing experience at Kusina De Amadeo! ${data.comment} ⭐${data.rating}/5`,
    twitter: (data: any) => `${data.rating}⭐ review for @KusinaDeAmadeo: ${data.comment.slice(0, 180)}... #FilipinoFood`,
    instagram: (data: any) => `My @kusinade.amadeo experience:\n\n${data.comment}\n\nRating: ${data.rating}⭐\n\n#FilipinoFood #FoodReview`,
  },
};

export async function shareToSocial(
  platform: SocialShare['platform'],
  contentType: SocialShare['contentType'],
  contentId: string,
  userId: string
): Promise<string> {
  // Get content data based on type
  const contentRef = doc(db, contentType + 's', contentId);
  const contentDoc = await getDoc(contentRef);

  if (!contentDoc.exists()) {
    throw new Error(`${contentType} not found`);
  }

  const contentData = contentDoc.data();
  const message = SOCIAL_MEDIA_TEMPLATES[contentType][platform](contentData);

  // Record share in database
  const share: Omit<SocialShare, 'id'> = {
    platform,
    contentType,
    contentId,
    userId,
    timestamp: new Date().toISOString(),
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
    },
  };

  await addDoc(collection(db, 'social_shares'), share);

  // Update share count on original content
  await updateDoc(contentRef, {
    'socialStats.shares': contentData.socialStats?.shares + 1 || 1,
  });

  // Return the formatted message for the platform
  return message;
}

export async function updateSocialEngagement(
  shareId: string,
  engagement: Partial<SocialShare['engagement']>
): Promise<void> {
  const shareRef = doc(db, 'social_shares', shareId);
  await updateDoc(shareRef, {
    'engagement.likes': engagement.likes || 0,
    'engagement.shares': engagement.shares || 0,
    'engagement.comments': engagement.comments || 0,
  });
}
