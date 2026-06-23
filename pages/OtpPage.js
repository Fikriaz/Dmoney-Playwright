export class OtpPage{
     constructor(page) {
        this.page = page;
        this.otpInput = page.getByRole('textbox', {name: 'Enter 4-Digit OTP'});
        this.buttonlogin = page.getByRole('button', { name: 'Verify OTP →' });

    }
    async goto() {
    await this.page.goto("https://dmoneyportal.roadtocareer.net/login");
  }
    async Submitotp(codeOtp){
        await this.otpInput.fill(codeOtp);
        await this.buttonlogin.click();

    }
}