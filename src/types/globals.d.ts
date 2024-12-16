declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const value: string;
    export default value;
}
