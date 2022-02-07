Apologies for the long list, but React, nextjs area is new to me so please bare with me.

1. Edit (save) button did not make much sense to be added as the input text field could have been used to create and update after user has finished typing (MouseOut,MouseIn events) So functionality is partly missing as did not have enough time to store the key/value pair correctly to existing `LOCAL_KEY` object.

2. Parsing of DOM elements one before the other causes not to render values on page (causing undefined errors) but overcame this by using the order matters. Because browsers parse HTML documents from top to bottom. Elements are added to the DOM and scripts are (generally) executed as they're encountered. Generally, scripts can't find elements which appear later in the markup because those elements have yet to be added to the DOM.

3. UseDarkMode hook could have been used to solve both - MediaQueries and system applied theme so user wouldn't need to change manually. And use the mode selected to store it in LocalStorage to set and retrieve it so mode was persistent even after page refresh.

4. Due to time limitation, Unit & Integration testing were missed. But were manually tested using various inputs, methods & corner case testing.

5. Completed tasks could have used a bit more with styling such as - Strike through line for the text entered/added. (Improvement task)

6. Draggable tasks - Additional feature could have also been added to move, re-arrange tasks. (Improvement feature task)

7. The multiline and character limits are set to 256 at maximum. Tasks list were generally not designed to go beyond a certain limit but it definitely makes sense to give option to user to select between the type - Notes(to write paragraphs) or List with checkboxes(make todo lists).

8. The task information counter below could have been replaced with `Title`, `Description` & `TimeStamp` as per `sample.json` received. But again due to time limitation this was not achieved.

9. A simple CRUD app could have been created using free Firebase/AWS database. But due to lack of time it was not achieved. Axios library could have been used to communicate http requests directly to the DB server.

10. React & Nextjs framework are completely new to me but I see the use of fast, scalable & simple approach. Testing frameworks such as Jest, Mocha & Jasmine could have been used to test the application so time was a factor again.
It certainly doesn't come with all list of pros only, there are some cons too, such as it requires more setup which can result in decision fatigue & its a library rather than a full framework. It trades being concise for being explicit. For example, two-way binding isn't very common, so a change handler is required to keep things in sync. This results in more control, but also requires more code. But major advantage of choosing React over others are simply the fact that it has an easier learning curve, so the ramp-up time is much shorter & better mobile cross-platform framework.

11. Deploying to Firebase/AWS hosting was not as easy as I would have hoped, it came with some understanding of how they work specially how Firebase CLI works. So sometime was spent researching & figuring out the use of deploying nextjs app statically. But I can see the benefits of deploying on Netlify makes it so much more easier.

12. SASS & Redux were not used in this application as I've only started to read about them and If I could, I would request for more time to create the exact design(3) from the samples given. But few Bonus(s) would have been if more time was available.

13. Retrieve and store data for Edit (only) is not working correctly as intended but the best way would have been is to structure the code this way:
a) On first render, fetch the stored tasks from localStorage and put it in a variable.
b) On submit, simply append the new task to that variable.
c) At an appropriate time (unmount, or periodically), persist the whole object to localStorage again.
d) Two methods could have been to modify the data - 
  (1) Push value to existing Array or 
  (2) Set a new Array with an event. (Clear storage when inserting new)
