# 📄 job application kanban board

a kanban-style job application tracker built with raw html, css, and javascript.

![full board screenshot](<j a k b.png>)

i built this project to understand how to work without frameworks. instead of using react or tailwind, everything is handled manually, including dom manipulation, state management, and styling.

### ✨ features

this app lets you create, update, and delete job applications, and move them between columns using drag-and-drop. each application is saved in localstorage so your data persists on refresh, and everything is managed through a simple modal form. applications are organized across four stages: `applied`, `in progress`, `rejected`, and `offer`.

### 📚 tech stack

- hypertext markup language
- cascading style sheets
- javascript

### ❔how it works

applications are stored in localstorage and loaded on page refresh. each application has an `id`, `role`, `company`, `date`, and `status`.

rendering is handled manually by rebuilding the dom when changes occur, and drag-and-drop updates both the ui and underlying data.

### 💡 what i learned

the biggest thing i took away from this project is that i finally wrote raw javascript to update the dom. not having to mess with the dom is one of react's main benefits, but that level of abstraction always felt like a gap in my understanding, especially when people would talk about "web dev fundamentals".

on top of that, i always wanted to make something with drag-and-drop functionality, so i'm quite happy with how that turned out.
