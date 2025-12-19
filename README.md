
 # Journaly Integration Tests
  

## Overview

  ### Description
Automated integration tests writted for the Journaly mobile app. A highly customizable journaling app.

This was created as my capstone/final project as part of my time at MTECH (Mountainland Technical College).

https://github.com/user-attachments/assets/275dedd7-03e1-46b5-bad4-9710810fa257




## Test Plan


  
![Test Plan Diagram](https://github.com/user-attachments/assets/89f3963a-0108-4b9f-aba9-c0ad11eaf70b)


 ## Example Test Case

### Title

CRUD Test Moods

### Description

CRUD testing for moods when editing the journal. This will include creating, updating, and deleting activities, while reading/asserting between each.

### Preconditions

+ The Journaly app installed on a phone/emulator
+ Navigate to the journal entry page

### Test Steps

1. Click the “Edit Mode” button
2. Click “Add” under the overall moods section
3. Enter a name and emoji for the new mood
4. Click Save
5. Click “Edit Mode”
6. Click on the mood that was just made
7. Change the name and emoji
8. Click “Save”
9. Click “Edit Mode”
10. Click on the mood that was made
11. Click the “Delete” button
12. Click delete on the popup
13. Click Save

### Expected Test Results

4. New mood should appear
8. Moods name, and emoji should change to what you selected
11. Popup should come up confirming deletion
13. After saving, your created mood should no longer show up
