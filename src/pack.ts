export const pack = (program: string) => {
  return program
    .trim() // Remove extra whitespace around the ends.
    .replace(/\n/g, ";") // Replace line endings with semi-colons.
    .replace(/\s\s+/g, " ") // Replace multiple spaces with one space.
    .replace(/;_/g, ";") // Remove underscore after a semi-colon.
    .replace(/_;/g, ";"); // Remove underscore before a semi-colon.
};
