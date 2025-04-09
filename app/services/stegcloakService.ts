import StegCloak from 'stegcloak';

// Define types for the service
export interface StegCloakOptions {
  encrypt?: boolean;
  integrity?: boolean; // For HMAC
}

export interface StegCloakResult {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * StegCloak Service - Wraps the StegCloak library for use in Next.js
 * Uses lazy initialization to avoid server-side rendering issues
 */
class StegCloakService {
  private stegCloak: any = null;  // Changed to 'any' to handle type issues
  private isClient: boolean;

  constructor() {
    // Check if we're running on the client side
    this.isClient = typeof window !== 'undefined';
  }

  /**
   * Initialize StegCloak if it hasn't been initialized yet
   * This is only done on the client side
   */
  private initialize(): boolean {
    if (!this.isClient) {
      return false;
    }

    if (!this.stegCloak) {
      try {
        const StegCloakConstructor = (StegCloak as any).StegCloak || StegCloak;
        if (typeof StegCloakConstructor === 'function') {
          this.stegCloak = new StegCloakConstructor(true, false);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to initialize StegCloak:', error);
        return false;
      }
    }
    return true;
  }

  /**
   * Hides a secret message within cover text
   * 
   * @param secret - The secret text to hide
   * @param password - Password for encryption
   * @param coverText - The cover text where the secret will be hidden
   * @param options - Options for encryption and integrity (HMAC)
   * @returns An object containing the result or error
   */
  public hide(
    secret: string,
    password: string,
    coverText: string,
    options: StegCloakOptions = { encrypt: true, integrity: true }
  ): StegCloakResult {
    try {
      if (!this.isClient) {
        return {
          success: false,
          error: 'StegCloak can only be used on the client side'
        };
      }

      if (!secret || !password || !coverText) {
        return {
          success: false,
          error: 'Secret, password, and cover text are required'
        };
      }

      if (!this.initialize()) {
        return {
          success: false,
          error: 'Failed to initialize StegCloak'
        };
      }

      // Configure StegCloak based on options
      const StegCloakConstructor = (StegCloak as any).StegCloak || StegCloak;
      
      // If both encryption and integrity are enabled
      if (options.encrypt && options.integrity) {
        this.stegCloak = new StegCloakConstructor(true, true); // Encryption and HMAC enabled
      } 
      // If only encryption is enabled
      else if (options.encrypt) {
        this.stegCloak = new StegCloakConstructor(true, false); // Only encryption enabled
      } 
      // If only integrity is enabled
      else if (options.integrity) {
        this.stegCloak = new StegCloakConstructor(false, true); // Only HMAC enabled
      } 
      // If neither are enabled
      else {
        this.stegCloak = new StegCloakConstructor(false, false); // Both disabled
      }

      if (!this.stegCloak || typeof this.stegCloak.hide !== 'function') {
        return {
          success: false,
          error: 'StegCloak instance is not properly initialized'
        };
      }

      const result = this.stegCloak.hide(secret, password, coverText);
      return {
        success: true,
        data: result
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Reveals a secret message from stego text
   * 
   * @param stegoText - The text containing the hidden message
   * @param password - Password for decryption
   * @returns An object containing the revealed secret or error
   */
  public reveal(stegoText: string, password: string): StegCloakResult {
    try {
      if (!this.isClient) {
        return {
          success: false,
          error: 'StegCloak can only be used on the client side'
        };
      }

      if (!stegoText || !password) {
        return {
          success: false,
          error: 'Stego text and password are required'
        };
      }

      if (!this.initialize()) {
        return {
          success: false,
          error: 'Failed to initialize StegCloak'
        };
      }

      if (!this.stegCloak || typeof this.stegCloak.reveal !== 'function') {
        return {
          success: false,
          error: 'StegCloak instance is not properly initialized'
        };
      }

      const result = this.stegCloak.reveal(stegoText, password);
      return {
        success: true,
        data: result
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Create a singleton instance
const stegCloakService = new StegCloakService();

export default stegCloakService;

