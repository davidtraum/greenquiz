const Config = {
    POINTS_CORRECT_CHOICE: 10,
    POINTS_CORRECT_ESTIMATE: 15,
    POINTS_CORRECT_SORT: 5,
    POINTS_CORRECT_MULTICHOICE: 4,
    POINTS_WRONG_MULTICHOICE: 2,
    
    TOUCH_DEVICE: 'ontouchstart' in window,
    getMaxPlayers: function(){
        return document.getElementById('page_welcome_max_players').value;
    }

}

var browser = (function(){
    var test = function(regexp) { return regexp.test(window.navigator.userAgent);}
    switch(true){
      case test(/edge/i): return "edge";
      case test(/opr/i) && (!!window.opr || !!window.opera): return "opera";
      case test(/chrome/i) && !!window.chrome: return "chrome";
      case test(/trident/i) : return "ie";
      case test(/firefox/i) : return "firefox";
      case test(/safari/i): return "safari";
      default: return "other";
    }
  })();

const PageManager = {
    currentPage: undefined,
    setPage: function(pageName){
        if(PageManager.currentPage){
            PageManager.currentPage.classList.add('hidden');
        }
        PageManager.currentPage = PageManager.page[pageName];
        PageManager.currentPage.classList.remove('hidden');
    },
    page: {},
    init: function(){
        document.querySelectorAll('.content_page').forEach(function(e){
            let split = e.id.split("_");
            if(split[0] == 'page'){                
                PageManager.page[split[1]] = e;
            }
        });
    },
    getCurrent: function(){
        if(PageManager.currentPage){
            return PageManager.currentPage.id.split("_")[1];
        }
    },
    mobileInput: function(action){
        switch(action){
            case 'back':
                if(PageManager.getCurrent() == 'start'){
                    PageManager.page['background'].style.backgroundImage = "";
                    PageManager.setPage('welcome');
                }else{
                    Quiz.reset();
                    PageManager.setPage('start');
                }
                break;
        }
    }
}

class Quiz {

    static setCategory(pCategory) {
        Quiz.category = pCategory;
        PageManager.page['background'].style.backgroundImage = "url(" + Quiz.category.background[0] + ")";
        document.getElementById('page_start_background_copyright').innerHTML = 'Foto: ' + Quiz.category.background[1];
        Player.reset();
        PageManager.setPage('start');
    }
    
    static finalize(){
        let playerView = document.getElementById('page_result_players');
        playerView.innerHTML = '';
        let playerArray = Array.from(Player.players);
        for(var i = 0; i<Player.players.length; i++){
            let max = 0;
            for(var j = 0; j<playerArray.length; j++){
                if(playerArray[j].points > playerArray[max].points){
                    max = j;
                }
            }

            let text = document.createElement((i == 0 ? 'h2' : 'h4'));
            text.innerHTML = (Player.players.length > 1 ? ((i+1) + '. ') : '')  + playerArray[max].name +  ' (' + playerArray[max].points + ' von ' + Quiz.getMaxPoints() + ' Punkten)';
            if(i==0)text.style.color = 'var(--gp_green)';
            playerView.appendChild(text);
            playerArray.splice(max, 1);
            
        }
        PageManager.setPage('result');
    }

