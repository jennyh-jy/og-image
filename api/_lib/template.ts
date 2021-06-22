 import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
    }
    if (theme === 'purple-gradient') {
        background = 'linear-gradient(254.65deg, #9C8BFF 4.75%, #6D55FF 88.97%), #F2F5F7';
    }

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .images-wrapper {
        position: relative;
        width: 100%;
    }

    .logo-wrapper {
        position: absolute;
        top: 315px;
        left: 831px;
    }

    .background-wrapper {
        position: absolute;
        top: 50px;
        left: 169px;
        z-index: -1;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { theme, fontSize, images } = parsedReq;
    return (`
        <!DOCTYPE html>
        <html>
            <meta charset="utf-8">
            <title>Generated Image</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                ${getCss(theme, fontSize)}
            </style>
            <body>
                <div class="images-wrapper">
                    <div class="logo-wrapper">
                        ${getImage(images[0], '200', '200', '32', true)}
                    </div>
                    <div class="background-wrapper">
                        ${getImage(images[1], '762', '508', '8')}
                    </div>
                </div>
            </body>
        </html>
    `);
}

function getImage(src: string, width='auto', height='225', borderRadius='0', boxShadow=false) {
    return `<img
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
        style="border-radius: ${borderRadius}px; ${boxShadow ? 'box-shadow: 2.4px 4.8px 4.8px rgba(0, 0, 0, 0.15);' : ''}"
    />`
}
