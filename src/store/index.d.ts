
export {};

declare global {
    namespace process {
        // let env: Array<string>;
        namespace env {
            let NODE_ENV: string;
        }
    }
}