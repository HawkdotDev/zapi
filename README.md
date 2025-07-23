# zapi

**zapi** is a lightweight, privacy-focused Firefox extension for testing REST APIs directly from your browser.  
It provides a fast and unobtrusive way to send HTTP requests, inspect responses, and debug endpoints — all from a minimal popup interface.

Designed for developers, QA engineers, and anyone working with APIs who values speed, simplicity, and data privacy.

## Features

- **Instant API Testing**  
  Send `GET`, `POST`, `PUT`, and `DELETE` requests without leaving your current tab.

- **Custom Headers & Body**  
  Compose raw JSON payloads or use form data and URL-encoded inputs.

- **Structured Response Viewer**  
  Inspect status codes, headers, and formatted response bodies in a clean UI.

- **Popup Interface**  
  Access the tool directly from the Firefox toolbar — no new tab or window required.

- **Light/Dark Themes**  
  Choose a comfortable visual mode that fits your environment.

- **Privacy-First**  
  All data is processed locally in your browser. No external services are used.

## Why zapi

Traditional tools like Postman and Insomnia are powerful but often excessive for quick tasks.  
**zapi** provides a streamlined alternative:

- No setup or login
- No external dependencies
- No cluttered UI or context switching

Whether you're testing a development server, inspecting production APIs, or quickly validating backend behavior — zapi is built to accelerate your workflow, not interrupt it.

## Usage

Once installed, click the **zapi** icon in your Firefox toolbar to open the popup.

From here, you can:

- Select HTTP method
- Enter request URL
- Add custom headers
- Write request body (JSON or form data)
- View formatted response immediately after sending

All actions are processed in the current browser context — no network activity is tracked or persisted.

## Development

To contribute or modify zapi:

```bash
git clone https://github.com/yourusername/zapi.git
cd zapi
````

Make changes to the codebase using your preferred stack. The project follows standard WebExtension conventions and uses vanilla JavaScript.

> For rapid testing, reload the extension via `about:debugging`.

## Roadmap

The following features are planned:

* Local request history and favorites
* Import/export of saved requests
* Persistent sessions across tabs
* GraphQL and WebSocket support
* Keyboard shortcuts and command palette

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Contact

For questions, suggestions, or bug reports, please open an issue on GitHub.
If you're using zapi internally or in a project and would like to collaborate, feel free to reach out.

---

## Disclaimer

**zapi** was built to make API testing faster, simpler, and more private. The extension is designed for personal and professional use. 
Use responsibly when interacting with protected or private APIs.
