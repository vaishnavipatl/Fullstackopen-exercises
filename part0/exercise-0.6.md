sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created (New note saved)
    deactivate server

    Note right of browser: The browser updates the UI without reloading

    browser->>browser: JavaScript updates the notes array
    browser->>browser: The new note appears immediately on the page
