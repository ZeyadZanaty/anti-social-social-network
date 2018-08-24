import { animate, state, style, transition, trigger } from '@angular/animations';

export function routerTransition(num=0) {
    if(num==1){
     return slideToBottom();
    }
    if(num==2){
      return slideToLeft();
    }
    if(num==3){
      return slideToRight();
    }
    else{
    return slideToTop();
  }
}

export function slideToRight() {
    return trigger('slideToRight', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(-200%)' }),
            animate('3s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToRightFaster() {
    return trigger('slideToRightFaster', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(-200%)' }),
            animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.65s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToLeft() {
    return trigger('slideToLeft', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(250%)' }),
            animate('3s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}

export function slideToLeftFaster() {
    return trigger('slideToLeftFaster', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(290%)' }),
            animate('4s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}


export function slideToBottom() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.65s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.65s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function slideToTop() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.65s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.65s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
