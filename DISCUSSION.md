## Changes
- Fixed console errors with keys, hydration, etc
- Updated to use Postgres database and ran drizzle migrations
- Styled table with tailwind and custom css
- Updated search to be case-insensitive and to check years of experience greater than or equal to search term
- Added loading message on page load
- Added message when no advocates found
- Added number of results
- Modified layout slightly and styled input and button
- Improved search for specialties
- Minor code cleanup, including destructuring objects for easier readability
- Combined First name, Last name, and specialty into a single, more readable column
- Added formatting for phone number for improved readability
- Added search functionality for newly formatted columns
- Refactored advocate row into separate component for improved code readability and reuse
- Added rudimentary error handling


## Things I would add with more time:
- Add pagination for ease of use (ideally paging/filtering would be implemented on the backend and passed in by the frontend to improve performance for large data sets)
- It would be more user friendly to have a better filtering with separate search options for specialties, years of experience, city, and degree that may be preferable for getting better results with large data sets.
- It would be good to have column sorting for ease of use
- It would be a good idea to find a better way to style the specialties, as it is a longer list and not particularly user-friendly. There isn't that much space in the current format, but a tag list might be preferable.
- It would be cool to embolden the search term in the search results to indicate what matched for each record.
- Improve the loading message to a spinning svg in addition to message to make it seem more interactive/responsive
- Add unit tests for frontend and backend functionality
- Add dark mode color theme
- Setup responsive columns
