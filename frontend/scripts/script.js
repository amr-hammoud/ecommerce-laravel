const account_button = document.getElementById("account-button");
const account_tab = document.getElementById("account-tab");


account_button.addEventListener("click", () => {
    account_tab.classList.toggle("show")
});
