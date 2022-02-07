Notes:
Assumptions are here intended to express the state which the application is currently at and what must be assumed to provide a meaningful result. 

Features that are working as intended:
1. Add, Clear Completed, Clear All icons.
2. Task list populating in non-chronological order(at the end) after adding.
3. Checkbox to show completed tasks
4. Display counters.
5. Added tasks are persisted even after page refresh or browser close.

Features that are `NOT` working / pending:
1. Edit task feature for persistent localStorage only.
2. DarkMode theme not stored so upon refresh it looses the state.

Generally, failing assumptions indicate that running tests are invalid but in this case due to the lack of time unit & integration tests were not conducted. The console logs, warnings are kept on for purpose to show functionality is working as intended & some features such as live demo link to server instance might be not available and some assumptions may not written here.
