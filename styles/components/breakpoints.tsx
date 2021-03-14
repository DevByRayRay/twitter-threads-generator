const size = {
	xs: '320px',
	sm: '768px',
	lg: '1024px',
	xl: '1200px',
}

const mediaQueries = (key: keyof typeof size) => {
	return (style: TemplateStringsArray | String) => `@media (min-width: ${size[key]}) { ${style} }`
}
export { size, mediaQueries }