    static next(noadd){
        if(Quiz.questionIndex >= Quiz.questionSelection.length){
            Quiz.finalize();
            return;
        }
        if(!noadd){
        if(Quiz.playerIndex < Player.players.length-1){
            Quiz.playerIndex++;
        }else{
            if(Quiz.questionSelection[Quiz.questionIndex].correct_txt){
                document.getElementById('page_solution_title').innerHTML = Quiz.questionSelection[Quiz.questionIndex].correct_txt + ' ' + (Quiz.questionSelection[Quiz.questionIndex].unit ? Quiz.questionSelection[Quiz.questionIndex].unit : '');
            }else{
                document.getElementById('page_solution_title').innerHTML = Quiz.questionSelection[Quiz.questionIndex].correct + ' ' + (Quiz.questionSelection[Quiz.questionIndex].unit ? Quiz.questionSelection[Quiz.questionIndex].unit : '');
            }
            let playerView = document.getElementById('page_solution_players');
            playerView.scrollTo(0,0);
            playerView.innerHTML = '';
            let maxPoints = 0;
            for(var i = 0; i<Player.players.length; i++){
                if(Player.players[i].points > maxPoints){
                    maxPoints = Player.players[i].points;
                }
            }
            for(var i = 0; i<Player.players.length; i++){
                let div = document.createElement('div');
                div.style.display = 'flex';
                let playername = document.createElement('h3');
                playername.innerHTML = Player.players[i].name + '&nbsp'.repeat(Math.abs(Player.players[i].name.length - Player.maxNameLength)+2);
                playername.style.margin = 0;
                playername.style.fontFamily = 'monospace';
                div.appendChild(playername);
                let bar = document.createElement('div');
                bar.classList.add('compare_bar');
                bar.id = "bar_" + Player.players[i].name;
                bar.style.width = (30 * ((Player.players[i].points - Player.players[i].pointsGained) / maxPoints)) + '%';
                div.appendChild(bar);
                console.log("Gain: " + Player.players[i].pointsGained);
                if(Player.players[i].pointsGained > 0){
                    let gained = document.createElement('h3');
                    gained.style.color = 'var(--gp_green)';
                    gained.style.fontFamily = 'monospace';
                    gained.style.margin = 0;
                    gained.innerHTML = '+' + Player.players[i].pointsGained;
                    div.appendChild(gained);
                }
                if(Player.players[i].points > 0){
                    let total = document.createElement('h3');
                    total.style.color = 'white';
                    total.fontFamily = 'monospace';
                    total.style.margin = '-6px';
                    total.style.position = 'relative';
                    total.style.left = '1em';
                    total.innerHTML = Player.players[i].points;
                    bar.appendChild(total);
                }
                playerView.appendChild(div);
            }
            playerView.innerHTML += '<br><hr><br>' + Quiz.questionSelection[Quiz.questionIndex].text + '<br><br>Quelle: ' + Quiz.questionSelection[Quiz.questionIndex].src;
            document.getElementById('page_solution_graphic').src = 'res/grafik/' + Quiz.questionSelection[Quiz.questionIndex].graphic;
            setTimeout(function(){
                for(var i = 0; i<Player.players.length; i++){
                    document.getElementById('bar_' + Player.players[i].name).style.width = (30 * (Player.players[i].points / maxPoints)) + '%';
                }
            },100);
            PageManager.setPage('solution');
            Quiz.questionIndex++;
            Quiz.playerIndex = 0;
            return;
        }
        }
        if(Player.players.length > 1){
            document.getElementById('playerinfo_text').innerHTML = Player.players[Quiz.playerIndex].name;
            document.getElementById('playerinfo').classList.remove('hidden');
            setTimeout(function(){
                document.getElementById('playerinfo').classList.add('hidden');
            },1500);
        }
        let currentQuestion = Quiz.questionSelection[Quiz.questionIndex];
        document.getElementById('page_question_playername').innerHTML = Player.players[Quiz.playerIndex].name;
        document.getElementById('page_question_text').innerHTML = currentQuestion.question;

        let answerDisplay = document.getElementById('page_question_answer');
        answerDisplay.innerHTML = '';
        answerDisplay.scrollTo(0,0);

        console.log("Loading " + Quiz.questionSelection[Quiz.questionIndex].question);
        if(currentQuestion.type == 'Choice'){
            let answerArray = Array.from(Quiz.questionSelection[Quiz.questionIndex].options);
            for(var i = 0; i<Quiz.questionSelection[Quiz.questionIndex].options.length; i++){
                let index = (Math.random()*answerArray.length) | 0;
                let option = answerArray[index];
                answerArray.splice(index,1);
                let button = document.createElement('button');
                button.classList.add('button');
                button.classList.add('large');
                button.classList.add('hover_scale');
                button.style.width = '340px';
                button.style.marginTop = '10px';
                button.innerHTML = option;
                button.onclick = function(e){
                    console.log("Compare " + e.target.innerHTML + " with " + Quiz.questionSelection[Quiz.questionIndex].correct);
                    if(e.target.innerHTML == Quiz.questionSelection[Quiz.questionIndex].correct){
                        console.log("is correct");
                        Player.players[Quiz.playerIndex].pointsGained = Config.POINTS_CORRECT_CHOICE;
                        Player.players[Quiz.playerIndex].points += Config.POINTS_CORRECT_CHOICE;
                    }else{
                        Player.players[Quiz.playerIndex].pointsGained = 0;
                    }
                    setTimeout(function(){
                        Quiz.next();
                    }, Config.TOUCH_DEVICE ? 300 : 0);
                }
                answerDisplay.appendChild(button);
            }
            answerDisplay.style.width = '300px';
            answerDisplay.style.maxWidth = '';
        }else if(currentQuestion.type == 'MultiChoice'){
            let orderArray = Array.from(currentQuestion.options);
            shuffleArray(Quiz.array);
            Quiz.array = {};
            orderArray.forEach(function(e){
                Quiz.array[e] = false;
                let button = document.createElement('button');
                button.classList.add('button');
                if(currentQuestion.long){
                    button.classList.add('button_expand');
                }
                button.style.width = '90px';
                button.style.marginLeft = button.style.marginRight = '5px';
                button.style.height = '80px';
                button.style.marginBottom = '5px';
                let image = document.createElement('img');
                image.src = 'res/icons/checkbox_unchecked.png';
                image.height = '25';
                image.style.transition = '0.3s';
                image.style.pointerEvents = 'none';
                let text = document.createElement('p');
                text.innerHTML = e;
                text.style.pointerEvents = 'none';
                text.style.paddingLeft = '5px'
                button.appendChild(image);
                button.appendChild(text);
                answerDisplay.appendChild(button);

                button.onclick = function(e){
                    let name = e.target.childNodes[1].innerHTML;
                    Quiz.array[name] = !Quiz.array[name];
                    if(Quiz.array[name]){
                        e.target.childNodes[0].src = 'res/icons/checkbox_checked.png';
                        e.target.style.backgroundColor = 'rgba(200,255,200,0.3)';
                    }else{
                        e.target.childNodes[0].src = 'res/icons/checkbox_unchecked.png';
                        e.target.style.backgroundColor = '';
                    }
                }
            });
            let confirmButton = document.createElement('button');
            confirmButton.innerHTML = 'Bestätigen';
            if(currentQuestion.long){
                confirmButton.style.marginTop = '10px';
            }else{
                confirmButton.style.marginTop = '100px';
            }
            confirmButton.classList.add('button');
            confirmButton.classList.add('large');   
            confirmButton.classList.add('center'); 
            if(browser=='firefox'){
                confirmButton.style.marginTop = '100px';
            }
            confirmButton.style.fontWeight = 'bold';
            confirmButton.onclick = function(){
                let pointGain = 0;
                Object.keys(Quiz.array).forEach(function(e){
                    if(Quiz.array[e]){
                        if(currentQuestion.correct.includes(e)){
                            console.log("Correct: " + e)
                            pointGain+=Config.POINTS_CORRECT_MULTICHOICE;
                        }else{
                            console.log("Incorrect: " + e)
                            pointGain-=Config.POINTS_WRONG_MULTICHOICE;
                        }
                    }
                });
                if(pointGain<0)pointGain=0;
                Player.players[Quiz.playerIndex].pointsGained = pointGain;
                Player.players[Quiz.playerIndex].points += pointGain;
                Quiz.next();
            };
            answerDisplay.appendChild(confirmButton);
            answerDisplay.style.width = '300px';
            answerDisplay.style.maxWidth = '';
        }else if(currentQuestion.type == 'Estimation'){
            let imageDiv = document.createElement('div');
            imageDiv.classList.add('image_banner');
            let image1 = document.createElement('div');
            image1.id = 'slider_image1';
            image1.style.backgroundImage = 'url(res/grafik/' + currentQuestion.images[0] + ')';
            if(currentQuestion.copyright){
            let image1Source = document.createElement('p');
            image1Source.style.color = 'white';
            image1Source.style.position = 'absolute';
            image1Source.style.bottom = '-10px';
            image1Source.style.fontSize = '0.8em';
            image1Source.style.left = '5px';
            image1Source.innerHTML = '© ' + currentQuestion.copyright[0];
            image1.appendChild(image1Source);
            }
            imageDiv.appendChild(image1);
            let image2 = document.createElement('div');
            image2.id = 'slider_image2'; 
            image2.style.backgroundImage = 'url(res/grafik/' + currentQuestion.images[1] + ')';
            image2.style.opacity = 0;
            image2.style.position = 'absolute';
            if(currentQuestion.copyright){
            let image2Source = document.createElement('p');
            image2Source.style.color = 'white';
            image2Source.style.position = 'absolute';
            image2Source.style.bottom = '-10px';
            image2Source.style.fontSize = '0.8em';
            image2Source.style.right = '5px';
            image2Source.innerHTML = '© ' + currentQuestion.copyright[1];
            image2.appendChild(image2Source);
            }
            imageDiv.appendChild(image2); 
            answerDisplay.appendChild(imageDiv);  
            let valueDisplay = document.createElement('p');
            valueDisplay.classList.add('center');
            valueDisplay.style.marginTop = '50px';
            valueDisplay.classList.add('value_display');
            valueDisplay.style.fontWeight = 'bold';
            valueDisplay.id = 'page_question_value_display';
            valueDisplay.style.zIndex = 2;
            imageDiv.appendChild(valueDisplay);
            let slider = document.createElement('input');
            slider.type = 'range';
            slider.id = 'page_question_value_slider';
            slider.min = currentQuestion.min;
            slider.max = currentQuestion.max;
            slider.step = currentQuestion.step;
            slider.value = currentQuestion.min;
            slider.classList.add('slider');
            let sliderUpdate = function(e){
                let target;
                if(e){
                    target = e.target;
                }else{
                    target = document.getElementById('page_question_value_slider');
                }
                document.getElementById('page_question_value_display').innerHTML = target.value + ' ' + Quiz.questionSelection[Quiz.questionIndex].unit;
                let percentage = ((target.value - target.min)/(target.max - target.min));
                if(!Quiz.questionSelection[Quiz.questionIndex].singleBlend){
                    document.getElementById('slider_image1').style.opacity = 1-percentage;
                }
                document.getElementById('slider_image2').style.opacity = percentage;
            }
            slider.oninput = sliderUpdate;
            answerDisplay.appendChild(slider);
            let confirmButton = document.createElement('button');
            confirmButton.innerHTML = 'Bestätigen';
            confirmButton.style.marginTop = '25px';
            confirmButton.classList.add('button');
            confirmButton.classList.add('large');   
            confirmButton.classList.add('center'); 
            if(browser=='firefox'){
                confirmButton.style.marginTop="50px";
            }
            confirmButton.style.fontWeight = 'bold';
            confirmButton.onclick = function(){
                let slider = document.getElementById('page_question_value_slider');
                let pointGain = (Config.POINTS_CORRECT_ESTIMATE - (Math.abs(slider.value - Quiz.questionSelection[Quiz.questionIndex].correct) / Quiz.questionSelection[Quiz.questionIndex].pointloss)) | 0;
                if(pointGain<0)pointGain = 0;
                Player.players[Quiz.playerIndex].pointsGained = pointGain;
                Player.players[Quiz.playerIndex].points += pointGain;
                Quiz.next();
            }   
            answerDisplay.appendChild(confirmButton);          
            answerDisplay.style.width = '90%'
            answerDisplay.style.maxWidth = '';
            sliderUpdate();
        }else if(currentQuestion.type == 'Order'){

            Quiz.array = Array.from(currentQuestion.options);
            shuffleArray(Quiz.array);

            Quiz.array2 = new Array(Quiz.array.length);
            for(var i = 0; i<Quiz.array.length; i++){
                Quiz.array2[i] = currentQuestion.icons[currentQuestion.options.indexOf(Quiz.array[i])];
            }
            
            for(var i = 0; i<currentQuestion.options.length; i++){
                let div = document.createElement('div');
                div.classList.add('order_element');
                div.id = 'order_element_' + Quiz.array[i];
                div.style.width = '50%';
                div.style.marginLeft = '20px';
                div.style.maxWidth = '300px';
                div.style.top = (i*64) + 'px';

                let title = document.createElement('p');
                title.innerHTML = Quiz.array[i];
                div.appendChild(title);

                let icon = document.createElement('img');
                icon.src = 'res/grafik/' + Quiz.array2[i];
                div.appendChild(icon);

                let orderUp = document.createElement('img');
                orderUp.id = 'order_up_' + Quiz.array[i];
                orderUp.src="res/icons/arrow_up.png";
                orderUp.width = '50';
                orderUp.classList.add('clickable');
                orderUp.classList.add('hover_scale');
                orderUp.classList.add('buttonUp');
                orderUp.classList.add('orderButton');
                orderUp.dataset.index = i;
                orderUp.onclick = function(e){
                    Quiz.orderSwap(e.target.dataset.index, e.target.dataset.index-1);
                }
                div.appendChild(orderUp);

                let orderDown = document.createElement('img');
                orderDown.id = 'order_down_' + Quiz.array[i];
                orderDown.src="res/icons/arrow_down.png";
                orderDown.width = '50';
                orderDown.classList.add('clickable');
                orderDown.classList.add('hover_scale');
                orderDown.classList.add('buttonDown');
                orderDown.classList.add('orderButton');
                orderDown.dataset.index = i;
                orderDown.onclick = function(e){
                    Quiz.orderSwap(e.target.dataset.index, parseInt(e.target.dataset.index)+1);
                }
                div.appendChild(orderDown);

                answerDisplay.appendChild(div);


                let finishButton = document.createElement('button');
                finishButton.innerHTML = 'Fertig';
                finishButton.classList.add('button');
                finishButton.classList.add('large');
                finishButton.classList.add('center');
                finishButton.style.bottom = '0px';
                finishButton.onclick = function(){
                    Player.players[Quiz.playerIndex].pointGain = 0;
                    for(var i = 0; i<Quiz.array.length; i++){
                        if(Quiz.array[i] == Quiz.questionSelection[Quiz.questionIndex].options[i]){
                            Player.players[Quiz.playerIndex].pointGain += Config.POINTS_CORRECT_SORT;
                        }
                    }
                    Player.players[Quiz.playerIndex].points +=  Player.players[Quiz.playerIndex].pointGain;
                    Quiz.next();
                };

                answerDisplay.appendChild(finishButton);
            }
            answerDisplay.style.width = '100%';
            answerDisplay.style.maxWidth = '500px';
            answerDisplay.style.height = ((Quiz.array.length*64) + 100) + 'px';
        }

        PageManager.setPage('question');
    }

