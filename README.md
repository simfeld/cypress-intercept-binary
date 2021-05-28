# Reproduction repository for Cypress intercept binary issue

Prerequisites: `node` and `yarn` installed.

To run the tests:

1. Install dependencies
  ```sh
  yarn install
  ```

2. Start the backend server
  ```sh
  yarn server:start
  ```

3. In a second shell, start the application
  ```sh
  yarn app:start
  ```

4. Run the test
  ```sh
  yarn cypress:start
  ```
