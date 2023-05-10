0.4: New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    note over browser: When the button on the form is clicked,<br/> browser will send the user input to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note over server: Server responds with HTTP status code 302, <br/> it is a URL redirect with which Server asks Browser <br/>to do a new HTTP GET.
    server-->>browser: redirect link: https://studies.cs.helsinki.fi/exampleapp/notes
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML document: notes.html

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: CSS file: main.css

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser:  JavaSript file: main.js
    note over browser: Browser starts executing the JavaScript code <br/> that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: JSON file: data.json
    note over browser: Browser executes the callback <br/> function that renders the notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico
    server-->>browser: favicon.ico
```