    static getMaxPoints(){
        let total = 0;
        for(var i = 0; i<Quiz.questionSelection.length; i++){
            switch(Quiz.questionSelection[i].type){
                case "Choice":
                    total += Config.POINTS_CORRECT_CHOICE;
                    break;
                case "MultiChoice":
                    total += Config.POINTS_CORRECT_MULTICHOICE*Quiz.questionSelection[i].correct.length;
                    break;
                case "Estimation":
                    total += Config.POINTS_CORRECT_ESTIMATE;
                    break;
                case "Sort":
                    total += Config.POINTS_CORRECT_SORT*Quiz.questionSelection[i].correct.length;
                    break;
            }
        }
        return total;
    }

    static orderSwap(i1, i2){
        console.log("Swapping " + i1 + " - " + i2)
        if(i2<i1 && i2<0){
            i2=Quiz.array.length-1;
        }else if(i1<i2 && i2>=Quiz.array.length){
            i2=0;
        }
        let tmp = Quiz.array[i1];
        Quiz.array[i1] = Quiz.array[i2];
        Quiz.array[i2] = tmp;
        console.log("Swapped " + Quiz.array[i1] + " , " + Quiz.array[i2]);
        for(var i = 0; i<Quiz.array.length; i++){
            let element = document.getElementById('order_element_' + Quiz.array[i]);
            document.getElementById('order_up_' + Quiz.array[i]).dataset.index = i;
            document.getElementById('order_down_' + Quiz.array[i]).dataset.index = i;
            element.style.top = (i*64) + 'px';
        }
    }

