## Why

With the landing page successfully refactored to manifest the "athletic retail cathedral" visual layout, it's now essential to bring the `global-navigation` (namely the Header and Footer) and any deeply-shared reusable components (such as form inputs, badges, or dialogs) mathematically into alignment with the `DESIGN.md`. The global navigation establishes the "frame" for the entire experience, so it must mirror the extreme minimalist, monochromatic, and flat elevation aesthetic. Currently, the Header might contain leftover padding logic or dropshadows that betray this aesthetic.

## What Changes

- Redesign the global `Header` component for absolute flatness, enforcing a Main White background (`#FFFFFF`) with pure Main Black typography/icons and zero drop shadow (`box-shadow: none`), relying solely on a 1px `inset #E5E5E5` divider for segmentation if required.
- Update the layout structure of the Header to match the exact specs from `DESIGN.md` (e.g. centering the Links, left-aligned Logo, right-aligned Search+Icons) utilizing the exact `16px/500 Helvetica Now Text Medium` typographical rule.
- Review and flatten the Search input and any other interaction boundaries occurring in the layout layer so that they deploy `var(--radius-24)` (or 24px) for search inputs instead of old values, and possess `#F5F5F5` backgrounds.
- Propagate the identical flat, Bugatti-monochrome treatment down to the `Footer`.

## Capabilities

### New Capabilities
- `nav-visual-update`: Applies the strict athletic, monochromatic design system variables (flat elevation, tokenized grays) to the global structural components `Header` and `Footer`.

### Modified Capabilities
- `<existing-name>`: 

## Impact

- `src/components/layout/Header/*`
- `src/components/layout/Footer/*`
- Associated Layout container queries and token variables
