const wrapLink = response => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = response.split(urlRegex).map((part, idx) => {
    if (urlRegex.test(part)) {
      const isInternal = part.includes('localhost') || part.includes('https://intel-loom.netlify.app');
      return (
        <a
          key={idx}
          href={part}
          target={isInternal ? '_self' : '_blank'}
          rel={isInternal ? '' : 'noopener noreferrer'}
        >
          {part}
        </a>
      )
    }
    return part;
  })
  return parts;
} 

export { wrapLink };