    static reset(){
        document.getElementById('abort_button').classList.add('hidden');
        document.getElementById('page_start_hint').classList.remove('side_hint_expanded');
        Player.reset();
        PageManager.setPage('start');
    }

    static run(){
        Quiz.questionSelection = [];
        let dataArray = Array.from(Data[Quiz.category.key]);
        for(var i = 0; i<Data[Quiz.category.key].length; i++){
            let index = (Math.random()*dataArray.length) | 0;
            Quiz.questionSelection.push(dataArray[index]);
            dataArray.splice(index,1);
        }
        Quiz.questionIndex = 0;
        Quiz.playerIndex = -1;
        document.getElementById('abort_button').classList.remove('hidden');
        Quiz.next();
    }
}
Quiz.category=undefined;
Quiz.data = {};
Quiz.questions = [];
Quiz.questionSelection = [];
Quiz.questionIndex = undefined;
Quiz.playerIndex = undefined;
Quiz.array = Quiz.array2 = [];

class Player {
    constructor(name){
        this.name = name;
        this.points = 0;
        this.pointsGained = 0;
    }

    static createNew(){
        let playerCount = Object.keys(Player.players).length+1;
        if(playerCount>Config.getMaxPlayers())return;

        let name = 'Spieler ' + playerCount;
        Player.players.push(new Player(name));
        Player.rebuildDisplay();
    }

