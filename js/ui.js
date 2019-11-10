class UI {
  constructor() {
    this.profile = document.getElementById('profile');
    this.repos
  }

  // Show user info and UI in a new card
  showProfile(user, repos) {
    const repoList = this.getRepos(repos);
    
    this.profile.innerHTML = `
    <div class="container">
        <div class="card info-card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-one-quarter">
                <div class="card info-card">
                  <div class="card-image">
                    <figure class="image is-square">
                      <img src="${user.avatar_url}">
                    </figure>
                  </div>
                  <div class="card-content">
                    <p class="title is-4">${user.name}</p>
                    <p class="subtitle has-text-grey-dark">${user.login}</p>
                    <div class="content">
                      <p>${user.bio}</p>
                      <p><span class="icon has-text-info"><i class="fas fa-map-marker-alt"></i></span>${user.location}</p>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <a href="${user.html_url}" target="_blank" class="card-footer-item">View User Profile</a>
                  </footer>
                </div>
              </div>
              <div class="column">
                <div class="tags are-small">
                  <span class="tag is-link">Public repos: ${user.public_repos}</span>
                  <span class="tag is-info">Public gists: ${user.public_gists}</span>
                  <span class="tag is-link is-light">Followers: ${user.followers}</span>
                  <span class="tag is-info is-light">Following: ${user.following}</span>
                </div>
                <nav class="panel">
                  <p class="panel-block">
                    <span class="panel-icon has-text-info">
                      <i class="fas fa-building"></i>
                    </span>
                    Company: ${user.company}
                  </p>
                  <p class="panel-block is-spaced">
                    <span class="panel-icon has-text-info">
                      <i class="fas fa-globe-asia"></i>
                    </span>
                    Website/Blog: ${user.blog}
                  </p>
                  <p class="panel-block">
                    <span class="panel-icon has-text-info">
                      <i class="far fa-envelope"></i>
                    </span>
                    Email: ${user.email}
                  </p>
                </nav>
                <p class="title is-4">Latest Repos</p>
                <div id="repos">
                  ${repoList.outerHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }

  // This function returns an HTML object
  getRepos(reposList) {
    let output = '';

    if (reposList.length === 0) {
      // If user has no public repos, display text instead
      const text = document.createElement('div');
      text.className = 'title.is-6';
      text.innerHTML = '<div class="title is-6">No public repositories</div>'
      return text;

    } else {
      //  Creates a panel to display public repos in
      const panel = document.createElement('nav');
      panel.className = 'panel';

      reposList.forEach(repo => {
        output += `
        <a class="panel-block" href="${repo.html_url}" target="_blank">
          <div class="tile">
            <span class="icon">
              <i class="fas fa-code-branch"></i>
            </span>
            ${repo.name}
          </div>
          <div class="tile">
            <div class="tags are-small">
              <span class="tag is-rounded"><i class="fas fa-eye"></i>&nbsp;Watchers: ${repo.watchers_count}</span>
              <span class="tag is-rounded"><i class="fas fa-star"></i>&nbsp;Stars: ${repo.stargazers_count}</span>
              <span class="tag is-rounded"><i class="fas fa-code-branch"></i>&nbsp;Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </a>`
      });

      panel.innerHTML = output;
      return panel;
    }
  }

  // Clears entire profile card
  clearProfile() {
    this.profile.innerHTML = '';
  }

  // Creates an alert message if user does not exist
  showAlert(userName, className) {
    // If an existing alert message exists, clear it out
    this.clearAlert();

    const article = document.createElement('article');
    article.className = `message is-${className}`;
    article.innerHTML = `
        <div class="message-body">
          User <strong>${userName}</strong> does not exist.
        </div>
    `;

    const titleParent = document.querySelector('.card-content.search-card');
    const title = document.querySelector('.title.is-size-1');

    titleParent.insertBefore(article, title);

    // We also want to clear our alert message after 3 seconds  
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.message');

    if(currentAlert) {
      currentAlert.remove();
    }
  }
}