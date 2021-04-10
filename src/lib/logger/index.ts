import { green, blue, yellow, red, gray, underline } from 'colorette';
import type { Message } from '#lib/MitsuhaClient';

const succLog = ' SUCCESS ';
const infoLog = ' INFO    ';
const warnLog = ' WARNING ';
const errrLog = ' ERROR   ';

const zeroPadding = (num: number, digit: number): string => {
    let zero = '';
    for (let i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
};

const updateTime = (): string => {
    const cd = new Date();
    const time =
        zeroPadding(cd.getHours(), 2) +
        ':' +
        zeroPadding(cd.getMinutes(), 2) +
        ':' +
        zeroPadding(cd.getSeconds(), 2) +
        ':' +
        zeroPadding(cd.getMilliseconds(), 3);

    return time;
};

const format = (logType: string, text?: string, message?: Message): any => {
    const time = gray(updateTime()) + ' ';
    switch (logType) {
        case 'success':
            return time + green(succLog) + '  ' + text;
            break;
        case 'info':
            return time + blue(infoLog) + '  ' + text;
            break;
        case 'warn':
            return time + yellow(warnLog) + '  ' + text;
            break;
        case 'error':
            return time + red(errrLog) + '  ' + text;
            break;
        case 'message':
            return (
                time +
                blue(infoLog) +
                '  ' +
                underline(message.guild.name) +
                //@ts-ignore
                underline('#' + message.channel.name) +
                '  ' +
                blue(message.author.tag) +
                ': \n' +
                gray('- - - - - - - - - - - — ') +
                message.content
            );
    }
};

export const success = (text: string): void => {
    return console.log(format('success', text));
};
export const info = (text: string): void => {
    return console.log(format('info', text));
};
export const warn = (text: string): void => {
    return console.log(format('warn', text));
};
export const error = (text: string): void => {
    return console.log(format('error', text));
};
export const msgLog = (message: Message): void => {
    return console.log(format('message', '', message));
};
