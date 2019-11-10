class GitHub {
  constructor() {
    this.client_id = 'ENTER OAUTH CLIENT ID FROM GITHUB HERE';
    this.client_secret = 'ENTER OAUTH CLIENT SECRET FROM GITHUB HERE';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  // We have two get requests to GitHub in this function
  async getUser(user) {
    // First is the user info
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    // Second, the user's repositories
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    // Get JSON from promise
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    // Returns both user info and repos
    return {
      profile,
      repos
    }
  }
}