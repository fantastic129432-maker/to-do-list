# Advanced To-Do List Web Application
## 1. Project Overview

This is an advanced, feature-rich To-Do List web application.The application goes beyond basic task management, incorporating functionalities such as task editing, prioritization, and filtering to provide a comprehensive and user-friendly experience.

The project demonstrates core web development skills (HTML5, CSS3, JavaScript ES6+) and applies key software configuration management practices, including version control with Git and GitHub. All tasks are persistently stored in the browser's `localStorage`, ensuring data is saved across sessions.

## 2. Key Features

This application includes a wide range of functionalities to enhance productivity:

*   **📝 Add and Manage Tasks:** Easily create, delete, and mark tasks as complete with a simple and intuitive interface.
*   **✏️ In-Place Task Editing:** Double-click on any task's text to edit it directly without needing to open a separate dialog.
*   **🚦 Task Prioritization:** Assign a priority level (**High**, **Medium**, or **Low**) to each task upon creation. Visual color-coded badges make it easy to identify urgent tasks.
*   **🔍 Task Filtering:** Filter the task list to view **All**, **Pending**, or **Completed** tasks, helping you focus on what matters most.
*   **📊 Pending Task Counter:** A live counter displays the number of tasks that are still pending, providing a quick overview of the remaining workload.
*   **✨ Clear Completed Tasks:** A dedicated button allows you to remove all completed tasks with a single click, keeping your list clean and organized.
*   **💾 Persistent Storage:** The application uses the browser's `localStorage` to automatically save all tasks, so your to-do list is always preserved.
*   **📱 Responsive Design:** The layout is fully responsive and adapts seamlessly to various screen sizes, from large desktops to mobile phones.
*   **🎬 Smooth Animations:** Subtle CSS animations for adding and deleting tasks provide a polished and modern user experience.

## 3. Technologies Used

*   **HTML5:** For the semantic structure of the web page.
*   **CSS3:** For advanced styling, including Flexbox, CSS Variables, and animations.
*   **JavaScript (ES6+):** For all dynamic functionalities, DOM manipulation, and `localStorage` management.
*   **Git & GitHub:** For version control and as the central code repository.

## 4. Project Structure

The project follows a standard static web application structure:/
├── index.html # The main HTML file for the application structure
├── style.css # The CSS file for all styling and responsive design
├── script.js # The JavaScript file containing all core logic
└── README.md # This documentation file
## 5. Getting Started (Local Setup)

To run this project on your local machine, follow these simple steps:

1.  **Clone the repository:**
    You can clone the repository using either SSH or HTTPS.

    ```bash
    # Using SSH
    git clone git@github.com:YourUsername/Your-Repository-Name.git

    # Using HTTPS
    git clone https://github.com/YourUsername/Your-Repository-Name.git
    ```
    *(Note: Replace `YourUsername/Your-Repository-Name.git` with the actual repository URL.)*

2.  **Navigate to the project directory:**
    ```bash
    cd Your-Repository-Name
    ```

3.  **Open `index.html`:**
    Simply open the `index.html` file in your favorite web browser (e.g., Google Chrome, Firefox). No web server is required as this is a fully client-side application.

## 6. Configuration Management Practices

*   **Version Control:** All source code changes are tracked using Git. The GitHub repository serves as the single source of truth.
*   **Commit History:** Commit messages are written to be clear and descriptive, explaining the purpose of each change (e.g., `Feat: Add task filtering`, `Fix: Correct local storage bug`, `Style: Improve responsive layout`).
*   **Branching:** A feature-branching workflow was simulated for development, where new features are developed in separate branches before being merged into the `main` branch to ensure stability.
*   **Repository Management:** The use of SSH for secure communication with the remote repository demonstrates professional best practices.