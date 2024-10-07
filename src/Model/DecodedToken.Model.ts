interface DecodedToken {
  role: string;
  exp: number;  // Expiration time (in UNIX timestamp format)
  // Add other claims based on your token structure
}
