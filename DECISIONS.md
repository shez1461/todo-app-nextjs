1. Edit button was removed because it adds another layer of complexity to the user to enter value, click on edit icon. So instead, the plan was to implement - when user only having to input text and when user pressing return key or clicking elsewhere (setTimeOut & mouseOut event) saves the input value to LocalStorage (where as it would have typically send a PUT/POST to DB Server).

2. Buttons were removed and replaced with icons with tooltip to make visually more appealing and leaving user more space with various screens & devices.

3. Material UI (UI library) - was used because it offers variety of components which can be used to build simple web apps more flexibly & consistently. Googles' simple-to-use interface that reflects the vast wealth of knowledge of the design team.

4. DarkMode & LocalStorage hooks were attempted to showcase the use of hooks but unforunately they were not used in this demo. 

5. If time permitted, I would change the input field where you add your tasks to something more flexible and having to scroll up to type in again. This would certainly annoy users when the list gets longer. So it would definitely be an improvement task.

6. Alert Tally information colour cards were used to demonstrate & show the user the sum of completed, pending & total tasks added.

7. Clear completed - was implemented to make use of selected or completed tasks to be deleted (upon checked only). At the time, I believed this was a necessary feature if you want to clear completed tasks from the list.

8. Clear All - was implemented to make use of deleting all tasks with or without completion (simply erases all). Reason was to give option to use to clear all.
Further improvments could have been made such as - a Confirmation/diaglog box to confirm with user if they want to delete all tasks? Yes/No/Cancel.

9. LocalStorage was used to demonstrate the use of state management, theme & tasks to be persisted when refreshed or close browser. Otherwise DB server would have been used in real scenario if time permitted.

10. Sample.json - Title, Description & Date were not used to retrieve and store data due to time limitation but otherwise it could have been used as `import json from 'data/sample.json'` to retrieve and store data on generated input fields to showcase the use of persisted calls (mock-up of DB server)
