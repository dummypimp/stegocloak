# StegCloak Dark Mode Frontend

A modern dark-themed frontend for the [StegCloak](https://github.com/KuroLabs/stegcloak) steganography library. This application allows you to hide secret messages within ordinary text using invisible zero-width characters, with support for encryption and integrity checking.

![StegCloak Dark Mode Frontend](https://i.imgur.com/placeholder.png)

## Features

- **Hide Secret Messages**: Conceal your secret text within innocent-looking cover text
- **Reveal Hidden Messages**: Extract hidden messages using the correct password
- **Encryption**: AES-256-CTR encryption for secure message hiding
- **HMAC Integrity**: Optional integrity checking to prevent message tampering
- **Dark Mode UI**: Clean, modern dark-themed user interface built with Tailwind CSS
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Educational Info**: Learn about steganography and how the technology works
- **Copy to Clipboard**: Easy sharing with one-click copy functionality

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/stegcloak-frontend.git
   cd stegcloak-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Development Server

Run the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

The easiest way to deploy this frontend is using [Vercel](https://vercel.com/):

```bash
npm install -g vercel
vercel
```

Alternatively, you can deploy to any static hosting service by running:

```bash
npm run build
```

And then uploading the `out` directory to your hosting service.

## Usage

### Hiding a Message

1. Navigate to the "Hide Message" tab
2. Enter your secret message in the "Secret Message" field
3. Enter a strong password in the "Password" field
4. Enter some cover text where your message will be hidden
5. Choose your security options:
   - **Encryption**: Enables AES-256 encryption (recommended)
   - **HMAC**: Adds integrity verification to prevent tampering
6. Click "Hide Message"
7. Copy the resulting text to share with others

### Revealing a Message

1. Navigate to the "Reveal Message" tab
2. Paste the stego text containing a hidden message
3. Enter the password used when hiding the message
4. Click "Reveal Message"
5. The secret message will be displayed if the password is correct

## How It Works

StegCloak uses zero-width characters (invisible unicode characters) to hide data within regular text. These characters are invisible to humans but can be interpreted by the application to reveal the hidden message.

The process involves:
1. Compressing the secret message
2. Encrypting it (if enabled)
3. Converting it to binary
4. Mapping the binary to zero-width characters
5. Inserting these characters between the letters of the cover text

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [StegCloak](https://github.com/KuroLabs/stegcloak) - Core steganography library
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Credits and Acknowledgments

This project is a frontend for the [StegCloak library](https://github.com/KuroLabs/stegcloak) developed by KuroLabs:
- [Jyothishmathi CV](https://github.com/JyothishmathiCV)
- [Kandavel A](https://github.com/AK5123)
- [Mohanasundar M](https://github.com/mohanpierce99)

Visit the [original StegCloak repository](https://github.com/KuroLabs/stegcloak) for more information about the core technology.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

> This project is bootstrapped with [Next.js](https://nextjs.org) and uses [Geist](https://vercel.com/font) font by default.
