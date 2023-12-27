# Student Enrollment Form with JsonPowerDB Integration

## Description 
This is a web-based HTML form designed for student enrollment, utilizing JsonPowerDB as the underlying database for CRUD operations.

# Benefits of using JsonPowerDB
* Simplicity: Offers a straightforward, real-time database experience.
* JSON Format: Facilitates the simplest way to retrieve data in JSON format.
* Backend Efficiency: Eliminates the need for extensive backend code for database operations.
* Schema-Free: Does not require the definition of a schema.
* Querying Simplicity: Database querying is easy, without the need for knowledge of SQL commands.

# TECH STACK USED
* HTML
* CSS
* JAVASCRIPT 
* JsonPowerDB ( As Database)


# Illustrations:
*UPDATE: When a student's roll number is already present in the database, the student information is fetched and filled in the respective fields, enabling the user to UPDATE student information.
*SAVE: If the student's roll number is not present in the database, other fields are enabled, and the user can fill them to save the information to the database.
*RESET: Clears all form fields, disabling all fields except the first one (roll-no) until a valid roll number is entered.

# HOW TO USE

* **Initially**

We need to enter a roll number 
If roll number is not valid 
If roll number is valid and that roll number is existnig in database
* **Fetching student data using roll number**
  If student already present in database, then all field filled with that student information
   otherwise, other fields are enabled after user input roll number
* **Updation of student details**
  In order to update student details input roll number, and then we can update the student data
* **Adding new student data**
  Enter new roll number and then all other fields are enabled and then after filling student information we can save this data into database only if input is valid
    
  
  # Installation
  
  Make a folder in your system and clone the project using git bash then open the project in Visual Studio Code or any IDE you prefer.
  ##### Clone the project 
  ```
  git clone https://github.com/ktrskr/SCHOOL-DB
  ```
  
  # Sources
  * Introduction to JsonPowerDB - V2.0 course  on https://careers.login2explore.com/
  * [Bootstrap]
  
