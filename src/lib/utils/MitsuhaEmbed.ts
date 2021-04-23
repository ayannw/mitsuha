export const embedItem = (a: string, b: number | string): string => {
    return `❯ **${a}**: ${String(b)}\n`;
};

export const quotedEmbedItem = (a: string, b: string | number): string => {
    b = String(b);
    return `> ❯ **${a}**: ${b}\n`;
};
