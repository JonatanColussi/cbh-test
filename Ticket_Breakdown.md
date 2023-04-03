# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Add the 'external_id' column in the database and entities
   * complexity: low
   * story points: 2
   * steps:
     - add the external_id field on the agents table
     - the field should be a varchar(255) nullable
     - change the entity to add the field
     - generate the database migration
2. Modify the POST route to accepts new field (external_id)
   * complexity: low
   * story points: 2
   * steps:
     - add the new field on the validation schema, like a optional string
     - modify the agents creation script for include the new field
     - write tests that ensure this works properly
3. Modify the PATCH route to accepts new field (external_id)
   * complexity: low
   * story points: 2
   * steps:
     - add the new field on the validation schema, like a optional string
     - modify the update agents script for include the new field
     - write tests that ensure this works properly
4. Fix the `generateReport` function to replace from id to external_id
   * complexity: low
   * story points: 3
   * steps:
     - update the `getShiftsByFacilit` to get a new field and join to another agents metadata
     - in the `generateReport` check if the `external_id` fields is filled, use it, else use the original id
     - write tests that ensure this works properly
