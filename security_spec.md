# Security Specification for MtaalamuTech

## Data Invariants
- Services can only be created, updated, or deleted by admins.
- Bookings can be created by anyone (authenticated or guest), but only the creator or admin can read their specific booking.
- Payments are linked to bookings. Only the booking owner or admin can see the payment.
- Feedback can be created by anyone, but only admins can approve it for display.
- News is read-only for public, write for admins.
- Admin status is controlled by the `/admins` collection.

## The Dirty Dozen Payloads
1. **Unauthorized Service Creation**: Guest tries to POST to `/services`.
2. **Booking Hijack**: User A tries to GET `/bookings/userB-booking-id`.
3. **Auto-Approval**: User creates feedback with `approved: true`.
4. **Status Forgery**: User updates booking status to `confirmed`.
5. **Payment Tampering**: User updates payment `amount` after it was created.
6. **ID Poisoning**: User creates booking with a 2MB string as ID.
7. **Resource Exhaustion**: User sends a 1MB string in the `message` field.
8. **Admin Self-Promotion**: User writes to `/admins/my-uid`.
9. **Global Booking Scraping**: User tries to `list` all documents in `/bookings`.
10. **Immutable Field Write**: User updates `createdAt` on an existing booking.
11. **Price Modification**: Unauthorized user updates a service price.
12. **orphaned Payment**: User creates a payment record without a valid booking ID.

## Test Runner (firestore.rules.test.ts)
```typescript
// This file would be used to test the rules.
// We will implement the rules in firestore.rules and verify they block these.
```
