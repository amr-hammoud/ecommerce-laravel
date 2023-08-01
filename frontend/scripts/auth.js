const base_url = "http://127.0.0.1:8000/api/";

const login_email_input = document.getElementById("login-email");
const login_email_error = document.getElementById("login-email-error");
const login_password_input = document.getElementById("login-password");
const login_password_error = document.getElementById("login-password-error");
const stay_logged_in = document.getElementById("stay-logged-in");
const login_button = document.getElementById("login-button");

login_button.addEventListener("click", async () => {
	const email = login_email_input.value;
	const password = login_password_input.value;
    let email_valid = false
    let password_valid = false

    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(email != "" && email_regex.test(email)){
        email_valid = true
        login_email_error.innerText = '';
    }else{
        login_email_error.innerText = 'Invalid email format';
    }


    if(password != ""){
        password_valid = true
        login_password_error.innerText = '';
    }else{
        login_password_error.innerText = 'Password Required';
    }

    if(email_valid && password_valid){
        localStorage.setItem("stay_logged_in", stay_logged_in.checked);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const user = await login(formData);
        if(user.data.authorization.token != null){
            localStorage.setItem("user_id",user.data.user.id);
            localStorage.setItem("token",user.data.authorization.token);

            if(user.data.user.type === "user"){
                window.location.href = "index.html"
            } else if(user.data.user.type === "admin"){
                window.location.href = "admin.html"
            }

        }
        else{
            console.log("login Failed");
        }
    }
});

async function login(data) {
	try {
		const url = base_url + "user/login";
		return await axios.post(url, data);
	} catch (error) {
		console.log("Error from login " + error);
	}
}
