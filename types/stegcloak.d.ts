declare module 'stegcloak' {
  class StegCloak {
    constructor(verbose?: boolean, pure?: boolean);
    hide(secret: string, password: string, coverText: string): string;
    reveal(stegoText: string, password: string): string;
  }
}

