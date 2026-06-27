export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Enter email or phone number');
    this.passInput = page.locator('input[type="password"]');
    this.buttonlogin = page.getByRole('button', { name: 'Login →' });
  }

  async goto() {
    await this.page.goto("https://dmoneyportal.roadtocareer.net/login");
  }
  
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.buttonlogin.click();
  }
}