export class register {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Enter your full name');
    this.emailInput = page.getByPlaceholder('yourname@gmail.com');
    this.passInput = page.locator('input[type="password"]');
    this.phoneInput = page.getByRole('textbox', {name : "Phone Number"});
    this.nidInput = page.getByRole('textbox', {name : "National ID (NID)"});
    this.roleDropdown = page.getByRole('combobox');


    this.buttonlogin = page.getByRole('button', { name: 'Create Account →' });
  }

  async goto() {
    await this.page.goto("https://dmoneyportal.roadtocareer.net/register");
  }

async register(name, email, password, phone, nid, role) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.phoneInput.fill(phone);
    await this.nidInput.fill(nid);

    await this.roleDropdown.click();
    await this.page.getByRole('option', { name: role }).click();

    await this.createAccountButton.click();
  }
}