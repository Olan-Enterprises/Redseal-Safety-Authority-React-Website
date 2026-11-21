---
trigger: always_on
---

# Coding Instructions

* Follow the coding conventions demonstrated in: @references/Home.jsx. Use that file as the primary reference for formatting and structural conventions.

## General

* Follow these conventions for all new and modified code.
* Preserve the existing project structure and conventions unless explicitly instructed otherwise.
* Use default indentation. Do not use narrower indentation.
* Use double quotes (`"`) instead of single quotes (`'`) wherever possible.
* Do not unnecessarily reformat unrelated code.
* Do not use `export` inline with declarations. Place exports at the bottom of the file.
* Do not shorten words for declarations, function names, variables, parameters, etc... (e.g. Use `catch(error) { ... }` instead of `catch(err) { ... }`)

## Spacing and Braces

* Never put a space between `if`, `else if`, `for`, `while`, `switch`, or `catch` and `(`.
* Write `if(condition)`, not `if (condition)`.
* Omit curly braces when an `if` contains only one statement:
  `if(condition) return false`
* Use curly braces for multi-line logic.
* Put `else` on a new line:

  ```
  if(condition) {
      ...
  }
  else {
      ...
  }
  ```
* Apply the same style to `try-catch`:

  ```
  try {
      ...
  }
  catch(error) {
      ...
  }
  ```

## Imports

* Group imports logically.
* Keep imports from the same category together.
* Within each import group, order imports from shortest to longest based on the text length of the import statement.
* Preserve the grouped-import structure when adding new imports.

## Constants and Variables

* Place constants whose names are entirely uppercase at the very top of the file, immediately below imports.
* Keep normal `const` declarations grouped together.
* Do not insert unnecessary blank lines between normal `const` declarations.
* Separate the uppercase constant section from the normal constant section with a blank line.
* Keep related constants together.

## Objects and Dictionaries

* Format dictionary/object constants with each key-value pair on its own line.
* Do not compress multiple key-value pairs onto one line.
* Example:

  ```
  const trainingEndDateModes = {
      global: "1",
      none: "2",
      custom: "3"
  };
  ```

## Functions

* Add a comment to every function describing what it does, what the parameters are, and what it returns, and an example of what it returns, except if the function is a React component. These comments must exists within the function itself, at the very top right after the function definition.
* Use `const` for functions defined inside other functions. Do not use `function` for nested functions.
* Prefer function declarations for top-level utility functions and components when consistent with the existing file.
* Keep related functions grouped together.
* Separate `useEffect`, callbacks, and standard functions from surrounding code with blank lines.
* Group function calls together and visually separate groups of function calls from other logic.
* Do not unnecessarily create anonymous helper functions when an existing function can be reused.
* Always use camel-case when defining and naming functions.

## React Components

* Define React components as functions rather than inline exported functions.
* Do not use `export default function Component()`.
* Export the component at the bottom of the file:
  `export default Home`
* For large React pages, divide major page sections into separate rendering functions.
* Rendering functions must begin with `render`.
* Call the rendering functions from the main component rather than placing all major page sections directly inside the main return.
* Keep each rendering function responsible for one logical page section.

## JSX

* Put every prop on its own line when an element has multiple props.
* Keep JSX attributes vertically aligned with the element indentation.
* All `<button>` and `<input>` elements must have a `title` prop.
* Add a `title` prop to other interactive elements where appropriate.
* Use explicit, meaningful `title` values.
* For mapped elements, prefer keys such as:
  `key={`${value}-${index}`}`
  when appropriate.
* Preserve stable unique identifiers when one is available; only use an index as part of the key when appropriate.

## Tailwind CSS

* Use explicit Tailwind colour values/classes rather than project-specific semantic colour classes when defining colours.
* Prefer classes such as:
  `bg-slate-500`
  `border-red-500`
  `text-emerald-800`
* Do not replace explicit colours with custom semantic classes such as `bg-secondary` unless the project specifically requires it.
* Preserve existing explicit colour conventions.

## React Hooks and Callbacks

* Separate `useEffect` blocks, callbacks, and standard functions with blank lines.
* Keep function calls grouped together rather than scattering related calls among unrelated statements.
* When several state updates or function calls form one logical operation, keep them together as a visually distinct block.

## Error Handling

* In React scripts, use `error.message` when logging an error rather than logging the complete `error` object where the message is intended.
* Example:
  `console.error("Progress stream error:", error.message);`
* Follow the existing project's error-handling behaviour rather than introducing unrelated error-handling patterns.

## Formatting

* Preserve intentional blank lines that separate logical sections.
* Use blank lines between logical groups of code.
* Do not add blank lines between ordinary grouped `const` declarations.
* Keep object properties, JSX props, and function arguments readable rather than unnecessarily compressing them onto one line.
* Follow the formatting patterns already established in the file being modified.

## Before Finishing

* Review all modified code against these instructions.
* Ensure imports remain correctly grouped and ordered.
* Ensure uppercase constants remain at the top.
* Ensure normal constants remain grouped.
* Ensure nested functions use `const`.
* Ensure JSX props follow the one-prop-per-line convention.
* Ensure buttons and inputs have `title` props.
* Ensure `if`, `else`, `try`, and `catch` follow the required brace and spacing style.
* Ensure React page sections use `render...` functions where appropriate.
* Ensure exports remain at the bottom of the file.
* Do not make unrelated formatting changes.