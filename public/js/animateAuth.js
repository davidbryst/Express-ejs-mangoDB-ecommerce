$(() => {
    var login = $('.splash-login');
    var Register = $('.splash-register');
    var splash = $('.splash');
    var authContent = $('.auth-content');
    login.click(() => {
        splash.toggleClass('tp100');
        let child = splash.children('*');
        for (let index = 0; index < child.length; index++) {
            child.eq(index).addClass('tm100');
        }
        authContent.toggleClass('tp100');
        let child1 = authContent.children('*');
        for (let index = 0; index < child1.length; index++) {
            child1.eq(index).toggleClass('tm100');
        }
    });
    Register.click(() => {
        splash.toggleClass('tp100');
        let child = splash.children('*');
        for (let index = 0; index < child.length; index++) {
            child.eq(index).toggleClass('tm100');
        }
        authContent.toggleClass('tp100');
        let child1 = authContent.children('*');
        for (let index = 0; index < child1.length; index++) {
            child1.eq(index).toggleClass('tm100');
        }
    });
});