# To-Do List Application

This is a full-stack web application for managing a to-do list. It is built with React on the frontend, Node.js and Express on the backend, and uses a PostgreSQL database. The application allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks, sort and filter tasks, and view a chart of task statuses.

## Features

*   **CRUD Operations:**
    *   Create new tasks with a title, description, priority, status, and category.
    *   Read a list of all tasks.
    *   Update existing tasks.
    *   Delete tasks.
*   **Sorting:** Sort tasks by ID, title, description, priority, status, and category by clicking on the column headers in the task list.
*   **Filtering:** Filter tasks by title/description, priority, status and category.
*   **Pagination:** Navigate through the task list using pagination (10 tasks per page).
*   **Task Chart:** View a pie chart that displays the distribution of tasks by status.
*   **Authentication:** Basic authentication system to manage user's tasks (simulated with a test API).
*   **Error Handling:** Displays user-friendly error messages for common errors.

## Screenshots

| Feature         | Screenshot                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------ |
| Task List       | ![Task List Screenshot](./screenshots/task-list.png)     |
| Create Task     | ![Create Task Screenshot](./screenshots/create-task.png) |
| Update Task     | ![Update Task Screenshot](./screenshots/update-task.png) |
| Tasks Chart     | ![Tasks Chart Screenshot](./screenshots/tasks-chart.png) |

## User Guide

1. **Viewing the Task List:**
    *   Upon launching the application, you will be directed to the Task List page.
    *   The Task List displays all tasks in a table with sortable columns.
    *   Use the pagination controls at the bottom of the table to navigate through multiple pages of tasks.

2. **Creating a Task:**
    *   Click the "Create Task" link in the navigation bar.
    *   Fill in the form with the task's title, description, priority (High, Medium, Low), status (In Progress, Completed, Blocked), and category.
    *   Click the "Create" button to create the task.
    *   You will be redirected to the Task List, and the new task will appear in the table.

3. **Updating a Task:**
    *   In the Task List, click the "Update" link in the "Actions" column for the task you want to update.
    *   The Update Task form will be pre-populated with the task's current information.
    *   Modify the fields as needed.
    *   Click the "Update" button to save your changes.
    *   You will be redirected to the Task List.

4. **Deleting a Task:**
    *   In the Task List, click the "Delete" button in the "Actions" column for the task you want to delete.
    *   The task will be removed from the list.

5. **Filtering Tasks:**
    *   Use the filter fields above the Task List table to filter tasks by title/description, priority, status, and category.
    *   For text fields, type your search term and press Enter or click the "Apply" button in the filter dropdown.
    *   For priority and status, select the desired option from the dropdown menu.
    *   Click the "Clear" button in the filter dropdown to remove the filter.

6. **Sorting Tasks:**
    *   Click on any column header (except "Actions") to sort the tasks by that column in ascending order.
    *   Click again to sort in descending order.

7. **Viewing the Task Chart:**
    *   Click on the "Tasks Chart" link in the navigation bar (if available) or navigate to the chart's URL.
    *   The chart displays a pie chart showing the distribution of tasks by status.

8. **Authentication (if implemented):**
    *   Click the "Login" link in the navigation bar.
    *   Enter your email and password in the login form.
    *   Click the "Login" button.
    *   If login is successful, you will be redirected to the Task List.
    *   If login fails, an error message will be displayed.

## Technologies Used

*   **Frontend:**
    *   React
    *   ag-Grid Community Edition
    *   Highcharts
    *   axios
    *   react-router-dom
    *   bootstrap, react-bootstrap
*   **Backend:**
    *   Node.js
    *   Express
    *   CORS
*   **Database:**
    *   PostgreSQL

## Setup

**Prerequisites:**

*   Node.js (v18 or later recommended)
*   npm (v9 or later recommended)
*   PostgreSQL (v14 or later recommended)

**Steps:**

1. **Clone the repository:**

    
    git clone [your-repository-url]
    cd [your-repository-name]

2. **Install backend dependencies:**


    cd backend
    npm install


3. **Configure the database:**

    *   Create a PostgreSQL database named `todo`.
    *   Create a PostgreSQL user with a password (e.g., `postgres` with password `26012004`).
    *   Grant all privileges on the `todo` database to the newly created user.
    *   Update the database connection details in `backend/src/index.ts` if necessary (look for the `pool` object).

4. **Run database migrations (if any):**

    *   If there are any SQL scripts to create the database schema (e.g., `create_table.sql`), run them using a PostgreSQL client (like `psql`):


    psql -U postgres -d todo -a -f create_table.sql


5. **Install frontend dependencies:**

    cd ../frontend
    npm install


6. **Start the backend server:**


    cd ../backend
    npm run dev


7. **Start the frontend development server:**


    cd ../frontend
    npm start


    The application should open automatically in your browser at `http://localhost:3000`.

## Credits

*   Seifeddine BEN RHOUMA (100%) (https://github.com/26sneakysnake)

## License

No License