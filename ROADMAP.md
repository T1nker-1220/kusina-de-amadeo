# Kusina de Amadeo - Implementation Roadmap

## Phase 1: Firebase Setup and Configuration
1. Firebase Project Setup
   - [ ] Create new Firebase project
   - [ ] Install Firebase SDK
   - [ ] Configure Firebase in the project
   - [ ] Set up Firebase Authentication
   - [ ] Initialize Firestore Database

2. Database Structure Setup
   ```typescript
   orders: {
     orderId: {
       customer: {
         name: string,
         phone: string,
         address: string,
         notes: string
       },
       order: {
         type: 'now' | 'preorder',
         items: Array<{
           id: string,
           name: string,
           quantity: number,
           price: number
         }>,
         total: number,
         status: 'pending' | 'confirmed' | 'preparing' | 'delivery' | 'completed',
         paymentStatus: 'pending' | 'verified'
       },
       payment: {
         method: 'cod' | 'gcash',
         proofImageUrl?: string,
         verifiedAt?: timestamp
       },
       preorderDetails?: {
         deliveryDate: timestamp,
         deliveryTime: string
       },
       createdAt: timestamp,
       updatedAt: timestamp
     }
   }
   ```

## Phase 2: Order System Implementation
1. Modify Checkout Form
   - [ ] Add order type selection (Order Now/Pre-order)
   - [ ] Remove bank transfer option
   - [ ] Add date/time picker for pre-orders
   - [ ] Add GCash QR code display
   - [ ] Create payment proof upload component

2. Create Order Processing
   - [ ] Implement order submission logic
   - [ ] Add order validation
   - [ ] Create order confirmation page
   - [ ] Implement order status tracking

## Phase 3: Payment System
1. GCash Integration
   - [ ] Add GCash QR code component
   - [ ] Create payment verification system
   - [ ] Implement payment proof upload
   - [ ] Add payment status tracking

2. Payment Processing
   - [ ] Create payment verification API
   - [ ] Implement payment status updates
   - [ ] Add payment confirmation notifications

## Phase 4: Mobile Notifications
1. Firebase Cloud Messaging (FCM) Setup
   - [ ] Set up FCM in Firebase project
   - [ ] Generate FCM server key
   - [ ] Configure FCM in Next.js backend

2. Notification Types
   - [ ] New order notifications
   - [ ] Payment verification notifications
   - [ ] Pre-order reminders
   - [ ] Order status updates

3. Android App Setup
   - [ ] Create basic Android app with React Native
   - [ ] Implement FCM in Android app
   - [ ] Add notification handling
   - [ ] Create order management interface

## Implementation Order:

### Step 1: Firebase Setup (Est. 1-2 hours)
1. Install required packages:
   ```bash
   npm install firebase firebase-admin
   ```
2. Create Firebase configuration files
3. Set up environment variables

### Step 2: Basic Order System (Est. 2-3 hours)
1. Modify CheckoutForm component
2. Create order processing logic
3. Implement order type selection

### Step 3: Payment Integration (Est. 2-3 hours)
1. Add GCash QR code display
2. Create payment proof upload
3. Implement payment verification

### Step 4: Mobile Notifications (Est. 3-4 hours)
1. Set up FCM
2. Create notification system
3. Implement Android app

## Required Environment Variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

## Next Steps:
1. Start with Firebase project setup
2. Implement basic order system
3. Add payment integration
4. Create mobile notification system

Would you like to begin with Step 1: Firebase Setup?
