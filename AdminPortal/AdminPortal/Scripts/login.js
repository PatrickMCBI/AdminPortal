(function () {

    let loginBtn = document.querySelector('.jsLoginBtn');

    if (loginBtn) {
        LoginAssignEventListeners(loginBtn);
    }

    function LoginAssignEventListeners(loginBtn) {

        loginBtn.addEventListener('click', function (e) {

            Login(e);
        });

        loginBtn.closest('form').addEventListener('input', function (e) {

            let type = e.target.getAttribute('type');
            let val = e.target.value;

            if (val) {
                switch (type) {
                    case 'email':
                        //check email if valid
                        if (RegExpDataValidationPatterns.EmailAddress.test(val)) {
                            e.target.removeAttribute('style');
                            loginBtn.removeAttribute('disabled');
                        }
                        else {
                            e.target.setAttribute('style', 'border: 1px solid red');
                            loginBtn.setAttribute('disabled', 'disabled');
                        }
                        break;

                    case 'password':
                        //check the length of password
                        if (RegExpDataValidationPatterns.IStillLoveYou.test(val)) {
                            e.target.removeAttribute('style');
                            loginBtn.removeAttribute('disabled');
                        }
                        else {
                            e.target.setAttribute('style', 'border: 1px solid red');
                            loginBtn.setAttribute('disabled', 'disabled');
                        }
                        break;
                }
            }
            else {
                loginBtn.removeAttribute('disabled');
            }
        });

        loginBtn.closest('form').addEventListener('keydown', function (e) {

            if (e.which == 13) {
                e.preventDefault();

                Login(e);
            }

        });
    }

    function Login(e) {

        let form = e.target.closest('form');

        let btn = e.target;

        if (ValidateLogin(form)) {

            //fetch here
            let formData = new FormData();

            let username = form.querySelector('input[name=UserName]');
            let password = form.querySelector('input[name=Password]');


            formData.append('UserName', username.value);
            formData.append('IStillLoveYou', password.value);

            let options = {
                method: 'POST',
                body: formData
            };

            //add spinner
            btn.textContent = '';
            btn.classList.add('spinner');

            fetch(AppGlobal.baseUrl + 'UserLogin/Login', options).then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    throw alertMessages.databaseError
                }
            }).then(data => {
                //remove the spinner
                btn.textContent = 'Login';
                btn.classList.remove('spinner');

                console.log(data);

                if (data.HasError) {
                    throw alertMessages.databaseError
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //redirect to index page
                        window.location.reload();
                    }
                    else {
                        throw 'Invalid Login';
                    }
                }
            }).catch(error => {
                //remove the spinner
                btn.textContent = 'Login';
                btn.classList.remove('spinner');

                console.log(error);

                IsConfirmedAlertOk(alertType.errorAlert, error);
            })
        }
    }

    function ValidateLogin(form) {
        let errors = 0;

        form.querySelectorAll('input[required]').forEach((item) => {

            item.removeAttribute('style');

            if (item.value) {
                //check for valid email
                //check the length of password
                switch (item.getAttribute('type')) {
                    case 'email':
                        if (!RegExpDataValidationPatterns.EmailAddress.test(item.value)) {
                            item.setAttribute('style', 'border: 1px solid red');
                            errors += 1;
                            IsConfirmedAlertOk(alertType.warningAlert, 'Invalid Email');
                        }
                        break;

                    case 'password':
                        if (!RegExpDataValidationPatterns.IStillLoveYou.test(item.value)) {
                            item.setAttribute('style', 'border: 1px solid red');
                            errors += 1;
                            IsConfirmedAlertOk(alertType.warningAlert, 'Password must be 8 characters and above');
                        }
                        break;
                }

            }
            else {
                item.setAttribute('style', 'border: 1px solid red');
                errors += 1;

            }

        });

        return errors > 0 ? false : true;
    }

    //for logout
    let logoutBtn = document.querySelector('.jsLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            Logout(e);

        });
    }

    function Logout(e) {
        IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure you want to logout?').then(data => {

            window.location.href = AppGlobal.baseUrl + 'UserLogin/Logout';

        }).catch(error => {

        });
    }


})();