# Kitchen Dashboard Test Plan

## Step 1: Place an Order
- [x] Navigate to `http://localhost:8080/index.html?table=T4`
- [x] Add "Koshari" to order
- [x] Add "Molokhia with Chicken" to order
- [x] Enter name "Ramo"
- [x] Enter notes "No onions on the Koshari please"
- [x] Select "Cash" payment
- [x] Click "Place Order"

## Step 2: Send Order to Kitchen (Cashier Dashboard)
- [x] Navigate to `http://localhost:8080/dashboard/cashier.html`
- [x] Find order and click "Send to Kitchen"
- [x] Verify order disappears from cashier view

## Step 3: Verify Kitchen Dashboard
- [x] Navigate to `http://localhost:8080/dashboard/kitchen.html`
- [x] Verify Order Number (prominent), Table (T4), Customer (Ramo)
- [x] Verify Items (Koshari, Molokhia with Chicken) - No prices
- [x] Verify Notes Block ("No onions on the Koshari please")
- [x] Verify Elapsed Time counter
- [x] Verify Order Counter in top bar
- [x] Click "Order Ready — Notify Waiter"
- [x] Verify card disappears and counter updates
