// Init github.js
const github = new GitHub();
const ui = new UI();

// Get the search input field
const searchUser = document.getElementById('search-input');

// For every keypress, we search for a user
searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  if(userText !== '') {
    // If field isn't empty, make HTTP call and format response
    github.getUser(userText)
      .then(data => {
        if(data.profile.message === 'Not Found') {
          // If user is not found, create alert message
          ui.showAlert(userText, 'danger');

        } else {
          // We dont want to display 'null' in the front end.
          // So, if some JSON key has a null value, we assign 
          // it with a string value depending on the key.
          
          if(data.profile.name === null) {
            data.profile.name = '';
          }

          if(data.profile.bio === null) {
            data.profile.bio = '';
          }

          if(data.profile.company === null) {
            data.profile.company = "None";
          }

          if(data.profile.blog === '') {
            data.profile.blog = 'None';
          }

          if(data.profile.email === null) {
            data.profile.email = 'None';
          }
          
          ui.showProfile(data.profile, data.repos);
        }
      }
    );  
    
  } else {
    // Clear the created UI if field is emptied
    ui.clearProfile();
  }
})