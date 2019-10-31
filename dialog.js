

Dialog = {
    frame: document.createElement('div'),
    header: document.createElement('h2'),
    text: document.createElement('p'),
    buttons: document.createElement('div'),
    btn_ok: document.createElement('button'),
    btn_no: document.createElement('button'),
    btn_yes: document.createElement('button'),

    okayDialog: function(header, text){
        Dialog.header.innerHTML = header;
        Dialog.text.innerHTML = text;
        Dialog.btn_ok.classList.remove('dialog_hidden');
        Dialog.frame.classList.remove('dialog_hidden');
        Dialog.btn_yes.classList.add('dialog_hidden');
        Dialog.btn_no.classList.add('dialog_hidden');      
        Dialog.btn_ok.onclick = function(){
            Dialog.btn_ok.classList.add('dialog_hidden');
        }
    },

    yesNoDialog: function(header,text, yesCallback, noCallback){
        Dialog.header.innerHTML = header;
        Dialog.text.innerHTML = text;
        Dialog.btn_yes.classList.remove('dialog_hidden');
        Dialog.btn_no.classList.remove('dialog_hidden');
        Dialog.btn_yes.onclick = yesCallback;
        Dialog.btn_no.onclick = noCallback;
        Dialog.frame.classList.remove('dialog_hidden');
    },
    
    init: function(){
        Dialog.header.id = 'dialog_header';
        Dialog.frame.appendChild(Dialog.header);
        Dialog.text.id = 'dialog_text';
        Dialog.frame.appendChild(Dialog.text);
        Dialog.buttons.id = 'dialog_buttons';
        Dialog.btn_ok.classList.add('dialog_button');
        Dialog.btn_ok.classList.add('dialog_hidden');
        Dialog.btn_ok.innerHTML = 'Okay';
        Dialog.btn_ok.style.backgroundColor = 'light_gray';
        Dialog.btn_ok.addEventListener('click', e => {
            Dialog.frame.classList.add('dialog_hidden');
        });
        Dialog.buttons.appendChild(Dialog.btn_ok);
        Dialog.btn_no.classList.add('dialog_button');
        Dialog.btn_no.classList.add('dialog_hidden');
        Dialog.btn_no.innerHTML = 'Nein';
        Dialog.btn_no.style.backgroundColor = 'red';
        Dialog.btn_no.style.color = 'white';
        Dialog.btn_no.addEventListener('click', e => {
            Dialog.frame.classList.add('dialog_hidden');
        });
        Dialog.buttons.appendChild(Dialog.btn_no);
        Dialog.btn_yes.classList.add('dialog_button');
        Dialog.btn_yes.classList.add('dialog_hidden');
        Dialog.btn_yes.innerHTML = 'Ja';
        Dialog.btn_yes.style.backgroundColor = 'green';
        Dialog.btn_yes.style.color = 'white';
        Dialog.btn_yes.addEventListener('click', e => {
            Dialog.frame.classList.add('dialog_hidden');
        });
        Dialog.buttons.appendChild(Dialog.btn_yes);
        Dialog.frame.appendChild(Dialog.buttons);
        Dialog.frame.id  = 'dialog_frame';
        Dialog.frame.classList.add('dialog_hidden');
        document.body.appendChild(Dialog.frame);

    }
}

window.addEventListener('load', function(){
    Dialog.init();
});