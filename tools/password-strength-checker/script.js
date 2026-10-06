const password = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const togglePassword = document.getElementById("togglePassword");

const requirements = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

password.addEventListener("input", function () {
    const value = password.value;

    const checks = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };

    let score = 0;

    for (const key in checks) {
        if (checks[key]) {
            score++;
            requirements[key].classList.add("valid");
            requirements[key].textContent =
                "✓ " + getRequirementText(key);
        } else {
            requirements[key].classList.remove("valid");
            requirements[key].textContent =
                "✗ " + getRequirementText(key);
        }
    }

    updateStrength(score, value.length);
});

function getRequirementText(key) {
    const text = {
        length: "At least 8 characters",
        uppercase: "Contains an uppercase letter",
        lowercase: "Contains a lowercase letter",
        number: "Contains a number",
        special: "Contains a special character"
    };

    return text[key];
}

function updateStrength(score, passwordLength) {
    if (passwordLength === 0) {
        strengthText.textContent = "Password strength";
        strengthFill.style.width = "0";
        strengthFill.style.background = "#999";
        return;
    }

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthFill.style.width = "33%";
        strengthFill.style.background = "#e53935";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthFill.style.width = "66%";
        strengthFill.style.background = "#f9a825";
    } else {
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#43a047";
    }
}

togglePassword.addEventListener("click", function () {
    const hidden = password.type === "password";

    password.type = hidden ? "text" : "password";
    togglePassword.textContent = hidden ? "Hide" : "Show";
});