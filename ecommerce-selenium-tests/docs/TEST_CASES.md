# Test Case Matrix

| ID | Module | Scenario | Type | Expected |
|---|---|---|---|---|
| TC-L01 | Login | Valid credentials | Positive | Products page loads |
| TC-L02 | Login | Wrong password | Negative | "do not match" error |
| TC-L03 | Login | Empty username | Negative | "Username is required" |
| TC-L04 | Login | Empty password | Negative | "Password is required" |
| TC-L05 | Login | Locked-out user | Negative | "locked out" error |
| TC-L06 | Login | SQL-injection string | Negative | Rejected |
| TC-S01 | Search | Keyword "Backpack" | Positive | 1 matching product |
| TC-S02 | Search | Mixed-case keyword | Positive | Match found |
| TC-S03 | Search | Unknown keyword | Negative | Empty result |
| TC-S04 | Sort | Price low to high | Positive | Ascending prices |
| TC-S05 | Sort | Name Z to A | Positive | Descending names |
| TC-C01 | Cart | Add one item | Positive | Badge = 1 |
| TC-C02 | Cart | Add two items | Positive | Both in cart |
| TC-C03 | Cart | Remove item | Positive | Badge cleared |
| TC-C04 | Cart | Open empty cart | Negative | 0 items |
| TC-K01 | Checkout | Full purchase | Positive | Order confirmation |
| TC-K02 | Checkout | Missing first name | Negative | Error shown |
| TC-K03 | Checkout | Missing last name | Negative | Error shown |
| TC-K04 | Checkout | Missing postal code | Negative | Error shown |
