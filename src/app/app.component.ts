import { Component } from '@angular/core';
import { onErrorResumeNext } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'async';

  callbackTest() {
    const that = this;
    this.buildTheWorld(
      (r) => {
        that.buildTheHome(r, 
          // tslint:disable-next-line: only-arrow-functions
          (room) => {
            console.log('My new home has ' + room + ' rooms');
          },
          () => {
            console.log('Homeless again');
          }
        );
      },
      () => {
            console.log('No home without a world');
      }
    );
  }

  buildTheWorld(onsuccess, onerror) {
    // tslint:disable-next-line: only-arrow-functions
    setTimeout( () => {
      const r = Math.random();
      if (r > 0.5){
        console.log('build world successful');
        onsuccess(r);
      } else {
        console.log('build world failed');
        onerror();
      }
    }, 3000);
  }

  buildTheHome(r, onsuccess, onerror){
    // tslint:disable-next-line: only-arrow-functions
    setTimeout( function() {
      const s = Math.random();
      if (s > 0.5) {
        const room = r * 10;
        console.log('build home successful');
        onsuccess(room);
      } else {
        console.log('build home failed');
        onerror();
      }
    }, 3000);
  }

  promiseTest() {
    this.buildTheWorldPromise()
    .then(result => {
        console.log('world is built');
        return this.buildTheHomePromise(result);
    })
    .then(r => {
        console.log('home build success with ' + r + ' rooms');
    })
    .catch((e) => {
        console.log(e);
    });
  }

  buildTheWorldPromise(): Promise<any> {
    const p = new Promise((resolve, reject) => {
      setTimeout( () => {
        const r = Math.random();
        if (r > 0.5) {
          console.log('build world successful');
          resolve(r);
        } else {
          console.log('build world failed');
          reject('world is falling');
        }
      }, 3000);
    });
    return p;
  }

  buildTheHomePromise(r): Promise<any> {
    const p = new Promise((resolve, reject) => {
      setTimeout( () => {
        const s = Math.random();
        if (s > 0.5) {
          const room = r * 10;
          console.log('build home successful');
          resolve(room);
        } else {
          console.log('build home failed');
          reject('home is falling');
        }
      }, 3000);
    });
    return p;
  }

  async awaitTest() {
    try {
      const r = await this.buildTheWorldPromise();
      console.log('world is built: ' + r);
      const h = await this.buildTheHomePromise(r);
      console.log('home build success with ' + h + ' rooms');
    } catch (e) {
      console.log(e);
    }
  }


}
