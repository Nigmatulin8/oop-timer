'use strict';

class Clock {
    constructor(position) {
        this.elem = document.getElementsByClassName(position);
        this.div = document.createElement('div');
        this.playBtn = document.createElement('input');
        this.pauseBtn = document.createElement('input');
        this.resetBtn = document.createElement('input');
        this.stopBtn = document.createElement('input');

        this._attrSet = (elem, attr)=> {
            for(let key in attr) {
                if(attr.hasOwnProperty(key))
                    elem[key] = attr[key]
            }
        }
    }

    setTimer() {
        let _childAppend = (obj) => {
            for (let prop in obj) {
                if(obj.hasOwnProperty(prop))
                    this.elem[0].appendChild(obj[prop]);
            }
        };

        this._attrSet(this.div, { innerHTML: '00:00', className: 'time' });
        this._attrSet(this.playBtn, { type: 'button', value: 'Play', className: 'playBtn'  });
        this._attrSet(this.pauseBtn,{ type: 'button', value: 'Pause', className: 'pauseBtn', disabled: 'disabled'});
        this._attrSet(this.resetBtn,{ type: 'button', value: 'Reset', className: 'resetBtn'});
        this._attrSet(this.stopBtn, { type: 'button', value: 'Stop', className: 'stopBtn'  });

        _childAppend({
            div: this.div,
            playBtn: this.playBtn,
            pauseBtn: this.pauseBtn,
            stopBtn: this.stopBtn,
            resetBtn: this.resetBtn
        });

        return this;
    }

    tick(tickTime) {
        let min = 0, sec = 1, timeID = NaN, tick = parseInt(tickTime) || 1000;

        let _tickFunc = () => {
            if (sec == 60) { min++; sec = 0; }
            min < 10 ? min = '0' + min : false;
            sec < 10 ? sec = '0' + sec : false;

            this.div.innerText = min + ':' + sec;
            min < 10 ? min = min % 10 : false; sec++;
        };

        this.playBtn.addEventListener('click', () => {
            timeID = setInterval(_tickFunc, tick);
            this.playBtn.setAttribute('disabled', 'disabled'); this.pauseBtn.removeAttribute('disabled');
        });

        this.pauseBtn.addEventListener('click',() => {
            clearInterval(timeID);
            this.playBtn.removeAttribute('disabled'); this.pauseBtn.setAttribute('disabled', 'disabled');
        });

        this.resetBtn.addEventListener('click',() => {
            min = 0; sec = 0;
            this.div.innerText = '00' + ':' + '00';
        });

        this.stopBtn.addEventListener('click', () => {
            min = 0; sec = 0;
            this.div.innerText = '00' + ':' + '00';
            clearInterval(timeID);

            this.playBtn.removeAttribute('disabled'); this.pauseBtn.setAttribute('disabled', 'disabled');
        });
    }
}

class deletableClock extends Clock {
    constructor(...args) {
        super(...args);
        this.deleteBtn = document.createElement('input');
    }

    setTimer() {
        super.setTimer();
        this._attrSet(this.deleteBtn, {type: 'button', value: 'Delete', className: 'deleteBtn'});
        this.elem[0].appendChild(this.deleteBtn);
        return this;
    }

    tick(...args) {
        super.tick(...args);
        this.deleteBtn.addEventListener('click', () => { this.elem[0].remove()});
        return this;
    }
}

let clock = new Clock('clock');
clock.setTimer().tick(1000);

let clock1 = new deletableClock('clock');
clock1.setTimer().tick(100);