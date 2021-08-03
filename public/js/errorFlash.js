const formLogin = $('form.login'),
 formRegister = $('form.register'),
  errorLogin = $('form.login > .error'),
   errorRegister = $('form.register > .error');

const configErrorFlash = (form, error, root) => {
    form.submit(async (e) => {
        e.preventDefault();
        const isRegister = (form.children('input:text'))?true:false;
        // reset errors
        error.text('');
        // get values
        const email = form.children("input[type='mail']").val();
        const password = form.children('input:password').val();
        const username = (isRegister)?form.children('input:text').val():null;
        fetch(root, {
            method: 'POST',
            body: isRegister?JSON.stringify({email, password, username}):JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            res.json()
            .then(data => {
                if (data.errors) {
                    error.text(data.errors.username, data.errors.email, data.errors.password,)
                }
                if (data.user) {
                    location.assign('/');
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
};

configErrorFlash(formLogin, errorLogin, '/auth/login');
configErrorFlash(formRegister, errorRegister, '/auth/register');