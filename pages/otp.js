export class otp{
    constructur(page) {
        this.page = page;
        this.otpInput = page.getByRole('textbox', {name: 'Enter 4-Digit OTP *'});
    }
    async goto() {
    await this.page.goto("https://dmoneyportal.roadtocareer.net/login");
  }
    async otp(codeOtp){
        await this.otpInput(codeOtp);
    }
}