import React from 'react';

export default (props) => (
    <svg
        id={props.id}
        width={props.height || '15'}
        height={props.height || '15'}
        viewBox='0 0 640 640'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M319.99 640L21.87 640L170.92 320L319.99 32.21L469.07 320L618.13 640L618.13 640L319.99 640Z'
            opacity='1'
            fill='#dfe0eb'
            fillOpacity='1'
        />
        <path
            d='M469.07 478.15L544.52 640L335.64 640L93.64 640L170.92 478.15L319.99 158.15L469.07 478.15Z'
            opacity='1'
            fill='#ffffff'
            fillOpacity='1'
        />
    </svg>
);
