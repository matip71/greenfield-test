## ADDED Requirements

### Requirement: Global Header Flat Elevation
The main navigation header must adhere to the flat elevation mandate set forth by the monochromatic visual system.

#### Scenario: Header Scrolling Behavior
- **WHEN** the user scrolls down the page
- **THEN** the Header must NOT deploy a drop-shadow
- **THEN** elevated distinction from white backgrounds must be achieved uniquely via a `1px` solid `#CACACB` (Border Secondary) or `#E5E5E5` bottom border.

### Requirement: Search Primitive Geometry
In-line search components nested within global elements must follow the Bugatti spec.

#### Scenario: Rendering the Global Search Input
- **WHEN** the search input is loaded within the layout
- **THEN** its background must be `#F5F5F5` (Light Gray)
- **THEN** its border radius must be explicitly set to `24px`

### Requirement: Text Link Conformance
All textual navigation links must match the body-medium constraint.

#### Scenario: Header Link Rendering
- **WHEN** a navigation anchor is rendered inside the global nav
- **THEN** its font-weight must map to `500`
- **THEN** its hover state must purely shift the color to `#707072` (Secondary Text) without background fills.
