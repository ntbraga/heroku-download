import { trigger, style, animate, transition, state } from '@angular/animations';

export class IdGenerator {
    public static getUniqueId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

export const enterAnimationRightToLeft = [
    trigger(
        'enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('150ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)', opacity: 1 }),
                animate('150ms', style({ transform: 'translateX(100%)', opacity: 0 }))
            ])
        ]
    )
];

export const enterAnimationLeftToRight = [
    trigger(
        'enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('150ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)', opacity: 1 }),
                animate('150ms', style({ transform: 'translateX(100%)', opacity: 0 }))
            ])
        ]
    )
];


export const scaleUpBl = [
    trigger(
        'enterAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)', 'transform-origin': '0% 100%', opacity: 0 }),
                animate('400ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(1)', 'transform-origin': '0% 100%', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)', 'transform-origin': '0% 100%', opacity: 1 }),
                animate('400ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(0)', 'transform-origin': '0% 100%', opacity: 0 }))
            ])
        ]
    )
];

export const scaleUpHorRight = [
    trigger(
        'enterAnimation', [
            state('visible', style({ width: '*' })),
            state('hidden', style({ width: '0%' })),
            transition('hidden => visible', [
                style({ transform: 'scaleX(0)', 'transform-origin': '100% 100%', width: '*' }),
                animate('200ms ease-in',
                    style({ transform: 'scaleX(1)', 'transform-origin': '100% 100%' }))
            ]),
            transition('visible => hidden', [
                style({ transform: 'scaleX(1)', 'transform-origin': '100% 100%', width: '*' }),
                animate('200ms ease-out',
                    style({ transform: 'scaleX(0)', 'transform-origin': '100% 100%' }))
            ])
        ]
    )
];

export const breadCrumb = [
    trigger(
        'openClose', [
            state('visible', style({ transform: 'translateY(0)' })),
            state('hidden', style({ transform: 'translateY(28px)' })),
            transition('hidden => visible', [
                animate('200ms cubic-bezier(0.250, 0.460, 0.450, 0.940)')
            ]),
            transition('visible => hidden', [
                animate('200ms cubic-bezier(0.250, 0.460, 0.450, 0.940)')
            ])
        ]
    )
];

export const scaleInOut = [
    trigger(
        'InOut', [
            state('visible', style({ transform: 'scale(1)' })),
            state('hidden', style({ transform: 'scale(0)' })),
            transition('visible <=> hidden', [
                animate('500ms cubic-bezier(0.250, 0.460, 0.450, 0.940)')
            ])
        ]
    )
];

export const rotate = [
    trigger(
        'flipX', [
            state('side1', style({ transform: 'rotateX(0)' })),
            state('side2', style({ transform: 'rotateX(-180deg)' })),
            transition('side1 <=> side2', [
                animate('500ms cubic-bezier(0.455, 0.030, 0.515, 0.955)')
            ])
        ]
    ),
    trigger(
        'flipY', [
            state('side1', style({ transform: 'rotateY(0)' })),
            state('side2', style({ transform: 'rotateY(180deg)' })),
            transition('side1 <=> side2', [
                animate('500ms cubic-bezier(0.455, 0.030, 0.515, 0.955)')
            ])
        ]
    )
];
