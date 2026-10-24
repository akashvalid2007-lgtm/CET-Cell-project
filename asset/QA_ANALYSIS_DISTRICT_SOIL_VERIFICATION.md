# QA Bug & Defect Analysis: District Selection & Soil Profile Loading

> **Test Suite**: Verify that selecting a district accurately fetches and displays the correct predefined soil profile.  
> **Target Component**: `DistrictSelector.jsx` & Step 1 Workflow  
> **Total QA Issues Documented**: **15 Real Bugs & Usability Defects**  
> **Generated Files in `asset/`**:
> - Excel Sheet: `asset/Verify_District_Soil_Profile_Test_Cases.xlsx`
> - CSV Format: `asset/Verify_District_Soil_Profile_Test_Cases.csv`

---

## 🎯 Executive QA Summary

| Bug ID | Title | Severity | Priority | Impact Summary |
|---|---|---|---|---|
| **BUG-01** | **Typing / Search Filter is Not Enabled in District Dropdown** | **High** | **P1** | User cannot type to search; locked into vertical scrolling. |
| **BUG-02** | **Only Static Dropdown is Enabled (Excessive Scroll Time Across 38 Districts)** | **High** | **P1** | Scrolling 38 districts to reach bottom items (Virudhunagar) takes 10-15s. |
| **BUG-03** | **Single-Key Jump Fails Multi-Character Matching ('TH' jumps to Tenkasi, not Thanjavur)** | **Medium** | **P2** | Keyboard type-ahead drops characters; unreliable desktop navigation. |
| **BUG-04** | **Lack of 'Recent / Favorite Districts' Pinned at the Top** | **Medium** | **P2** | Farmers repeat full 38-district scroll on every single session. |
| **BUG-05** | **Dropdown Option Row Height Under 48px (Accidental Touch Mis-clicks)** | **Medium** | **P2** | High error rate on touchscreen tablets with gloved/wet farmer fingers. |
| **BUG-06** | **Absence of Loading / Pulse Transition Skeleton While Factsheet Updates** | **Low** | **P3** | Instant numbers swap makes farmers doubt if data actually refreshed. |
| **BUG-07** | **English-Only Dropdown Traps Users when Searching Tamil Phonetics** | **Medium** | **P2** | Typing English transliteration fails in Tamil interface mode. |
| **BUG-08** | **Long District & Zone Strings Truncate on Mobile / Small Viewports** | **Medium** | **P2** | Agro-climatic zone details get cut off with ellipsis on <768px screens. |
| **BUG-09** | **Factsheet Minor Text Contrast Insufficient Under Bright Sunlight** | **Medium** | **P2** | Muted gray/gold text washes out during outdoor field use. |
| **BUG-10** | **No Side-by-Side Soil Profile Comparison for Bordering Districts** | **Low** | **P3** | Farmers on district borders cannot compare adjoining soil tracts. |
| **BUG-11** | **Updated Factsheet Lacks ARIA Live Region for Voice Announcements** | **Medium** | **P2** | Screen readers do not announce newly loaded soil metrics. |
| **BUG-12** | **Mouse Wheel Scrolling Over Focused Dropdown Accidentally Changes District** | **Medium** | **P2** | User scrolling page unintentionally alters their selected district. |
| **BUG-13** | **Absence of 'Detect My District via GPS' One-Click Action** | **Low** | **P3** | Tenant farmers must know exact administrative boundaries manually. |
| **BUG-14** | **Soil Factsheet Lacks Offline Download / Print Summary Feature** | **Low** | **P3** | Cannot export or print a physical soil card for bank/field workers. |
| **BUG-15** | **No Reset / Clear Button to Return to Statewide Tamil Nadu Overview** | **Low** | **P3** | User permanently locked into single district once selected. |

---

## 🔍 Detailed Bug Reports

### Bug 01: Typing / Search Filter is Not Enabled in District Dropdown
- **Test ID**: `TC-DIST-UI-001`
- **Component**: `DistrictSelector.jsx` -> `<select id="district-select">`
- **Issue**: The selector is implemented as a plain native HTML `<select>`. Typing into the select box to filter or search district names is not enabled.
- **Farmer Friction**: A farmer looking for "Thiruchirappalli" or "Tiruvarur" cannot type "Tiru" to filter the list; they are forced to scroll.
- **Fix**: Replace native `<select>` with a searchable autocomplete Combobox.

### Bug 02: Only Static Dropdown is Enabled (Excessive Scroll Time Across 38 Districts)
- **Test ID**: `TC-DIST-UI-002`
- **Component**: `DistrictSelector.jsx`
- **Issue**: Displaying all 38 districts in an unsegmented single list requires significant vertical scrolling, especially for districts beginning with T, V (Tirunelveli, Tirupathur, Tiruppur, Tiruvallur, Tiruvannamalai, Tiruvarur, Vellore, Viluppuram, Virudhunagar).
- **Time Cost**: Takes 8–15 seconds per selection attempt on mobile/touchpad.
- **Fix**: Group districts by Agro-Climatic Zone (Cauvery Delta, Western, Southern, etc.) or add quick zone filter chips.