    static remove(name){
        if(Player.players.length<=1)return;
        let arr = [];
        Player.players.forEach(function(e){
            if(e.name != name){
                arr.push(e);
            }
        });
        Player.players = arr;
        Player.rebuildDisplay();
    }

    static reset(){
        Player.players = [];
        Player.createNew();
    }

    static rebuildDisplay(){
        let parent = document.getElementById('page_start_player_editor');
        parent.innerHTML = '';
        Player.players.forEach(function(e){
            let div = document.createElement('div');
            div.classList.add('player_editor_entry');
            let input = document.createElement('input');
            input.id = "playername_" + e.name;
            input.classList.add('text_input');
            input.value = e.name;
            input.oninput = function(ev){
                if(ev.target.value==document.getElementById('page_welcome_password').value){
                    PageManager.page['background'].style.backgroundImage = '';
                    PageManager.setPage('welcome');
                    return;
                }else if(ev.target.value == 'downloadtest19'){
                    document.getElementById('page_start_showdownload').classList.remove('hidden');
                }
                e.name = ev.target.value;
                Player.maxNameLength = 0;
                Player.players.forEach(function(e){
                    if(e.name.length > Player.maxNameLength){
                        Player.maxNameLength = e.name.length;
                    }
                });
            };
            div.appendChild(input);
            let remove = document.createElement('img');
            remove.width = remove.height = '40';
            remove.src = "res/icons/remove.png";
            remove.classList.add('clickable');
            remove.classList.add('hover_scale');
            remove.onclick = function(){
                Player.remove(e.name);
            }
            div.appendChild(remove);
            parent.appendChild(div);
        });
    }
}
Player.players = [];
Player.maxNameLength = 'Spieler X'.length;

