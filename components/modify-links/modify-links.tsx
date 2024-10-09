export function modifyLink(originalLink: string) {
  if (originalLink.startsWith("www.")) {
    const modifiedLink = "https://" + originalLink.slice(4);
    return modifiedLink;
  } else {
    return originalLink;
  }
}
