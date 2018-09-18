import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";

export class Main {

    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');

        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        const loader = ResourceLoader.create();

        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        console.log(window.innerWidth);
        console.log(window.innerHeight);
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        this.director.isGameOver = false;
        this.dataStore
            .put('birds', Birds)
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land);
        this.director.createPencil();
        this.director.run();

    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽掉JS的事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });

        // wx.onTouchStart(() => {
        //     if (this.director.isGameOver) {
        //         console.log('游戏开始');
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // });
    }
}