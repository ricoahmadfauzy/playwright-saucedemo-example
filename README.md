# 🎭 Playwright Automation Testing

This project is an example of end-to-end automation testing using **Playwright** with **JavaScript**.  
Feel free to use it for practice and add any test cases you want.  
If you have any questions or need help, don’t hesitate to contact the author below. Cheers! 🍻

---

## 📌 Tech Stack

- **Node.js** (>= 18)
- **Playwright**
- **JavaScript**
- **Git**

---

## ⚙️ Prerequisites

Make sure the following are installed:

- **Node.js**
```bash
node -v
```

Recomended version v18.x or v20.x

- **npm**
```bash
npm -v
```

---

## 📥 Installation
### Clone the Repository
```bash
git clone https://github.com/ricoahmadfauzy/Kawan-lama-automation.git
cd playwright-project
```
### Install Dependencies
```bash
npm install
```

### Install Playwright
```bash
npx playwright install
```

### Environment Variables
Rename the `.env.example` file to `.env` and update the values as needed.


## ▶️ Running Tests
### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/login.spec.js
```

### Run a specific test case
```bash
npx playwright test -g "user fill valid login"
```

### Run tests in UI Mode
```bash
npx playwright test --ui
```

---

## 👤 Author
### [Rico Ahmad Fauzy](https://www.linkedin.com/in/ricoahmadfauzy/)