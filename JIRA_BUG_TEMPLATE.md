# Jira Defect Template

**Project:** ECOM  |  **Issue Type:** Bug

| Field | Value |
|---|---|
| **Summary** | [Module] Short description, e.g. "[Checkout] No error shown when postal code is empty" |
| **Priority / Severity** | Highest / High / Medium / Low |
| **Environment** | Chrome 126, Windows 11, QA build 2.4.1, https://qa.example.com |
| **Affected Version** | 2.4.1 |
| **Labels** | regression, automation-found, checkout |
| **Linked Test Case** | TC-K04 |

## Preconditions
- User is logged in as `standard_user`
- At least one item is in the cart

## Steps to Reproduce
1. Go to the cart and click **Checkout**.
2. Enter First Name `Test`, Last Name `User`, leave Postal Code empty.
3. Click **Continue**.

## Expected Result
Inline error "Error: Postal Code is required" is displayed and the user stays on the information page.

## Actual Result
User is moved to the Overview page without a postal code.

## Attachments
- Screenshot: `screenshots/TC_K04_missing_postal_code.png` (auto-captured on failure)
- Console / network logs, test run output

## Additional Notes
Reproducible 3/3 runs. First seen in regression run on 2026-10-04. Passed in build 2.4.0.