const ImageView = {
    view: function(src){
        document.getElementById('image_view_image').src = src;
        document.getElementById('image_view').classList.remove('window_hidden');
    },
    hide: function(){
        document.getElementById('image_view').classList.add('window_hidden');
        document.getElementById('image_view_image').src = '';
    }
}

window.addEventListener('load', function(){
    PageManager.init();
    PageManager.setPage('boot');
    this.setTimeout(function(){
        document.getElementById('boot_icon').classList.remove('boot_icon');
    },100);
    
    this.setTimeout(function(){
        PageManager.setPage('welcome');
        document.getElementById('header').classList.remove('hidden');
    },1100); 
    let parent = document.getElementById('page_welcome_select_topic');
    Data.CATEGORIES.forEach(function(e){
        let option = document.createElement('option');
        option.value = e.key;
        option.innerHTML = e.name;
        parent.appendChild(option);
    });

    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
        }catch(e){

        }
    }

    if(this.window.innerWidth<550){
        this.setTimeout(() => {
            Dialog.okayDialog('Hinweis', 'Die Anwendung ist noch nicht zu 100% für kleine Bildschirme optimiert. Manche Dinge könnten falsch dargestellt werden.')
        }, 2000)  
    }

    /** 
    document.getElementById('page_start_hint').addEventListener('mouseenter', function(e){
        document.querySelectorAll('#page_start > *').forEach(function(el){
            if(el.id!='page_start_hint'){
                el.style.filter = 'blur(5px) brightness(50%)';
            }
        })
        document.getElementById('page_background').style.filter='blur(5px) brightness(50%)'
    });
    document.getElementById('page_start_hint').addEventListener('mouseleave', function(e){
        document.querySelectorAll('#page_start > *').forEach(function(el){
            if(el.id!='page_start_hint'){
                el.style.filter = '';
            }
        })
        document.getElementById('page_background').style.filter=''
    });
    */
});

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }
  
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function toggleDownload(){
    if(document.getElementById('page_welcome_switch_download').checked){
        document.getElementById('page_start_showdownload').classList.remove('hidden');
    }else{
        document.getElementById('page_start_showdownload').classList.add('hidden');
    }
}