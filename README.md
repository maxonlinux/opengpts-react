### To Do:

- [x] Basic interface with prompt field
- [x] Interactive chat-like UI
- [x] Real-time response from event stream
- [ ] Proper code highlighting
- [ ] Error handling

### How to Use:

1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) (Node.js version 18.18.0 and npm version 10.3.0 or higher are recommended).

2. Clone the repository:
    ```
    git clone https://github.com/maxonlinux/opengpts-react.git
    ```

3. Navigate to the cloned repository directory:
    ```
    cd <repository_directory>
    ```

4. Install all dependencies:
    ```
    npm install
    ```

5. Generate all assets for PWA (Progressive Web App), such as Apple splash screens:
    ```
    npx pwa-assets-generator ./logo.svg
    ```

6. Start the project in development mode:
    ```
    npm run dev
    ```

    Or, to preview the app in production mode, first build the project:
    ```
    npm run build
    ```

    Then, start the preview server:
    ```
    npm run preview
    ```

    To deploy the app, you will need to use a web server such as Nginx. Alternatively, you can run it locally by opening `index.html` in a web browser.

