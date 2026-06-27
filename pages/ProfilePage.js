export class ProfilePage{
    constructor(page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', {name : ('Full Name')});
    this.emailInput = page.locator('input[type="email"]');
    this.phoneInput = page.getByRole('textbox', {name : "Phone Number"});
    this.nidInput = page.getByRole('textbox', {name : "National ID (NID)"});
    this.buttonEdit = page.getByRole('button', { name: "Save Changes"});
  }

//   async goto() {
//     await this.page.goto("https://dmoneyportal.roadtocareer.net/register");
//   }
  
async editProfile(name, email, phone, nid) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.nidInput.fill(nid);
    await this.buttonEdit.click();
  }

}