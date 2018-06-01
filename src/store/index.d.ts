
export {};

declare global {
    namespace process {
        namespace env {
            let NODE_ENV: string;
        }
    }
}