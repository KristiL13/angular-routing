// Päris appis see võiks suhelda mingi serveriga ja lasta meil sisse
// ja välja logida ja tsekata meie hetke autentimise olekut.
// Siin on see lihtsalt fake service.
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800); // Teeskleme, et see siin võtab aega.
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
