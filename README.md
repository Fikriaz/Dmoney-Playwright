# DMoney QA Automation Testing

End-to-End Test Automation Project using **Playwright**, **JavaScript**, and **Gmail API**.

This project automates critical user flows in the DMoney web application, including user registration, login with OTP verification, profile management, and password management.

The framework is built using the **Page Object Model (POM)** design pattern to improve maintainability, scalability, and reusability.

---

## 📌 Features Covered

### Register

#### Positive Scenario

* Register account with valid data

#### Negative Scenarios

* Register using an existing email
* Register with empty required fields
* Register with invalid phone number
* Register with invalid NID
* Register with invalid name length

---

### Login

#### Positive Scenario

* Login with valid credentials
* Verify OTP successfully
* Redirect user to dashboard

#### Negative Scenarios

* Invalid email/password
* Invalid OTP
* Empty credentials

---

### Edit Profile

#### Positive Scenario

* Update profile using valid information

#### Negative Scenarios

* Invalid name length
* Invalid email format
* Invalid phone number
* Invalid NID
* Empty required fields

---

### Change Password

#### Positive Scenario

* Successfully change password

#### Negative Scenarios

* Incorrect current password
* Password confirmation mismatch
* Empty password field
* Invalid password format

---

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Gmail API
* Playwright Test Runner
* Page Object Model (POM)

---

## Project Structure

```text
.
├── pages
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProfilePage.js
│   └── ChangePasswordPage.js
│
├── tests
│   ├── login
│   ├── register
│   ├── profile
│   └── change-password
│
├── gmail.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/dmoney-playwright-automation.git
cd dmoney-playwright-automation
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## Gmail API Setup (OTP Automation)

This project retrieves OTP codes automatically from Gmail using Gmail API.

### Step 1 - Create Google Cloud Project

1. Open Google Cloud Console
2. Create a new project
3. Enable Gmail API

### Step 2 - Configure OAuth Consent Screen

1. Open OAuth Consent Screen
2. Select External
3. Complete the required information
4. Save configuration

### Step 3 - Create OAuth Credentials

1. Open Credentials
2. Click Create Credentials
3. Select OAuth Client ID
4. Application Type: Desktop Application
5. Download credentials JSON file

### Step 4 - Generate Token

Place the downloaded credentials file in the project root directory.

Run:

```bash
node gmail-auth.js
```

A browser window will open for Gmail authorization.

After successful authorization, a token file will be generated automatically.

### Step 5 - Verify Gmail Connection

Run:

```bash
node gmail.js
```

The script should return the latest OTP email.

---

## Environment Variables

Create a `.env` file in the root directory.

```env
BASE_URL=https://dmoneyportal.roadtocareer.net

EMAIL=your_email@gmail.com
PASSWORD=your_password

CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_redirect_uri
```

---

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/profile/profile.spec.js
```

### Run in Headed Mode

```bash
npx playwright test --headed
```

### Open Playwright UI

```bash
npx playwright test --ui
```

---

## Generate Test Report

```bash
npx playwright show-report
```

---

## Design Pattern

This project follows the **Page Object Model (POM)** approach.

Example:

```javascript
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login(email, password);
```

Benefits:

* Reusable locators
* Better maintainability
* Cleaner test scripts
* Easier debugging
* Scalable automation framework

---

## Test Coverage

| Module          | Positive | Negative |
| --------------- | -------- | -------- |
| Register        | ✅        | ✅        |
| Login           | ✅        | ✅        |
| Edit Profile    | ✅        | ✅        |
| Change Password | ✅        | ✅        |

---

## Author

**Fikri**

QA Automation Portfolio Project built using Playwright and Gmail API.
